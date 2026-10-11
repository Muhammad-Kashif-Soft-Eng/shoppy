
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router";
import {
    Search,
    SlidersHorizontal,
    X,
    RefreshCw,
    ShoppingBag,
    ArrowUpDown,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import ProductCard from "@/components/products/ProductCard";
import {
    getProducts,
    getCategories,
} from "@/services/productService";
import { preloadProductThumbnails } from "@/services/productImages";

const PRODUCTS_PER_PAGE = 12;

function FilterControls({
    idPrefix,
    categories,
    category,
    minPrice,
    maxPrice,
    onCategoryChange,
    onMinPriceChange,
    onMaxPriceChange,
    onReset,
}) {
    return (
        <>
            <div className="flex items-center justify-between gap-3">
                <h2 className="text-base font-bold text-zinc-950">
                    Filters
                </h2>

                <button
                    type="button"
                    onClick={onReset}
                    className="inline-flex min-h-10 items-center gap-1 rounded-md text-xs font-semibold text-orange-700 hover:text-orange-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                >
                    <RefreshCw size={13} />
                    Reset all
                </button>
            </div>

            <div className="mt-6">
                <label
                    htmlFor={`${idPrefix}-category`}
                    className="text-sm font-semibold text-zinc-800"
                >
                    Category
                </label>

                <select
                    id={`${idPrefix}-category`}
                    value={category}
                    onChange={(event) => onCategoryChange(event.target.value)}
                    className="mt-3 h-11 w-full min-w-0 rounded-lg border border-zinc-200 bg-white px-3 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                >
                    <option value="">All categories</option>
                    {categories.map((item) => (
                        <option key={item.slug} value={item.slug}>
                            {item.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="mt-6">
                <h3 className="text-sm font-semibold text-zinc-800">
                    Price range (USD)
                </h3>

                <div className="mt-3 grid grid-cols-2 gap-3">
                    <div className="min-w-0">
                        <label
                            htmlFor={`${idPrefix}-min-price`}
                            className="text-xs text-zinc-500"
                        >
                            Minimum
                        </label>

                        <input
                            id={`${idPrefix}-min-price`}
                            type="number"
                            min="0"
                            step="0.01"
                            value={minPrice}
                            onChange={(event) => onMinPriceChange(event.target.value)}
                            placeholder="$0"
                            className="mt-2 h-11 w-full min-w-0 rounded-lg border border-zinc-200 px-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 sm:px-3"
                        />
                    </div>

                    <div className="min-w-0">
                        <label
                            htmlFor={`${idPrefix}-max-price`}
                            className="text-xs text-zinc-500"
                        >
                            Maximum
                        </label>

                        <input
                            id={`${idPrefix}-max-price`}
                            type="number"
                            min="0"
                            step="0.01"
                            value={maxPrice}
                            onChange={(event) => onMaxPriceChange(event.target.value)}
                            placeholder="No limit"
                            className="mt-2 h-11 w-full min-w-0 rounded-lg border border-zinc-200 px-2 text-sm outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 sm:px-3"
                        />
                    </div>
                </div>

                {minPrice !== "" &&
                    maxPrice !== "" &&
                    Number(minPrice) > Number(maxPrice) && (
                        <p className="mt-2 text-xs text-red-600" role="alert">
                            Minimum price must not exceed maximum price.
                        </p>
                    )}
            </div>
        </>
    );
}

function Products() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sortBy, setSortBy] = useState("featured");
    const [currentPage, setCurrentPage] = useState(1);

    const [filtersOpen, setFiltersOpen] = useState(false);
    const filtersDialogRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [retryKey, setRetryKey] = useState(0);

    const category = searchParams.get("category") || "";
    const search = searchParams.get("search") || "";

    useEffect(() => {
        const dialog = filtersDialogRef.current;
        if (!dialog) return;

        if (filtersOpen && !dialog.open) {
            dialog.showModal();
        } else if (!filtersOpen && dialog.open) {
            dialog.close();
        }
    }, [filtersOpen]);

    // Fetch products and categories from the API.
    useEffect(() => {
        let cancelled = false;
        let retryTimer;

        async function loadData() {
            setLoading(true);
            setError("");

            try {
                const [productData, categoryData] =
                    await Promise.all([
                        getProducts(),
                        getCategories(),
                    ]);

                await preloadProductThumbnails(productData);

                if (cancelled) return;

                setProducts(productData);
                setCategories(categoryData);
                setLoading(false);
            } catch {
                if (!cancelled) {
                    setError(
                        "We couldn't load the products and images. Retrying automatically in a few seconds."
                    );
                    retryTimer = window.setTimeout(loadData, 3000);
                }
            }
        }

        loadData();

        return () => {
            cancelled = true;
            window.clearTimeout(retryTimer);
        };
    }, [retryKey]);

    // Search, filter, and sort the fetched products.
    const filteredProducts = useMemo(() => {
        let result = [...products];

        const query = search.trim().toLowerCase();

        if (query) {
            result = result.filter((product) =>
                `${product.title} ${product.description} ${product.category}`
                    .toLowerCase()
                    .includes(query)
            );
        }

        if (category) {
            result = result.filter(
                (product) => product.category === category
            );
        }

        if (minPrice !== "") {
            const minimum = Number(minPrice);

            if (Number.isFinite(minimum) && minimum >= 0) {
                result = result.filter(
                    (product) => product.price >= minimum
                );
            }
        }

        if (maxPrice !== "") {
            const maximum = Number(maxPrice);

            if (Number.isFinite(maximum) && maximum >= 0) {
                result = result.filter(
                    (product) => product.price <= maximum
                );
            }
        }

        switch (sortBy) {
            case "price-low":
                result.sort((a, b) => a.price - b.price);
                break;

            case "price-high":
                result.sort((a, b) => b.price - a.price);
                break;

            case "rating":
                result.sort((a, b) => b.rating - a.rating);
                break;

            case "name":
                result.sort((a, b) =>
                    a.title.localeCompare(b.title)
                );
                break;

            default:
                break;
        }

        return result;
    }, [products, search, category, minPrice, maxPrice, sortBy]);

    const pageCount = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
    const displayedPage = Math.min(currentPage, Math.max(pageCount, 1));
    const visibleProducts = useMemo(() => {
        const start = (displayedPage - 1) * PRODUCTS_PER_PAGE;
        return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
    }, [filteredProducts, displayedPage]);

    function handleCategoryChange(value) {
        setCurrentPage(1);

        const nextParams = new URLSearchParams(searchParams);

        if (value) {
            nextParams.set("category", value);
        } else {
            nextParams.delete("category");
        }

        setSearchParams(nextParams, { replace: true });
    }

    function handleSearchChange(value) {
        const nextParams = new URLSearchParams(searchParams);

        if (value) {
            nextParams.set("search", value);
        } else {
            nextParams.delete("search");
        }

        setCurrentPage(1);
        setSearchParams(nextParams, { replace: true });
    }

    function resetFilters() {
        setMinPrice("");
        setMaxPrice("");
        setSortBy("featured");
        setCurrentPage(1);
        setSearchParams({}, { replace: true });
    }

    function handleMinPriceChange(value) {
        setMinPrice(value);
        setCurrentPage(1);
    }

    function handleMaxPriceChange(value) {
        setMaxPrice(value);
        setCurrentPage(1);
    }

    const hasActiveFilters =
        search.trim() !== "" ||
        category !== "" ||
        minPrice !== "" ||
        maxPrice !== "";

    return (
        <section className="w-full min-w-0">
            {/* Page heading */}
            <div className="border-b border-zinc-200 bg-white">
                <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-700">
                        Discover Shoppy
                    </p>

                    <h1 className="mt-2 break-words text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
                        All Products
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500 sm:text-base">
                        Explore our collection and find products that
                        suit your needs.
                    </p>
                </div>
            </div>

            <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                {/* Search and mobile filter controls */}
                <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="relative min-w-0 flex-1">
                        <Search
                            size={19}
                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
                        />

                        <input
                            type="search"
                            value={search}
                            onChange={(event) => {
                                handleSearchChange(event.target.value);
                            }}
                            placeholder="Search products..."
                            aria-label="Search products"
                            className="h-12 w-full min-w-0 rounded-xl border border-zinc-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            setFiltersOpen((open) => !open)
                        }
                        aria-expanded={filtersOpen}
                        aria-controls="mobile-product-filters"
                        className="inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-800 transition hover:border-orange-300 hover:bg-orange-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 sm:w-auto lg:hidden"
                    >
                        <SlidersHorizontal size={17} />
                        {filtersOpen ? "Hide Filters" : "Filters"}
                        {hasActiveFilters && (
                            <span className="size-2 rounded-full bg-orange-600" />
                        )}
                    </button>
                </div>

                <dialog
                    ref={filtersDialogRef}
                    id="mobile-product-filters"
                    aria-labelledby="mobile-filter-heading"
                    onCancel={(event) => {
                        event.preventDefault();
                        setFiltersOpen(false);
                    }}
                    onKeyDown={(event) => {
                        if (event.key === "Escape") {
                            event.preventDefault();
                            setFiltersOpen(false);
                        }
                    }}
                    onClose={() => setFiltersOpen(false)}
                    onClick={(event) => {
                        if (event.target === event.currentTarget) {
                            setFiltersOpen(false);
                        }
                    }}
                    className="m-0 h-full max-h-none w-full max-w-none bg-transparent p-0 text-left backdrop:bg-zinc-950/50 lg:hidden"
                >
                    <section className="ml-auto flex h-full w-full max-w-md flex-col overflow-y-auto bg-white p-4 shadow-xl sm:p-6">
                        <div className="flex items-center justify-between gap-4 border-b border-zinc-200 pb-4">
                            <h2
                                id="mobile-filter-heading"
                                className="text-lg font-bold text-zinc-950"
                            >
                                Product filters
                            </h2>
                            <button
                                type="button"
                                onClick={() => setFiltersOpen(false)}
                                aria-label="Close filters"
                                className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-zinc-600 hover:bg-zinc-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                            >
                                <X size={19} />
                            </button>
                        </div>
                        <div className="flex-1 py-2">
                            <FilterControls
                                idPrefix="mobile"
                                categories={categories}
                                category={category}
                                minPrice={minPrice}
                                maxPrice={maxPrice}
                                onCategoryChange={handleCategoryChange}
                                onMinPriceChange={handleMinPriceChange}
                                onMaxPriceChange={handleMaxPriceChange}
                                onReset={resetFilters}
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => setFiltersOpen(false)}
                            className="mt-4 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-zinc-950 px-4 text-sm font-semibold text-white transition hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                        >
                            Show {filteredProducts.length} results
                        </button>
                    </section>
                </dialog>

                {/* Main content and filters */}
                <div className="mt-6 grid min-w-0 grid-cols-1 gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8">
                    {/* Filters panel */}
                    <aside
                        className="hidden min-w-0 rounded-2xl border border-zinc-200 bg-white p-4 sm:p-5 lg:sticky lg:top-24 lg:block lg:h-fit"
                    >
                        <FilterControls
                            idPrefix="desktop"
                            categories={categories}
                            category={category}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                            onCategoryChange={handleCategoryChange}
                            onMinPriceChange={handleMinPriceChange}
                            onMaxPriceChange={handleMaxPriceChange}
                            onReset={resetFilters}
                        />
                    </aside>

                    {/* Product results */}
                    <div className="min-w-0">
                        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <p
                                className="text-sm text-zinc-600"
                                aria-live="polite"
                            >
                                {loading
                                    ? "Loading products..."
                                    : `${filteredProducts.length} ${filteredProducts.length === 1
                                        ? "product"
                                        : "products"
                                    } found`}
                            </p>

                            <label className="flex min-w-0 items-center gap-2 text-sm text-zinc-600">
                                <ArrowUpDown
                                    size={16}
                                    className="shrink-0"
                                />

                                <span className="shrink-0">
                                    Sort by
                                </span>

                                <select
                                    value={sortBy}
                                    onChange={(event) => {
                                        setSortBy(event.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="h-10 min-w-0 flex-1 rounded-lg border border-zinc-200 bg-white px-2 text-sm text-zinc-800 outline-none focus:border-orange-500 sm:flex-none sm:px-3"
                                    aria-label="Sort products"
                                >
                                    <option value="featured">
                                        Featured
                                    </option>
                                    <option value="price-low">
                                        Price: Low to High
                                    </option>
                                    <option value="price-high">
                                        Price: High to Low
                                    </option>
                                    <option value="rating">
                                        Highest Rated
                                    </option>
                                    <option value="name">
                                        Name: A to Z
                                    </option>
                                </select>
                            </label>
                        </div>

                        {/* Loading state */}
                        {loading && (
                            <div aria-busy="true">
                                <div
                                    aria-label="Loading products and images"
                                    className="mt-5 grid min-w-0 grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4"
                                >
                                    {Array.from(
                                        { length: 8 },
                                        (_, index) => (
                                            <div
                                                key={index}
                                                className="min-w-0 animate-pulse rounded-2xl border border-zinc-200 bg-white p-3 sm:p-4"
                                            >
                                                <div className="aspect-square rounded-xl bg-zinc-100" />
                                                <div className="mt-4 h-3 w-1/2 rounded bg-zinc-100" />
                                                <div className="mt-3 h-4 rounded bg-zinc-100" />
                                                <div className="mt-2 h-4 w-2/3 rounded bg-zinc-100" />
                                                <div className="mt-4 h-10 rounded-xl bg-zinc-100" />
                                            </div>
                                        )
                                    )}
                                </div>
                                {error && (
                                    <div className="mt-4">
                                        <p className="text-sm text-zinc-500" role="status">
                                            {error}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setRetryKey((key) => key + 1)
                                            }
                                            className="mt-2 inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-orange-700 hover:bg-orange-50"
                                        >
                                            <RefreshCw size={15} />
                                            Try again now
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Error state */}
                        {!loading && error && (
                            <div
                                role="alert"
                                className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-5"
                            >
                                <p className="text-sm leading-6 text-red-700">
                                    {error}
                                </p>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setRetryKey((key) => key + 1)
                                    }
                                    className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-red-700 hover:bg-red-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                >
                                    <RefreshCw size={15} />
                                    Try again
                                </button>
                            </div>
                        )}

                        {/* Empty state */}
                        {!loading &&
                            !error &&
                            filteredProducts.length === 0 && (
                                <div className="mt-6 rounded-2xl border border-zinc-200 bg-white px-4 py-12 text-center sm:px-8">
                                    <ShoppingBag
                                        size={32}
                                        className="mx-auto text-zinc-400"
                                    />

                                    <h2 className="mt-4 text-lg font-bold text-zinc-900">
                                        No products found
                                    </h2>

                                    <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-zinc-500">
                                        Try another search or change your
                                        filters to see more products.
                                    </p>

                                    <button
                                        type="button"
                                        onClick={resetFilters}
                                        className="mt-5 inline-flex min-h-11 items-center justify-center rounded-xl bg-zinc-950 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            )}

                        {/* Product grid */}
                        {!loading &&
                            !error &&
                            filteredProducts.length > 0 && (
                                <div className="mt-5 grid min-w-0 grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
                                    {visibleProducts.map((product) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                        />
                                    ))}
                                </div>
                            )}

                        {!loading && !error && pageCount > 1 && (
                            <nav
                                className="mt-8 flex items-center justify-center gap-4"
                                aria-label="Product pages"
                            >
                                <button
                                    type="button"
                                    onClick={() =>
                                        setCurrentPage(displayedPage - 1)
                                    }
                                    disabled={displayedPage === 1}
                                    className="inline-flex min-h-10 items-center gap-1 rounded-lg border border-zinc-200 bg-white px-3 text-sm font-semibold text-zinc-700 transition hover:border-orange-300 hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    <ChevronLeft size={16} />
                                    Previous
                                </button>
                                <span
                                    className="text-sm text-zinc-600"
                                    aria-live="polite"
                                >
                                    Page {displayedPage} of {pageCount}
                                </span>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setCurrentPage(displayedPage + 1)
                                    }
                                    disabled={displayedPage === pageCount}
                                    className="inline-flex min-h-10 items-center gap-1 rounded-lg border border-zinc-200 bg-white px-3 text-sm font-semibold text-zinc-700 transition hover:border-orange-300 hover:bg-orange-50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Next
                                    <ChevronRight size={16} />
                                </button>
                            </nav>
                        )}

                        {/* Back to top of shopping */}
                        {!loading &&
                            !error &&
                            filteredProducts.length > 0 && (
                                <div className="mt-8 flex justify-center">
                                    <Link
                                        to="/"
                                        className="inline-flex min-h-10 items-center gap-2 rounded-lg px-4 text-sm font-semibold text-zinc-600 transition-colors hover:text-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                                    >
                                        Back to Home
                                    </Link>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Products;
