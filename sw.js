'use strict';

const CACHE = 'conexao-lunar-2027-v5';
const ASSETS = [
  './',
  './index.html',
  './assets/css/style.css',
    './assets/js/app.js',
  './assets/js/i18n.js',
  './assets/js/navigation.js',
  './assets/js/phases.js',
  './assets/js/ingresses.js',
  './assets/js/diary.js',
  './assets/js/planning.js',
  './assets/js/settings.js',
  './assets/js/backup-safety.js',
  './assets/js/install.js',
  './assets/images/landing-aprovada.png',
  
  './assets/icons/conexao-lunar-icon-192.png',
  './assets/icons/conexao-lunar-icon-512.png',
  './assets/icons/conexao-lunar-favicon.png',

  './manifest.webmanifest'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith('conexao-lunar-2027-') && key !== CACHE)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

/* Rede primeiro: evita que alterações do GitHub fiquem presas no cache. */
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, copy));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
