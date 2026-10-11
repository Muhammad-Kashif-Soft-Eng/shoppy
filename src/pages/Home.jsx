import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
    ArrowRight,
    ArrowUpRight,
    RefreshCw,
    ShoppingBag,
    Tag,
} from "lucide-react";

import ProductCard from "@/components/products/ProductCard";
import {
    getFeaturedProducts,
    getCategories,
} from "@/services/productService";
import { preloadProductThumbnails } from "@/services/productImages";

function ProductSkeleton() {
    return (
        <div
            aria-hidden="true"
            className="min-w-0 animate-pulse rounded-2xl border border-zinc-200 bg-white p-3 sm:p-4"
        >
            <div className="aspect-square rounded-xl bg-zinc-100" />
            <div className="mt-4 h-3 w-1/3 rounded bg-zinc-100" />
            <div className="mt-3 h-4 w-full rounded bg-zinc-100" />
            <div className="mt-2 h-4 w-2/3 rounded bg-zinc-100" />
            <div className="mt-4 h-10 rounded-xl bg-zinc-100" />
        </div>
    );
}

function CategorySkeleton() {
    return (
        <div
            aria-hidden="true"
            className="h-16 animate-pulse rounded-2xl border border-zinc-200 bg-zinc-100 sm:h-20"
        />
    );
}

