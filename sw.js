// sw.js - Service Worker

// You will need 3 event listeners:
//   - One for installation
//   - One for activation ( check out MDN's clients.claim() for this step )
//   - One for fetch requests
var CACHE_NAME = 'journal-cache';
var urlsToCache = [
    '/',
    'https://cse110lab6.herokuapp.com/entries',
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});

// activation
self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
});

// fetch
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then(res => {

            if (res) {
                return res;
            }

            return fetch(event.request).then((res) => {
                if (!res || res.status !== 200 || res.type !== 'basic'){
                    return res;
                }

                var responseToCache = res.clone();

                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });

                return res;
            });

        })
    );
});
