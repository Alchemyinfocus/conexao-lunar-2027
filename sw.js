'use strict';
const CACHE='conexao-lunar-2027-v1';
const ASSETS=['./','./index.html','./assets/css/style.css','./assets/js/app.js','./assets/js/navigation.js','./assets/js/phases.js','./assets/js/ingresses.js','./assets/js/diary.js','./assets/js/planning.js','./assets/js/settings.js','./assets/js/backup-safety.js','./assets/js/install.js','./assets/images/landing-aprovada.png','./assets/icons/icon.svg','./manifest.webmanifest'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('conexao-lunar-2027-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request)))});
