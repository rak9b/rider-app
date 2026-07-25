import Redis from 'ioredis';

// ─────────────────────────────────────────────────────────────────────────────
//  In-memory fallback (used when Redis is not available in dev)
// ─────────────────────────────────────────────────────────────────────────────
class InMemoryCache {
    private store = new Map<string, { value: string; expiresAt: number | null }>();

    async get(key: string): Promise<string | null> {
        const entry = this.store.get(key);
        if (!entry) return null;
        if (entry.expiresAt && Date.now() > entry.expiresAt) {
            this.store.delete(key);
            return null;
        }
        return entry.value;
    }

    async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
        this.store.set(key, {
            value,
            expiresAt: ttlSeconds ? Date.now() + ttlSeconds * 1000 : null,
        });
    }

    async del(key: string): Promise<void> {
        this.store.delete(key);
    }

    async flushall(): Promise<void> {
        this.store.clear();
    }

    async keys(pattern: string): Promise<string[]> {
        const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
        return [...this.store.keys()].filter(k => regex.test(k));
    }
}

// ─────────────────────────────────────────────────────────────────────────────
//  Cache interface (shared by both Redis and in-memory impl)
// ─────────────────────────────────────────────────────────────────────────────
interface CacheClient {
    get(key: string): Promise<string | null>;
    set(key: string, value: string, ttlSeconds?: number): Promise<void>;
    del(key: string): Promise<void>;
    flushall(): Promise<void>;
    keys(pattern: string): Promise<string[]>;
}

// ─────────────────────────────────────────────────────────────────────────────
//  Redis wrapper with graceful fallback
// ─────────────────────────────────────────────────────────────────────────────
class RedisCache implements CacheClient {
    private client: Redis | null = null;
    private fallback = new InMemoryCache();
    private usingFallback = false;

    constructor() {
        const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';

        try {
            this.client = new Redis(redisUrl, {
                maxRetriesPerRequest: 1,
                lazyConnect: true,
                enableOfflineQueue: false,
            });

            this.client.on('connect', () => {
                this.usingFallback = false;
                console.log('✅ [Cache] Redis connected:', redisUrl);
            });

            this.client.on('error', (err) => {
                if (!this.usingFallback) {
                    console.warn('⚠️  [Cache] Redis unavailable, using in-memory fallback:', err.message);
                    this.usingFallback = true;
                }
            });

            this.client.connect().catch(() => {
                this.usingFallback = true;
                console.warn('⚠️  [Cache] Redis not reachable. Running with in-memory cache.');
            });
        } catch {
            this.usingFallback = true;
            console.warn('⚠️  [Cache] Redis init failed. Running with in-memory cache.');
        }
    }

    private useRedis(): boolean {
        return !this.usingFallback && this.client !== null && this.client.status === 'ready';
    }

    async get(key: string): Promise<string | null> {
        if (this.useRedis()) {
            return this.client!.get(key);
        }
        return this.fallback.get(key);
    }

    async set(key: string, value: string, ttlSeconds?: number): Promise<void> {
        if (this.useRedis()) {
            if (ttlSeconds) {
                await this.client!.set(key, value, 'EX', ttlSeconds);
            } else {
                await this.client!.set(key, value);
            }
        } else {
            await this.fallback.set(key, value, ttlSeconds);
        }
    }

    async del(key: string): Promise<void> {
        if (this.useRedis()) {
            await this.client!.del(key);
        } else {
            await this.fallback.del(key);
        }
    }

    async flushall(): Promise<void> {
        if (this.useRedis()) {
            await this.client!.flushall();
        } else {
            await this.fallback.flushall();
        }
    }

    async keys(pattern: string): Promise<string[]> {
        if (this.useRedis()) {
            return this.client!.keys(pattern);
        }
        return this.fallback.keys(pattern);
    }

    get isUsingFallback(): boolean {
        return this.usingFallback;
    }

    get status(): string {
        return this.usingFallback ? 'in-memory-fallback' : (this.client?.status ?? 'disconnected');
    }
}

// ─────────────────────────────────────────────────────────────────────────────
//  Exported singleton + typed helper wrappers
// ─────────────────────────────────────────────────────────────────────────────
export const cache = new RedisCache();

/** Cache any serializable value */
export async function cacheSet<T>(key: string, value: T, ttlSeconds = 60): Promise<void> {
    await cache.set(key, JSON.stringify(value), ttlSeconds);
}

/** Get cached value, returns null if not found or expired */
export async function cacheGet<T>(key: string): Promise<T | null> {
    const raw = await cache.get(key);
    if (!raw) return null;
    try {
        return JSON.parse(raw) as T;
    } catch {
        return null;
    }
}

/** Invalidate all keys matching a prefix pattern */
export async function cacheInvalidatePrefix(prefix: string): Promise<void> {
    const keys = await cache.keys(`${prefix}*`);
    for (const key of keys) {
        await cache.del(key);
    }
}
