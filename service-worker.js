const CACHE_NAME = "student-dictionary-cache-v1.3";

const ASSETS = [
  "index.html",
  "students.html",
  "dictionary.html",
  "quiz.html",
  "about.html",
  "help.html",
  "style.css",
  "manifest.json",
  "icons/icon-192.png",
  "icons/icon-512.png"
];

// تثبيت Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );

  self.skipWaiting();
});

// تفعيل Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );

  self.clients.claim();
});

// جلب الملفات من الكاش أو من الشبكة
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheRes) => {
      return (
        cacheRes ||
        fetch(event.request).catch(() =>
          caches.match("index.html") // fallback
        )
      );
    })
  );
});



