const currentCache = 'current-cache-v1.0.1'

const files = [
  'https://reqres.in/api/users',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js',
  'https://unpkg.com/sweetalert/dist/sweetalert.min.js',
  '/',
  '/index.html',
  '/css/style.css',
  '/js/app.js',
  '/songs.html',
  '/images/album1.jpg',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCache).then(cache => {
      return cache.addAll(files);
    })
  );
  console.log(':D');
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => Promise.all(
      cacheNames.filter(cacheName => {
        return cacheName !== currentCache
      }).map(cacheName => caches.delete(cacheName))
    ))
  );
});

self.addEventListener('fetch', function (event) {
  console.log('used to intercept requests so we can check for the file or data in the cache')
})

// const cleanCache = (cacheName, maxSize) => { //recibes un máximo de caches
//   caches.open(cacheName)
//     .then((cache) => {
//       return cache.keys().then((items) => {
//         console.log(items.length);
//         if (items.length >= maxSize) { //comparar si se supera el tamaño de caches
//           cache.delete(items[0])//eliminar el primer cache
//             .then(() => { cleanCache(cacheName, maxSize) }); //revisar si no hay más caches para eliminar.

//         }
//       })
//     })
// }