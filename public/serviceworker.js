const CACHE_NAME = "version-1"; //Cache is basically storage of the browser, so if we load something once, if we make a request for example - if we load an image, we don't have to reload the image everytime we go online, we can just take it from the cache. It is faster and more effective
const urlsToCache = ["index.html", "offline.html"];

const self = this; //this represnts the serviceWorker itself

// Install Service Worker
self.addEventListener("install", (event) => {
  // we will open the cache and add "index.html", "offline.html" to the cache
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache); // We wil add all te urls to cache i.e, index.html", "offline.html which are specified in the urlsToCache variable above
    })
  );
});

// Listen for requests
self.addEventListener("fetch", (event) => {});

// Activate the Service Worker
self.addEventListener("activate", (event) => {});
