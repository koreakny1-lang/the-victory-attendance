const CACHE_NAME = 'the-victory-attendance-v2';
self.addEventListener('install', event => { self.skipWaiting(); });
self.addEventListener('activate', event => { event.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', event => { /* 개인 출석 데이터는 캐시하지 않습니다. */ });
self.addEventListener('push', event => {
  let data = {};
  try { data = event.data ? event.data.json() : {}; } catch (_) {}
  const title = String(data.title || '더승리태권도');
  const options = { body: String(data.body || '새 출석 알림이 도착했습니다.'), icon: '/icon-192.png', badge: '/icon-192.png', data: { url: String(data.url || '/parent.html') } };
  event.waitUntil(self.registration.showNotification(title, options));
});
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const target = new URL(event.notification.data?.url || '/parent.html', self.location.origin);
  if (target.origin !== self.location.origin) return;
  event.waitUntil(clients.matchAll({ type: 'window', includeUncontrolled: true }).then(async windows => {
    for (const windowClient of windows) {
      if (windowClient.url === target.href && 'focus' in windowClient) return windowClient.focus();
    }
    return clients.openWindow(target.href);
  }));
});
