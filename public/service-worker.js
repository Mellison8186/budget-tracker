const APP_PREFIX = 'BudgetTracker-';
const VERSION = 'version_01';
const CACHE_NAME = APP_PREFIX + VERSION;
const DATA_CACHE_NAME = "data-cache-" + VERSION;
const FILES_TO_CACHE = [
    "./index.html",
    "./css/styles.css",
    "./js/index.js",
    "./icons/icon-72x72.png",
    "./icons/icon-96x96.png",
    "./icons/icon-128x128.png",
    "./icons/icon-144x144.png",
    "./icons/icon-152x152.png",
    "./icons/icon-192x192.png",
    "./icons/icon-384x384.png",
    "./icons/icon-512x512.png"
];

self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            console.log('installing cache: ' + CACHE_NAME)
            return cache.addAll(FILES_TO_CACHE)
        })
    )
});

self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (keyList) {
            let cacheKeeplist = keyList.filter(function (key) {
                return key.indexOf(APP_PREFIX);
            })
        })
    )
});

self.addEventListener('fetch', function (e) {
    console.log('fetch request : ' + e.request.url)

if (e.request.url.includes("/api/")) {
    e.respondWith(
        caches.open(DATA_CACHE_NAME).then(cache => {
            return fetch(e.request).then(response => {
                if (response.status === 200) {
                    cache.put(e.request.url, response.clone())
                }
                return response
            })
            .catch(err => {
                return cache.match(e.request)
            })
        })
        .catch(err => {
            console.log(err)
        })
    )
    return
}
    e.respondWith(
        fetch(e.request).catch(function(){
            return caches.match(e.request).then(function (response) {
                if (response) {
                    return resposne
                } else {
                    return caches.match
                }
            })
        })
    //     if (request) { // if cache is available, respond with cache
    //       console.log('responding with cache : ' + e.request.url)
    //       return request
    //     } else {       // if there are no cache, try fetching request
    //       console.log('file is not cached, fetching : ' + e.request.url)
    //       return fetch(e.request)
    //     }
  
    //     // You can omit if/else for console.log & put one line below like this too.
    //     // return request || fetch(e.request)
    //   })
    // )
)}
)