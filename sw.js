// Service Worker for offline support and caching

const CACHE_NAME = 'ecopreloved-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/components.css',
    '/chat.css',
    '/main.js',
    '/components.js',
    '/auth.js',
    '/cart.js',
    '/data.js',
    '/translations.js',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
    // Force new service worker to activate immediately, replacing the broken one
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching files');
                return cache.addAll(urlsToCache);
            })
            .catch((error) => {
                console.log('Service Worker: Cache failed', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            // Take control of all pages immediately
            return clients.claim();
        })
    );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // Clone the request because it's a one-time use stream
                const fetchRequest = event.request.clone();

                return fetch(fetchRequest)
                    .then((response) => {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // For now, we return the network response directly.
                        return response;
                    })
                    .catch((err) => {
                        console.error("Fetch failed:", err);
                        // If image fetch fails, return a placeholder
                        if (event.request.url.match(/\.(jpeg|jpg|gif|png)$/)) {
                            return new Response('<svg>...</svg>', { headers: { 'Content-Type': 'image/svg+xml' } });
                        }
                        // Fallback for document
                        if (event.request.destination === 'document') {
                            return caches.match('/index.html');
                        }

                        // Return simple 404 response instead of undefined
                        return new Response("Network error", { status: 408, headers: { "Content-Type": "text/plain" } });
                    });
            })
    );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

// Push notifications
self.addEventListener('push', (event) => {
    const options = {
        body: event.data ? event.data.text() : 'New notification from EcoPreloved',
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Lihat Produk',
                icon: '/favicon.ico'
            },
            {
                action: 'close',
                title: 'Tutup',
                icon: '/favicon.ico'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('EcoPreloved Marketplace', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Background sync function
function doBackgroundSync() {
    return new Promise((resolve) => {
        // Sync any pending data here
        console.log('Service Worker: Background sync completed');
        resolve();
    });
}

// Message handler for communication with main thread
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

console.log('Service Worker: Registered successfully');