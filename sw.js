const CACHE ='ns'
const FILES = ['/advanced-programming/CW2/ArrayExamples.html', '/advanced-programming/CW3/inspector.html', 
'/advanced-programming/CW4/index.html', '/advanced-programming/CW5/selectFile.html', '/advanced-programming/CW6/performanceTest.html'
,'/advanced-programming/CW7/documentObjectModel.html', '/advanced-programming/HW1/HW1courseData.html', 
'/advanced-programming/HW2/index.html',
'/advanced-programming/HW3/animations.html']

function installCB(e) {
  e.waitUntil(
    caches.open(CACHE)
    .then(cache => cache.addAll(FILES))
    .catch(console.log)
  )
}
self.addEventListener('install', installCB)

function save(req, resp) {
  return caches.open(CACHE)
  .then(cache => {
    cache.put(req, resp.clone());
    return resp;
  })
  .catch(console.log)
}
function fetchCB(e) { //fetch first
  let req = e.request
  console.log('ns', req.url);
  e.respondWith(
    fetch(req).then(r2 => save(req, r2))
    .catch(() => { return caches.match(req).then(r1 => r1) })
  )
}
self.addEventListener('fetch', fetchCB)