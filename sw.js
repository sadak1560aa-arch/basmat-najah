const CACHE_NAME = 'basmat-v1';

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
    // نترك الطلبات تمر بشكل طبيعي حالياً
});
