var cacheVersion = 'Cache v1'
self.addEventListener('install', function (event) {
	self.skipWaiting();
	event.waitUntil(caches.open(cacheVersion).then(function (cache) {
		return cache.addAll([
			'/css/gitalk-v1.7.0.css',
			'/css/uikit-v3.6.3.css',
			'/css/styles.min.css',
			'/js/gitalk-v1.7.0.js',
			'/js/lunr-v2.3.9.js',
			'/js/netlify-cms-v2.10.77.js',
			'/js/netlify-identity-widget-v1.9.1.js',
			'/js/uikit-v3.6.3.js',
			'/js/scripts.min.js',
			'/yml/netlify-cms-config.yml',
			'/favicon.ico',
			'/site.webmanifest',
			'/browserconfig.xml',
			'/images/android-chrome-192x192.png',
			'/images/android-chrome-512x512-maskable.png',
			'/images/android-chrome-512x512.png',
			'/images/apple-touch-icon.png',
			'/images/favicon-32x32.png',
			'/images/logo.png',
			'/images/mstile-150x150.png',
			'/images/safari-pinned-tab.svg',
			'/fonts/font01.woff2',
			'/fonts/font02.woff2',
			'/fonts/font03.woff2',
			'/fonts/font04.woff2',
			'/fonts/font05.woff2',
			'/fonts/font06.woff2',
			'/fonts/font07.woff2',
			'/fonts/font08.woff2',
			'/fonts/font09.woff2',
			'/fonts/font10.woff2',
			'/fonts/font11.woff2',
			'/fonts/font12.woff2',
			'/fonts/font13.woff2',
			'/fonts/font14.woff2',
			'/fonts/font15.woff2',
			'/index.json',
			'/'
		]);
	}));
});
self.addEventListener('activate', event => {
	event.waitUntil(caches.keys().then(cacheNames => {
		return Promise.all(cacheNames.map(cacheName => {
			if (cacheVersion.indexOf(cacheName) === -1) {
				return caches.delete(cacheName);
			}
		}));
	}));
});
self.addEventListener('fetch', function (event) {
	event.respondWith(caches.match(event.request).then(function (response) {
		return response || fetch(event.request);
	}));
});