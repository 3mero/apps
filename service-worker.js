// اسم ذاكرة التخزين المؤقت
const CACHE_NAME = 'apk-store-cache-v1';
// الملفات التي سيتم تخزينها مؤقتًا
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

// تثبيت Service Worker وتخزين الملفات مؤقتًا
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// تفعيل Service Worker وإزالة التخزين المؤقت القديم إذا تم تحديثه
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// إرجاع الملفات المخزنة مؤقتًا عند طلبها
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // إذا كان الملف مخزن مؤقتًا، يتم إرجاعه
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
