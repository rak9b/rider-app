import { Request, Response, NextFunction } from 'express';
import { cache, cacheGet, cacheSet } from '../cache/redisClient.js';
import { cacheHits, cacheMisses } from '../monitoring/metrics.js';

interface CacheOptions {
    ttl?: number;          // seconds, default 60
    keyPrefix?: string;    // prefix for cache key
    includeQuery?: boolean; // append query string to key
}

/**
 * Route-level caching middleware.
 * Usage: router.get('/estimate', cacheMiddleware({ ttl: 60 }), controller)
 */
export function cacheMiddleware(options: CacheOptions = {}) {
    const { ttl = 60, keyPrefix = 'route', includeQuery = true } = options;

    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        // Only cache GET requests
        if (req.method !== 'GET') {
            next();
            return;
        }

        const queryPart = includeQuery ? JSON.stringify(req.query) : '';
        const cacheKey = `${keyPrefix}:${req.path}:${queryPart}`;

        try {
            const cached = await cacheGet<any>(cacheKey);

            if (cached !== null) {
                cacheHits.inc({ route: req.path });
                res.setHeader('X-Cache', 'HIT');
                res.setHeader('X-Cache-Key', cacheKey);
                res.json(cached);
                return;
            }

            cacheMisses.inc({ route: req.path });
            res.setHeader('X-Cache', 'MISS');

            // Monkey-patch res.json to intercept response and cache it
            const originalJson = res.json.bind(res);
            res.json = (body: any) => {
                // Cache the response asynchronously
                cacheSet(cacheKey, body, ttl).catch(err =>
                    console.warn('[Cache] Failed to store cache:', err.message)
                );
                return originalJson(body);
            };

            next();
        } catch (err) {
            // On cache error, just pass through
            console.warn('[Cache] Middleware error:', (err as Error).message);
            next();
        }
    };
}

/**
 * Invalidate cache for a specific key or prefix pattern
 */
export async function invalidateCache(keyOrPrefix: string): Promise<void> {
    const keys = await cache.keys(`${keyOrPrefix}*`);
    for (const k of keys) {
        await cache.del(k);
    }
}
