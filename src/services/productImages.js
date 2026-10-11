const IMAGE_TIMEOUT_MS = 15000;

export function preloadImage(url) {
    if (!url) {
        return Promise.reject(new Error("A product image URL is missing."));
    }

    return new Promise((resolve, reject) => {
        const image = new Image();
        const timeoutId = window.setTimeout(() => {
            image.onload = null;
            image.onerror = null;
            reject(new Error("The product image took too long to load."));
        }, IMAGE_TIMEOUT_MS);

        image.onload = () => {
            window.clearTimeout(timeoutId);
            resolve();
        };
        image.onerror = () => {
            window.clearTimeout(timeoutId);
            reject(new Error("A product image could not be loaded."));
        };
        image.src = url;
    });
}

export function preloadProductThumbnails(products) {
    return Promise.all(products.map(({ thumbnail }) => preloadImage(thumbnail)));
}
