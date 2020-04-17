const cacheName = "cache_V1";
const appFiles = [
  "/manifest.json",
  "/js/scripts.js",
  "/css/stylesheet.css",
  "/images/yes.gif",
  "/index.html",
  "/"
];

self.addEventListener("install", installing => {
  console.log("Service Worker: I am being installed, hello world!");
  installing.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log("Service Worker: Caching important offline files");
      return cache.addAll(appFiles);
    })
  );
});

self.addEventListener("activate", activating => {
  console.log("Service Worker: All systems online, ready to go!");
});

self.addEventListener("fetch", fetching => {
  console.log("Service Worker: User threw a ball, I need to fetch it!");
});

self.addEventListener("push", pushing => {
  if(pushing.data){
    pushdata=JSON.parse(pushing.data.text());		
    console.log("Service Worker: I received this:",pushdata);
    if((pushdata["title"]!="")&&(pushdata["message"]!="")){			
      const options={ body:pushdata["message"] }
      self.registration.showNotification(pushdata["title"],options);
      console.log("Service Worker: I made a notification for the user");
    } else {
      console.log("Service Worker: I didn't make a notification for the user, not all the info was there :(");			
    }
  }
  console.log(
    "Service Worker: I received some push data, but because I am still very simple I don't know what to do with it :("
  );
});

self.addEventListener("notificationclick",function(clicking){
  const pageToOpen="https://www.instagram.com/gawkgawk.100/?hl=nl";
	const promiseChain=clients.openWindow(pageToOpen);
	event.waitUntil(promiseChain);
});
