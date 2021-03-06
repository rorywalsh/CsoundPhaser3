// example based on Steven's work here
// https://github.com/kunstmusik/csound-serviceworker/blob/master/sw.js

var cacheName = 'WallBall';
var filesToCache = [
    'WallBall/', 
    'WallBall/index.html',
    'WallBall/csound/CsoundObj.js',
    'WallBall/csound/CsoundProcessor.js',
    'WallBall/csound/libcsound.js',
    'WallBall/csound/libcsound.wasm',
    'WallBall/csound/CsoundScriptProcessorNode.js',
    'WallBall/csound/libcsound-worklet.js',
    'WallBall/csound/libcsound-worklet.wasm.js',
    'WallBall/js/Ball.js',
    'WallBall/js/Enemy.js',
    'WallBall/js/sketch.js',
    'WallBall/js/p5.dom.js',
    'WallBall/js/p5.min.js',
    'WallBall/js/sw.js'
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