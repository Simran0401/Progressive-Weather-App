const CACHE_NAME = "version-1"; //Cache is basically storage of the browser, so if we load something once, if we make a request for example - if we load an image, we don't have to reload the image everytime we go online, we can just take it from the cache. It is faster and more effective
const urlsToCache = ["index.html", "offline.html"];

const self = this; //this represents the serviceWorker itself

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
self.addEventListener("fetch", (event) => {
  // We want to respond with something when we know it is a fetch request
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request) //If there is any request match found in the cache, we simply fetch it and return it
        .catch(() => caches.match("offline.html"));
      //fetch() is also a promise, so if it cannot match the request from the cache, i.e, when we do not get any new data implies that there is no internet connection, so in that case we will load the offline.html
    })
  );
});

// Activate the Service Worker
self.addEventListener("activate", (event) => {
  // We want to remove all the previous caches as there is no need to store all that because often we will have a lot of versions of the cache because data will keep on updating in the cache, so we will keep only the new one
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME); //We always want to keep the cache name

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        //Loop through the cachenames
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            // If the cacheWhitelist does not include the cachename, then we wanrt to delete that specific cachename, but if it includes the cachename in the cacheWhitelist, then we want to keep it. In our case, whenever we update or change something, our cacheWhitelist will only contain the version-1 and other previous versions will be deleted
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
