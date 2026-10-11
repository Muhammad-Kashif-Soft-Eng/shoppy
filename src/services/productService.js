import axios from "axios";

const API_URL = "https://dummyjson.com";
const FEATURED_PRODUCT_COUNT = 8;
const PRODUCT_LIMIT = 0;

function normalizeCategorySlug(category) {
    return category.toLowerCase().trim().replaceAll(" ", "-");
}

function normalizeProduct(product) {
    const thumbnail = typeof product.thumbnail === "string" ? product.thumbnail : "";
    const images = Array.isArray(product.images)
        ? product.images.filter((image) => typeof image === "string")
        : [];

    return {
        id: product.id,
        title: product.title,
        description: product.description,
        price: product.price,
        rating: Number.isFinite(product.rating) ? product.rating : null,
        category:
            typeof product.category === "string"
                ? normalizeCategorySlug(product.category)
                : "",
        thumbnail,
        images: [...new Set([thumbnail, ...images].filter(Boolean))],
        brand: product.brand ?? "",
        discountPercentage: product.discountPercentage ?? null,
        stock: product.stock ?? null,
        availabilityStatus: product.availabilityStatus ?? "",
        warrantyInformation: product.warrantyInformation ?? "",
        shippingInformation: product.shippingInformation ?? "",
        returnPolicy: product.returnPolicy ?? "",
    };
}

function normalizeProducts(data) {
    if (!data || !Array.isArray(data.products)) {
        throw new Error("The product API returned an invalid product list.");
    }

    return data.products.map(normalizeProduct);
}

export async function getProducts(category = "") {
    const path = category
        ? `/products/category/${encodeURIComponent(category)}`
        : "/products";
    const response = await axios.get(`${API_URL}${path}`, {
        params: { limit: PRODUCT_LIMIT },
        timeout: 15000,
    });

    return normalizeProducts(response.data);
}

export async function getFeaturedProducts() {
    const response = await axios.get(`${API_URL}/products`, {
        params: { limit: FEATURED_PRODUCT_COUNT, select: "id,title,description,price,rating,category,thumbnail,images,brand,discountPercentage,stock,availabilityStatus,warrantyInformation,shippingInformation,returnPolicy" },
        timeout: 15000,
    });

    return normalizeProducts(response.data);
}

export async function getProductById(id) {
    const response = await axios.get(`${API_URL}/products/${encodeURIComponent(id)}`, {
        timeout: 15000,
    });
    const product = response.data;

    if (!product || typeof product !== "object" || !Number.isFinite(product.id)) {
        throw new Error("The product API returned an invalid product.");
    }

    return normalizeProduct(product);
}

export async function getCategories() {
    const response = await axios.get(`${API_URL}/products/categories`, {
        timeout: 15000,
    });

    if (
        !Array.isArray(response.data) ||
        !response.data.every(
            (category) =>
                category &&
                typeof category.slug === "string" &&
                typeof category.name === "string",
        )
    ) {
        throw new Error("The product API returned an invalid category list.");
    }

    return response.data.map(({ name, slug }) => ({ name, slug }));
}
