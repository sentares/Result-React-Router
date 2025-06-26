const staticCacheName = 'static-site-v1'
const dynamicCacheName = 'dynamic-site-v1'

const ASSETS = self.__WB_MANIFEST.map(asset => asset.url)

self.addEventListener('install', async event => {
	console.log('[SW] install')

	const cache = await caches.open(staticCacheName)
	await cache.addAll([...ASSETS, '/offline.html'])
})

self.addEventListener('activate', async event => {
	console.log('[SW] activate')
	const cachesKeysArr = await caches.keys()
	await Promise.all(
		cachesKeysArr
			.filter(key => key !== staticCacheName)
			.map(key => caches.delete(key))
	)
})

self.addEventListener('fetch', event => {
	console.log('[SW] fetch')

	event.respondWith(cacheFirst(event.request))
})

async function cacheFirst(request) {
	const cached = await caches.match(request)
	try {
		return (
			cached ??
			(await fetch(request).then(response => {
				return networkFirst(request)
			}))
		)
	} catch (error) {
		return networkFirst(request)
	}
}

async function networkFirst(request) {
	const cache = await caches.open(dynamicCacheName)

	try {
		const response = await fetch(request)
		await cache.put(request, response.clone())
		return response
	} catch (error) {
		const cached = await caches.match(request)
		return cached ?? (await caches.match('/offline.html'))
	}
}
