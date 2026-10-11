import { Link } from "react-router";
import { ArrowRight, Heart, ShoppingBag, Trash2 } from "lucide-react";

import { useCart } from "@/context/useCart";
import { useToast } from "@/context/useToast";
import { useWishlist } from "@/context/useWishlist";

const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

function Wishlist() {
    const { items, removeItem, clearWishlist } = useWishlist();
    const { addItem } = useCart();
    const { addToast } = useToast();

    function handleAddToCart(product) {
        addItem(product);
        addToast(`${product.title} added to cart.`);
    }

    if (items.length === 0) {
        return (
            <section className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
                <span className="flex size-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-700">
                    <Heart size={30} />
                </span>
                <h1 className="mt-6 text-3xl font-black tracking-tight text-zinc-950">
                    Your wishlist is empty
                </h1>
                <p className="mt-2 max-w-md text-sm leading-6 text-zinc-600">
                    Save products you like and they’ll be waiting for you here.
                </p>
                <Link
                    to="/products"
                    className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
                >
                    <ShoppingBag size={17} />
                    Explore products
                </Link>
            </section>
        );
    }

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-700">
                        Saved for later
                    </p>
                    <h1 className="mt-2 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
                        Your wishlist
                    </h1>
                    <p className="mt-2 text-sm text-zinc-600" aria-live="polite">
                        {items.length} {items.length === 1 ? "product" : "products"} saved
                    </p>
                </div>
                <button
                    type="button"
                    onClick={clearWishlist}
                    className="inline-flex min-h-10 items-center gap-2 self-start rounded-lg px-3 text-sm font-semibold text-zinc-500 transition-colors hover:bg-red-50 hover:text-red-700 sm:self-auto"
                >
                    <Trash2 size={16} />
                    Clear wishlist
                </button>
            </div>

            <div className="mt-6 grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((product) => (
                    <article
                        key={product.id}
                        className="flex min-w-0 gap-4 rounded-2xl border border-zinc-200 bg-white p-4"
                    >
                        <Link
                            to={`/products/${product.id}`}
                            aria-label={`View ${product.title}`}
                            className="flex size-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-zinc-50 p-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 sm:size-28"
                        >
                            {product.thumbnail || product.image ? (
                                <img
                                    src={product.thumbnail || product.image}
                                    alt={product.title}
                                    className="h-full w-full object-contain"
                                />
                            ) : (
                                <ShoppingBag className="text-zinc-400" />
                            )}
                        </Link>

                        <div className="flex min-w-0 flex-1 flex-col">
                            {product.category && (
                                <p className="text-xs capitalize text-zinc-500">
                                    {product.category.replaceAll("-", " ")}
                                </p>
                            )}
                            <Link
                                to={`/products/${product.id}`}
                                className="mt-1 line-clamp-2 break-words text-sm font-semibold leading-5 text-zinc-900 hover:text-orange-700"
                            >
                                {product.title}
                            </Link>
                            <p className="mt-2 text-sm font-bold text-zinc-950">
                                {currency.format(product.price)}
                            </p>

                            <div className="mt-auto flex flex-wrap gap-2 pt-3">
                                <button
                                    type="button"
                                    onClick={() => handleAddToCart(product)}
                                    className="inline-flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-lg bg-orange-600 px-3 text-xs font-semibold text-white transition-colors hover:bg-orange-700"
                                >
                                    <ShoppingBag size={15} />
                                    Add to cart
                                </button>
                                <button
                                    type="button"
                                    onClick={() => removeItem(product.id)}
                                    aria-label={`Remove ${product.title} from wishlist`}
                                    className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg border border-zinc-200 text-zinc-500 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-700"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            <div className="mt-8 flex justify-center">
                <Link
                    to="/products"
                    className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-700 transition-colors hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
                >
                    Keep browsing
                    <ArrowRight size={16} />
                </Link>
            </div>
        </section>
    );
}

export default Wishlist;
