import { Link } from "react-router";
import { ArrowUpRight, Heart, ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/context/useCart";
import { useToast } from "@/context/useToast";
import { useWishlist } from "@/context/useWishlist";

function ProductCard({ product }) {
    const { addItem, isInCart } = useCart();
    const { toggleItem, isInWishlist } = useWishlist();
    const { addToast } = useToast();
    const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(product.price);

    function handleAddToCart() {
        addItem(product);
        addToast(`${product.title} added to cart.`);
    }

    function handleWishlistToggle() {
        const wasSaved = isInWishlist(product.id);
        toggleItem(product);
        addToast(
            wasSaved ? "Removed from your wishlist." : "Added to your wishlist.",
            wasSaved ? "info" : "success",
        );
    }

    return (
        <article className="group flex min-w-0 flex-col rounded-2xl border border-zinc-200 bg-white p-3 transition-shadow duration-200 hover:shadow-lg sm:p-4">
            {/* Product image */}
            <Link
                to={`/products/${product.id}`}
                aria-label={`View ${product.title}`}
                className="block min-w-0 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
            >
                <div className="relative aspect-square w-full min-w-0 overflow-hidden rounded-xl bg-zinc-50">
                    {product.thumbnail ? (
                        <img
                            src={product.thumbnail}
                            alt={product.title}
                            loading="lazy"
                            className="h-full w-full object-contain p-3 transition-transform duration-300 group-hover:scale-105 sm:p-5"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center text-sm text-zinc-400">
                            Image unavailable
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={handleWishlistToggle}
                        aria-label={`${isInWishlist(product.id) ? "Remove" : "Add"} ${product.title} ${isInWishlist(product.id) ? "from" : "to"} wishlist`}
                        aria-pressed={isInWishlist(product.id)}
                        className="absolute right-2 top-2 inline-flex size-10 items-center justify-center rounded-full bg-white/95 text-zinc-500 shadow-sm transition-colors hover:text-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 aria-pressed:text-red-600"
                    >
                        <Heart
                            size={18}
                            className={isInWishlist(product.id) ? "fill-current" : ""}
                        />
                    </button>
                </div>
            </Link>

            {/* Product information */}
            <div className="flex min-w-0 flex-1 flex-col pt-4">
                <p className="break-words text-xs capitalize text-zinc-500">
                    {product.category?.replaceAll("-", " ")}
                </p>

                <Link
                    to={`/products/${product.id}`}
                    className="mt-2 min-w-0 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                >
                    <h3 className="line-clamp-2 min-h-10 break-words text-sm font-semibold leading-5 text-zinc-900 transition-colors group-hover:text-orange-700 sm:text-base">
                        {product.title}
                    </h3>
                </Link>

                {/* Rating and price */}
                <div className="mt-3 flex min-w-0 flex-wrap items-center justify-between gap-2">
                    {product.rating != null && (
                        <span className="flex items-center gap-1 text-xs text-zinc-600">
                            <Star
                                size={14}
                                className="shrink-0 fill-amber-400 text-amber-400"
                            />
                            {Number(product.rating).toFixed(1)}
                        </span>
                    )}

                    <span className="break-words text-sm font-bold text-zinc-950 sm:text-base">
                        {formattedPrice}
                    </span>
                </div>

                {/* Product details link */}
                <Link
                    to={`/products/${product.id}`}
                    className="mt-4 flex min-h-10 w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 px-3 py-2 text-sm font-semibold text-zinc-800 transition-colors hover:border-orange-600 hover:bg-orange-50 hover:text-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                >
                    View Details
                    <ArrowUpRight size={16} className="shrink-0" />
                </Link>
                <button
                    type="button"
                    onClick={handleAddToCart}
                    className="mt-2 inline-flex min-h-10 w-full items-center justify-center gap-2 rounded-xl bg-orange-600 px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                >
                    <ShoppingCart size={16} />
                    {isInCart(product.id) ? "Add another" : "Add to cart"}
                </button>
            </div>
        </article>
    );
}

export default ProductCard;