function Home() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [productsLoading, setProductsLoading] = useState(true);
    const [categoriesLoading, setCategoriesLoading] = useState(true);

    const [productsError, setProductsError] = useState("");
    const [categoriesError, setCategoriesError] = useState("");

    const [retryKey, setRetryKey] = useState(0);

    useEffect(() => {
        let cancelled = false;
        let retryTimer;

        async function loadHomeData() {
            setProductsLoading(true);
            setCategoriesLoading(true);
            setProducts([]);
            setProductsError("");
            setCategoriesError("");

            const [productsResult, categoriesResult] =
                await Promise.allSettled([
                    getFeaturedProducts().then(async (result) => {
                        await preloadProductThumbnails(result);
                        return result;
                    }),
                    getCategories(),
                ]);

            if (cancelled) return;

            if (productsResult.status === "fulfilled") {
                setProducts(productsResult.value);
                setProductsLoading(false);
            } else {
                setProducts([]);
                setProductsError(
                    "We couldn't load products and images. Retrying automatically in a few seconds."
                );
                retryTimer = window.setTimeout(loadHomeData, 3000);
            }

            if (categoriesResult.status === "fulfilled") {
                setCategories(categoriesResult.value.slice(0, 6));
            } else {
                setCategories([]);
                setCategoriesError(
                    "We couldn't load categories. Please try again."
                );
            }
            setCategoriesLoading(false);
        }

        loadHomeData();

        return () => {
            cancelled = true;
            window.clearTimeout(retryTimer);
        };
    }, [retryKey]);

    const featuredProduct = products[0];

    function handleRetry() {
        setRetryKey((previousKey) => previousKey + 1);
    }

    return (
        <div className="w-full min-w-0">

            {/* Hero section */}
            <section className="w-full min-w-0 overflow-hidden bg-zinc-950 text-white">
                <div className="mx-auto grid w-full min-w-0 max-w-7xl grid-cols-1 items-center gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-20">

                    {/* Hero content */}
                    <div className="min-w-0">
                        <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs font-medium text-orange-300 sm:text-sm">
                            <ShoppingBag size={15} className="shrink-0" />
                            Your everyday shopping destination
                        </span>

                        <h1 className="mt-6 max-w-xl break-words text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                            Discover your next{" "}
                            <span className="text-orange-500">
                                favorite
                            </span>{" "}
                            find.
                        </h1>

                        <p className="mt-5 max-w-lg break-words text-sm leading-7 text-zinc-300 sm:text-base">
                            Explore products, browse categories, and find
                            something that fits your style.
                        </p>

                        <div className="mt-7 flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap">
                            <Link
                                to="/products"
                                className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500 sm:w-auto"
                            >
                                Shop Products
                                <ArrowRight size={17} />
                            </Link>

                            <Link
                                to="/categories"
                                className="inline-flex min-h-12 w-full items-center justify-center rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500 sm:w-auto"
                            >
                                Browse Categories
                            </Link>
                        </div>
                    </div>

                    {/* Dynamic featured product */}
                    <div className="mx-auto w-full min-w-0 max-w-md lg:max-w-none">
                        <div className="relative min-w-0 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900 p-4 sm:p-6">
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full bg-orange-500/15 blur-3xl sm:size-64"
                            />

                            <div className="relative flex min-h-64 min-w-0 flex-col items-center justify-center rounded-2xl bg-[#f4e9dd] p-4 sm:min-h-80 sm:p-6">
                                {featuredProduct ? (
                                    <Link
                                        to={`/products/${featuredProduct.id}`}
                                        aria-label={`View ${featuredProduct.title}`}
                                        className="flex w-full min-w-0 flex-1 items-center justify-center rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                                    >
                                        <img
                                            src={featuredProduct.thumbnail}
                                            alt={featuredProduct.title}
                                            className="h-52 w-full max-w-xs object-contain sm:h-64"
                                        />
                                    </Link>
                                ) : (
                                    <div className="flex min-h-48 flex-col items-center justify-center gap-3 text-zinc-500">
                                        <ShoppingBag size={40} />
                                        <span className="text-sm">
                                            Featured products
                                        </span>
                                    </div>
                                )}
                            </div>

                            {featuredProduct && (
                                <div className="relative mt-4 flex min-w-0 items-center justify-between gap-3">
                                    <div className="min-w-0 flex-1">
                                        <p className="text-xs text-zinc-400">
                                            Featured product
                                        </p>

                                        <Link
                                            to={`/products/${featuredProduct.id}`}
                                            className="mt-1 block rounded-sm text-sm font-semibold leading-5 text-white hover:text-orange-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 sm:text-base"
                                        >
                                            <span className="line-clamp-2 break-words">
                                                {featuredProduct.title}
                                            </span>
                                        </Link>

                                        <p className="mt-2 text-sm font-bold text-orange-400">
                                            {new Intl.NumberFormat("en-US", {
                                                style: "currency",
                                                currency: "USD",
                                            }).format(featuredProduct.price)}
                                        </p>
                                    </div>

                                    <Link
                                        to={`/products/${featuredProduct.id}`}
                                        aria-label={`View ${featuredProduct.title}`}
                                        className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                                    >
                                        <ArrowUpRight size={20} />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories section */}
            <section className="mx-auto w-full min-w-0 max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
                <div className="flex min-w-0 items-end justify-between gap-3">
                    <div className="min-w-0">
                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-700">
                            Explore
                        </p>

                        <h2 className="mt-2 break-words text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
                            Shop by category
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-zinc-500">
                            Browse the available product categories.
                        </p>
                    </div>

                    <Link
                        to="/categories"
                        className="inline-flex min-h-10 shrink-0 items-center gap-1 rounded-md text-sm font-semibold text-zinc-700 transition-colors hover:text-orange-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600"
                    >
                        <span className="hidden sm:inline">
                            View all
                        </span>
                        <span className="sm:hidden">
                            All
                        </span>
                        <ArrowRight size={16} />
                    </Link>
                </div>

                {categoriesLoading && (
                    <div className="mt-6 grid min-w-0 grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
                        {Array.from({ length: 6 }, (_, index) => (
                            <CategorySkeleton key={index} />
                        ))}
                    </div>
                )}

                {categoriesError && (
                    <div
                        role="alert"
                        className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4"
                    >
                        <p className="text-sm text-red-700">
                            {categoriesError}
                        </p>

                        <button
                            type="button"
                            onClick={handleRetry}
                            className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-red-700 hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            <RefreshCw size={15} />
                            Try again
                        </button>
                    </div>
                )}

                {!categoriesLoading &&
                    !categoriesError &&
                    categories.length === 0 && (
                        <p className="mt-6 text-sm text-zinc-500">
                            No categories are available right now.
                        </p>
                    )}

                {!categoriesLoading &&
                    !categoriesError &&
                    categories.length > 0 && (
                        <div className="mt-6 grid min-w-0 grid-cols-2 gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
                            {categories.map((category) => (
                                <Link
                                    key={category.slug}
                                    to={`/products?category=${encodeURIComponent(category.slug)}`}
                                    className="group flex min-h-16 min-w-0 items-center justify-between gap-2 rounded-2xl border border-zinc-200 bg-white p-3 transition-colors hover:border-orange-300 hover:bg-orange-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 sm:min-h-20 sm:gap-3 sm:p-4"
                                >
                                    <span className="flex min-w-0 items-center gap-2 sm:gap-3">
                                        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-700 transition-colors group-hover:bg-orange-100 sm:size-10">
                                            <Tag size={18} />
                                        </span>

                                        <span className="min-w-0 break-words text-xs font-semibold capitalize leading-5 text-zinc-800 sm:text-sm">
                                            {category.name}
                                        </span>
                                    </span>

                                    <ArrowUpRight
                                        size={15}
                                        className="shrink-0 text-zinc-400 transition-colors group-hover:text-orange-700"
                                    />
                                </Link>
                            ))}
                        </div>
                    )}
            </section>

            {/* Featured products section */}
            <section className="w-full min-w-0 border-t border-zinc-200 bg-white">
                <div className="mx-auto w-full min-w-0 max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
                    <div className="flex min-w-0 items-end justify-between gap-3">
                        <div className="min-w-0">
                            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-700">
                                Discover
                            </p>

                            <h2 className="mt-2 break-words text-2xl font-bold tracking-tight text-zinc-950 sm:text-3xl">
                                Featured products
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-zinc-500">
                                Browse sample products from the live demo catalog.
                            </p>
                        </div>

                        <Link
                            to="/products"
                            className="inline-flex min-h-10 shrink-0 items-center gap-1 rounded-md text-sm font-semibold text-zinc-700 transition-colors hover:text-orange-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600"
                        >
                            <span className="hidden sm:inline">
                                Shop all
                            </span>
                            <span className="sm:hidden">
                                View all
                            </span>
                            <ArrowRight size={16} />
                        </Link>
                    </div>

                    {/* Loading state */}
                    {productsLoading && (
                        <div aria-busy="true">
                            <div
                                aria-label="Loading featured products and images"
                                className="mt-6 grid min-w-0 grid-cols-2 gap-3 sm:mt-8 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
                            >
                                {Array.from({ length: 8 }, (_, index) => (
                                    <ProductSkeleton key={index} />
                                ))}
                            </div>
                            {productsError && (
                                <p className="mt-4 text-sm text-zinc-500" role="status">
                                    {productsError}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Error state */}
                    {productsError && (
                        <div
                            role="alert"
                            className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5"
                        >
                            <p className="text-sm leading-6 text-red-700">
                                {productsError}
                            </p>

                            <button
                                type="button"
                                onClick={handleRetry}
                                className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-red-700 transition-colors hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            >
                                <RefreshCw size={15} />
                                Try again
                            </button>
                        </div>
                    )}

                    {/* Empty state */}
                    {!productsLoading &&
                        !productsError &&
                        products.length === 0 && (
                            <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-10 text-center">
                                <ShoppingBag
                                    size={28}
                                    className="mx-auto text-zinc-400"
                                />

                                <p className="mt-3 text-sm text-zinc-600">
                                    No products are available right now.
                                </p>
                            </div>
                        )}

                    {/* Product grid */}
                    {!productsLoading &&
                        !productsError &&
                        products.length > 0 && (
                            <div className="mt-6 grid min-w-0 grid-cols-2 gap-3 sm:mt-8 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
                                {products.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </div>
                        )}

                    {/* View all products */}
                    {!productsLoading &&
                        !productsError &&
                        products.length > 0 && (
                            <div className="mt-8 flex justify-center sm:mt-10">
                                <Link
                                    to="/products"
                                    className="inline-flex min-h-12 w-full max-w-xs items-center justify-center gap-2 rounded-xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600 sm:w-auto"
                                >
                                    Explore All Products
                                    <ArrowRight size={17} />
                                </Link>
                            </div>
                        )}
                </div>
            </section>
        </div>
    );
}

export default Home;