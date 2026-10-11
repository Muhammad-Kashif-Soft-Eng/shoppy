import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ArrowUpRight, RefreshCw, Tag } from "lucide-react";

import { getCategories } from "@/services/productService";

function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [retryKey, setRetryKey] = useState(0);

    useEffect(() => {
        let cancelled = false;

        async function loadCategories() {
            setLoading(true);
            setError("");

            try {
                const result = await getCategories();
                if (!cancelled) setCategories(result);
            } catch {
                if (!cancelled) {
                    setCategories([]);
                    setError("We couldn't load categories. Please try again.");
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        loadCategories();
        return () => {
            cancelled = true;
        };
    }, [retryKey]);

    return (
        <section className="mx-auto w-full min-w-0 max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-700">
                Live demo catalog
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
                Categories
            </h1>
            <p className="mt-2 text-sm leading-6 text-zinc-500">
                Choose a category to browse its available demo products.
            </p>

            {loading && (
                <p className="mt-8 text-sm text-zinc-500" role="status">
                    Loading categories…
                </p>
            )}

            {error && (
                <div role="alert" className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-5">
                    <p className="text-sm text-red-700">{error}</p>
                    <button
                        type="button"
                        onClick={() => setRetryKey((key) => key + 1)}
                        className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-red-700 hover:bg-red-100"
                    >
                        <RefreshCw size={15} />
                        Try again
                    </button>
                </div>
            )}

            {!loading && !error && categories.length > 0 && (
                <div className="mt-8 grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
                    {categories.map((category) => (
                        <Link
                            key={category.slug}
                            to={`/products?category=${encodeURIComponent(category.slug)}`}
                            className="group flex min-h-20 min-w-0 items-center justify-between gap-3 rounded-2xl border border-zinc-200 bg-white p-4 transition-colors hover:border-orange-300 hover:bg-orange-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                        >
                            <span className="flex min-w-0 items-center gap-3">
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
                                    <Tag size={18} />
                                </span>
                                <span className="break-words text-sm font-semibold capitalize text-zinc-800">
                                    {category.name}
                                </span>
                            </span>
                            <ArrowUpRight
                                size={17}
                                className="shrink-0 text-zinc-400 transition-colors group-hover:text-orange-700"
                            />
                        </Link>
                    ))}
                </div>
            )}

            <p className="mt-8 text-xs leading-5 text-zinc-500">
                Demo catalog only. Categories do not represent real inventory.
            </p>
        </section>
    );
}

export default Categories;
