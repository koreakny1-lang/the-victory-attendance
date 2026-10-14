const CACHE_NAME = 'the-victory-attendance-v1';
self.addEventListener('install', event => { self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', event => { /* Online-first: do not cache private attendance data. */ });
