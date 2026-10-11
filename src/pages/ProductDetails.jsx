import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, Heart, Minus, Plus, RefreshCw, ShoppingCart, Star } from "lucide-react";

import { getProductById } from "@/services/productService";
import { preloadImage } from "@/services/productImages";
import { useCart } from "@/context/useCart";
import { useToast } from "@/context/useToast";
import { useWishlist } from "@/context/useWishlist";

const RETRY_DELAY_MS = 3000;

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [retryKey, setRetryKey] = useState(0);
    const [selectedImage, setSelectedImage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const { addItem } = useCart();
    const { addToast } = useToast();
    const { toggleItem, isInWishlist } = useWishlist();

    useEffect(() => {
        let cancelled = false;
        let retryTimer;

        async function loadProduct() {
            setLoading(true);
            setError("");
            setProduct(null);

            try {
                const result = await getProductById(id);
                if (!result.images.length) {
                    throw new Error("The product does not have any images.");
                }

                await Promise.all(result.images.map(preloadImage));

                if (!cancelled) {
                    setProduct(result);
                    setLoading(false);
                }
            } catch {
                if (!cancelled) {
                    setError(
                        "Product details or images couldn't be loaded. Retrying automatically in a few seconds.",
                    );
                    retryTimer = window.setTimeout(loadProduct, RETRY_DELAY_MS);
                }
            }
        }

        loadProduct();
        return () => {
            cancelled = true;
            window.clearTimeout(retryTimer);
        };
    }, [id, retryKey]);

    function handleAddToCart() {
        if (!product) return;
        addItem(product, quantity);
        addToast(`${quantity} × ${product.title} added to cart.`);
    }

    function handleWishlistToggle() {
        if (!product) return;
        const wasSaved = isInWishlist(product.id);
        toggleItem(product);
        addToast(
            wasSaved ? "Removed from your wishlist." : "Added to your wishlist.",
            wasSaved ? "info" : "success",
        );
    }

    return (
        <section className="mx-auto w-full min-w-0 max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <Link
                to="/products"
                className="inline-flex min-h-10 items-center gap-2 rounded-lg text-sm font-semibold text-zinc-600 hover:text-orange-700"
            >
                <ArrowLeft size={16} />
                All products
            </Link>

            {loading && (
                <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-5" role="status">
                    <p className="flex items-center gap-2 text-sm font-semibold text-zinc-700">
                        <RefreshCw size={16} className="animate-spin" />
                        Loading product details and images…
                    </p>
                    {error && (
                        <p className="mt-2 text-sm text-zinc-500">{error}</p>
                    )}
                    <button
                        type="button"
                        onClick={() => setRetryKey((key) => key + 1)}
                        className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-orange-700 hover:bg-orange-50"
                    >
                        <RefreshCw size={15} />
                        Try again now
                    </button>
                </div>
            )}

            {!loading && !error && product && (
                <div className="mt-6 grid min-w-0 gap-8 lg:grid-cols-2 lg:gap-12">
                    <div className="min-w-0">
                        <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-zinc-50 p-6 sm:p-10">
                            {product.thumbnail ? (
                                <img
                                    src={
                                        product.images.includes(selectedImage)
                                            ? selectedImage
                                            : product.thumbnail
                                    }
                                    alt={product.title}
                                    className="h-full w-full object-contain"
                                />
                            ) : (
                                <p className="text-sm text-zinc-400">
                                    Image unavailable
                                </p>
                            )}
                        </div>
                        {product.images.length > 1 && (
                            <div className="mt-3 flex gap-3 overflow-x-auto">
                                {product.images.map((image) => (
                                    <button
                                        key={image}
                                        type="button"
                                        onClick={() => setSelectedImage(image)}
                                        aria-label={`View ${product.title} image`}
                                        aria-pressed={
                                            (product.images.includes(selectedImage)
                                                ? selectedImage
                                                : product.thumbnail) === image
                                        }
                                        className="size-20 shrink-0 rounded-xl border border-zinc-200 bg-zinc-50 p-2 aria-pressed:border-orange-600"
                                    >
                                        <img
                                            src={image}
                                            alt=""
                                            className="h-full w-full object-contain"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="min-w-0 py-2">
                        <Link
                            to={`/products?category=${encodeURIComponent(product.category)}`}
                            className="text-sm font-semibold capitalize text-orange-700 hover:text-orange-800"
                        >
                            {product.category}
                        </Link>
                        <h1 className="mt-3 break-words text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
                            {product.title}
                        </h1>

                        <div className="mt-4 flex flex-wrap items-center gap-4">
                            <p className="text-2xl font-bold text-zinc-950">
                                {new Intl.NumberFormat("en-US", {
                                    style: "currency",
                                    currency: "USD",
                                }).format(product.price)}
                            </p>
                            {product.rating != null && (
                                <span className="inline-flex items-center gap-1 text-sm text-zinc-600">
                                    <Star
                                        size={16}
                                        className="fill-amber-400 text-amber-400"
                                    />
                                    {Number(product.rating).toFixed(1)}
                                </span>
                            )}
                        </div>

                        <p className="mt-6 break-words text-sm leading-7 text-zinc-600 sm:text-base">
                            {product.description}
                        </p>

                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <div className="inline-flex h-12 items-center rounded-xl border border-zinc-200">
                                <button
                                    type="button"
                                    onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                                    aria-label="Decrease quantity"
                                    className="inline-flex size-11 items-center justify-center rounded-l-xl text-zinc-600 hover:bg-zinc-50"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="min-w-10 text-center text-sm font-semibold">
                                    {quantity}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setQuantity((value) => value + 1)}
                                    aria-label="Increase quantity"
                                    className="inline-flex size-11 items-center justify-center rounded-r-xl text-zinc-600 hover:bg-zinc-50"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>
                            <button
                                type="button"
                                onClick={handleAddToCart}
                                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-orange-700 sm:flex-none"
                            >
                                <ShoppingCart size={17} />
                                Add to cart
                            </button>
                            <button
                                type="button"
                                onClick={handleWishlistToggle}
                                aria-label={`${isInWishlist(product.id) ? "Remove from" : "Add to"} wishlist`}
                                aria-pressed={isInWishlist(product.id)}
                                className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl border border-zinc-200 text-zinc-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600 aria-pressed:border-red-200 aria-pressed:text-red-600"
                            >
                                <Heart
                                    size={19}
                                    className={isInWishlist(product.id) ? "fill-current" : ""}
                                />
                            </button>
                        </div>

                        {(product.brand ||
                            product.availabilityStatus ||
                            product.warrantyInformation ||
                            product.shippingInformation ||
                            product.returnPolicy) && (
                            <dl className="mt-6 grid gap-3 rounded-xl border border-zinc-200 p-4 text-sm sm:grid-cols-2">
                                {product.brand && (
                                    <div>
                                        <dt className="font-semibold text-zinc-900">
                                            Brand
                                        </dt>
                                        <dd className="mt-1 text-zinc-600">
                                            {product.brand}
                                        </dd>
                                    </div>
                                )}
                                {product.availabilityStatus && (
                                    <div>
                                        <dt className="font-semibold text-zinc-900">
                                            Availability
                                        </dt>
                                        <dd className="mt-1 text-zinc-600">
                                            {product.availabilityStatus}
                                            {product.stock != null &&
                                                ` (${product.stock} in stock)`}
                                        </dd>
                                    </div>
                                )}
                                {product.shippingInformation && (
                                    <div>
                                        <dt className="font-semibold text-zinc-900">
                                            Shipping
                                        </dt>
                                        <dd className="mt-1 text-zinc-600">
                                            {product.shippingInformation}
                                        </dd>
                                    </div>
                                )}
                                {product.warrantyInformation && (
                                    <div>
                                        <dt className="font-semibold text-zinc-900">
                                            Warranty
                                        </dt>
                                        <dd className="mt-1 text-zinc-600">
                                            {product.warrantyInformation}
                                        </dd>
                                    </div>
                                )}
                                {product.returnPolicy && (
                                    <div>
                                        <dt className="font-semibold text-zinc-900">
                                            Returns
                                        </dt>
                                        <dd className="mt-1 text-zinc-600">
                                            {product.returnPolicy}
                                        </dd>
                                    </div>
                                )}
                            </dl>
                        )}

                    </div>
                </div>
            )}
        </section>
    );
}

export default ProductDetails;
