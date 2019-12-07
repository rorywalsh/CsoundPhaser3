// example based on Steven's work here
// https://github.com/kunstmusik/csound-serviceworker/blob/master/sw.js

var cacheName = 'WallBall';
var filesToCache = [
    '', 
    'index.html',
    'csound/CsoundObj.js',
    'csound/CsoundProcessor.js',
    'csound/libcsound.js',
    'csound/libcsound.wasm',
    'csound/CsoundScriptProcessorNode.js',
    'csound/libcsound-worklet.js',
    'csound/libcsound-worklet.wasm.js',
    'Ball.js',
    'Enemy.js',
    'sketch.js',
    'p5.dom.js',
    'p5.min.js',
    'WallBall/sw.js'
];

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
          caches.open(cacheName).then(function(cache) {
                  console.log('[ServiceWorker] Caching app shell');
                  return cache.addAll(filesToCache);
                })
        );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});