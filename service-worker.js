const CACHE_NAME =
    "arm-pyramid-v5";

const APP_FILES = [

    "./",

    "./index.html",

    "./style.css",

    "./script.js",

    "./manifest.json",

    "./icon-192.png",

    "./icon-512.png"

];


/* INSTALL */

self.addEventListener(
    "install",
    event => {

        event.waitUntil(

            caches
                .open(
                    CACHE_NAME
                )
                .then(
                    cache => {

                        return cache.addAll(
                            APP_FILES
                        );

                    }
                )

        );


        self.skipWaiting();

    }
);


/* ACTIVATE */

self.addEventListener(
    "activate",
    event => {

        event.waitUntil(

            caches
                .keys()
                .then(
                    cacheNames => {

                        return Promise.all(

                            cacheNames
                            .filter(
                                cacheName =>
                                    cacheName !==
                                    CACHE_NAME
                            )
                            .map(
                                cacheName =>
                                    caches.delete(
                                        cacheName
                                    )
                            )

                        );

                    }
                )

        );


        self.clients.claim();

    }
);


/* FETCH */

self.addEventListener(
    "fetch",
    event => {

        if (
            event.request.method
            !==
            "GET"
        ) {

            return;

        }


        event.respondWith(

            fetch(
                event.request
            )
            .then(
                networkResponse => {

                    const clone =
                        networkResponse
                        .clone();


                    caches
                        .open(
                            CACHE_NAME
                        )
                        .then(
                            cache => {

                                cache.put(
                                    event.request,
                                    clone
                                );

                            }
                        );


                    return networkResponse;

                }
            )
            .catch(
                () => {

                    return caches.match(
                        event.request
                    );

                }
            )

        );

    }
);