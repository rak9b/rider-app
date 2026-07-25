import client from 'prom-client';

// ─────────────────────────────────────────────────────────────────────────────
//  Prometheus Registry
// ─────────────────────────────────────────────────────────────────────────────
export const register = new client.Registry();
register.setDefaultLabels({ app: 'rider-app' });

// Collect default Node.js metrics (event loop, heap, GC, etc.)
client.collectDefaultMetrics({ register });

// ─────────────────────────────────────────────────────────────────────────────
//  HTTP Metrics
// ─────────────────────────────────────────────────────────────────────────────
export const httpRequestsTotal = new client.Counter({
    name: 'http_requests_total',
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'route', 'status_code'],
    registers: [register],
});

export const httpRequestDurationSeconds = new client.Histogram({
    name: 'http_request_duration_seconds',
    help: 'Duration of HTTP requests in seconds',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.005, 0.01, 0.025, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5],
    registers: [register],
});

// ─────────────────────────────────────────────────────────────────────────────
//  Ride Metrics
// ─────────────────────────────────────────────────────────────────────────────
export const rideRequestsTotal = new client.Counter({
    name: 'ride_requests_total',
    help: 'Total number of ride requests',
    labelNames: ['vehicle_type', 'status'],
    registers: [register],
});

export const rideCompletionDuration = new client.Histogram({
    name: 'ride_completion_duration_minutes',
    help: 'Duration of completed rides in minutes',
    buckets: [1, 5, 10, 15, 20, 30, 45, 60],
    registers: [register],
});

export const activeDiversGauge = new client.Gauge({
    name: 'active_drivers_total',
    help: 'Number of currently online drivers',
    registers: [register],
});

// ─────────────────────────────────────────────────────────────────────────────
//  WebSocket Metrics
// ─────────────────────────────────────────────────────────────────────────────
export const wsConnectionsActive = new client.Gauge({
    name: 'websocket_connections_active',
    help: 'Number of active WebSocket connections',
    labelNames: ['namespace'],
    registers: [register],
});

export const wsEventsTotal = new client.Counter({
    name: 'websocket_events_total',
    help: 'Total WebSocket events emitted',
    labelNames: ['event', 'namespace'],
    registers: [register],
});

// ─────────────────────────────────────────────────────────────────────────────
//  Queue Metrics
// ─────────────────────────────────────────────────────────────────────────────
export const queueJobsTotal = new client.Counter({
    name: 'queue_jobs_total',
    help: 'Total number of queue jobs processed',
    labelNames: ['job_name', 'status'],
    registers: [register],
});

export const queueJobDuration = new client.Histogram({
    name: 'queue_job_duration_seconds',
    help: 'Duration of queue job processing in seconds',
    labelNames: ['job_name'],
    buckets: [0.1, 0.5, 1, 2, 5, 10, 30],
    registers: [register],
});

export const queueDepth = new client.Gauge({
    name: 'queue_depth',
    help: 'Number of pending jobs in the queue',
    labelNames: ['queue_name'],
    registers: [register],
});

// ─────────────────────────────────────────────────────────────────────────────
//  Cache Metrics
// ─────────────────────────────────────────────────────────────────────────────
export const cacheHits = new client.Counter({
    name: 'cache_hits_total',
    help: 'Total number of cache hits',
    labelNames: ['route'],
    registers: [register],
});

export const cacheMisses = new client.Counter({
    name: 'cache_misses_total',
    help: 'Total number of cache misses',
    labelNames: ['route'],
    registers: [register],
});

// ─────────────────────────────────────────────────────────────────────────────
//  Auth Metrics
// ─────────────────────────────────────────────────────────────────────────────
export const authAttemptsTotal = new client.Counter({
    name: 'auth_attempts_total',
    help: 'Total authentication attempts',
    labelNames: ['type', 'result'],
    registers: [register],
});

// ─────────────────────────────────────────────────────────────────────────────
//  System / Info Metrics
// ─────────────────────────────────────────────────────────────────────────────
export const appInfo = new client.Gauge({
    name: 'app_info',
    help: 'Application information',
    labelNames: ['version', 'node_version', 'environment'],
    registers: [register],
});

// Set static info gauge
appInfo.set(
    {
        version: process.env.npm_package_version || '1.0.0',
        node_version: process.version,
        environment: process.env.NODE_ENV || 'development',
    },
    1
);
