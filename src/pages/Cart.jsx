import { Link } from "react-router";
import {
    ArrowLeft,
    Minus,
    Plus,
    ShieldCheck,
    ShoppingBag,
    Trash2,
    Truck,
} from "lucide-react";

import { useCart } from "@/context/useCart";

const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

function Cart() {
    const {
        items,
        cartCount,
        cartSubtotal,
        cartShipping,
        cartTax,
        cartTotal,
        updateQuantity,
        removeItem,
        clearCart,
    } = useCart();

    const amountToFreeShipping = Math.max(0, 50.01 - cartSubtotal);
    const shippingProgress = Math.min((cartSubtotal / 50.01) * 100, 100);

    if (items.length === 0) {
        return (
            <section className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
                <span className="flex size-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-700">
                    <ShoppingBag size={30} />
                </span>
                <h1 className="mt-6 text-3xl font-black tracking-tight text-zinc-950">
                    Your cart is empty
                </h1>
                <p className="mt-2 max-w-md text-sm leading-6 text-zinc-600">
                    Browse the catalog and add something you love. Your cart will be saved in this browser.
                </p>
                <Link
                    to="/products"
                    className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
                >
                    <ShoppingBag size={17} />
                    Start shopping
                </Link>
            </section>
        );
    }

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <Link
                to="/products"
                className="inline-flex min-h-10 items-center gap-2 rounded-lg text-sm font-semibold text-zinc-600 transition-colors hover:text-orange-700"
            >
                <ArrowLeft size={16} />
                Continue shopping
            </Link>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-700">
                        Your selections
                    </p>
                    <h1 className="mt-2 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
                        Shopping cart
                    </h1>
                </div>
                <button
                    type="button"
                    onClick={clearCart}
                    className="inline-flex min-h-10 items-center gap-2 self-start rounded-lg px-3 text-sm font-semibold text-zinc-500 transition-colors hover:bg-red-50 hover:text-red-700 sm:self-auto"
                >
                    <Trash2 size={16} />
                    Clear cart
                </button>
            </div>

            <div className="mt-8 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
                <div className="min-w-0 space-y-4">
                    {items.map((item) => (
                        <article
                            key={item.id}
                            className="flex min-w-0 flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-4 sm:flex-row sm:items-center sm:p-5"
                        >
                            <Link
                                to={`/products/${item.id}`}
                                className="flex size-24 shrink-0 items-center justify-center self-start overflow-hidden rounded-xl bg-zinc-50 p-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600 sm:size-28 sm:self-auto"
                                aria-label={`View ${item.title}`}
                            >
                                {item.thumbnail || item.image ? (
                                    <img
                                        src={item.thumbnail || item.image}
                                        alt={item.title}
                                        className="h-full w-full object-contain"
                                    />
                                ) : (
                                    <ShoppingBag className="text-zinc-400" />
                                )}
                            </Link>

                            <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="min-w-0">
                                    <Link
                                        to={`/products/${item.id}`}
                                        className="font-semibold leading-6 text-zinc-900 hover:text-orange-700"
                                    >
                                        <h2 className="line-clamp-2 break-words">{item.title}</h2>
                                    </Link>
                                    {item.category && (
                                        <p className="mt-1 text-xs capitalize text-zinc-500">
                                            {item.category.replaceAll("-", " ")}
                                        </p>
                                    )}
                                    <p className="mt-2 text-sm font-medium text-zinc-700">
                                        {currency.format(item.price)} each
                                    </p>
                                </div>

                                <div className="flex items-center justify-between gap-4 sm:justify-end">
                                    <div
                                        className="inline-flex h-10 shrink-0 items-center rounded-lg border border-zinc-200"
                                        aria-label={`Quantity for ${item.title}`}
                                    >
                                        <button
                                            type="button"
                                            onClick={() =>
                                                updateQuantity(item.id, item.quantity - 1)
                                            }
                                            aria-label={`Decrease ${item.title} quantity`}
                                            className="inline-flex size-10 items-center justify-center rounded-l-lg text-zinc-600 transition-colors hover:bg-zinc-50"
                                        >
                                            <Minus size={15} />
                                        </button>
                                        <span
                                            className="min-w-9 text-center text-sm font-semibold text-zinc-900"
                                            aria-live="polite"
                                        >
                                            {item.quantity}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                updateQuantity(item.id, item.quantity + 1)
                                            }
                                            aria-label={`Increase ${item.title} quantity`}
                                            className="inline-flex size-10 items-center justify-center rounded-r-lg text-zinc-600 transition-colors hover:bg-zinc-50"
                                        >
                                            <Plus size={15} />
                                        </button>
                                    </div>
                                    <p className="min-w-20 text-right text-sm font-bold text-zinc-950">
                                        {currency.format(item.price * item.quantity)}
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => removeItem(item.id)}
                                        aria-label={`Remove ${item.title} from cart`}
                                        className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition-colors hover:bg-red-50 hover:text-red-700"
                                    >
                                        <Trash2 size={17} />
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <aside className="h-fit rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 lg:sticky lg:top-24">
                    <h2 className="text-lg font-bold text-zinc-950">Order summary</h2>
                    <p className="mt-1 text-sm text-zinc-500">
                        {cartCount} {cartCount === 1 ? "item" : "items"}
                    </p>

                    <div className="mt-5 rounded-xl bg-orange-50 p-4">
                        <div className="flex items-start gap-3">
                            <Truck size={18} className="mt-0.5 shrink-0 text-orange-700" />
                            <p className="text-sm leading-5 text-orange-900">
                                {amountToFreeShipping > 0
                                    ? `Add ${currency.format(amountToFreeShipping)} for free shipping.`
                                    : "You have unlocked free shipping!"}
                            </p>
                        </div>
                        <div
                            className="mt-3 h-2 overflow-hidden rounded-full bg-orange-100"
                            role="progressbar"
                            aria-label="Progress to free shipping"
                            aria-valuemin={0}
                            aria-valuemax={50.01}
                            aria-valuenow={Math.min(cartSubtotal, 50.01)}
                        >
                            <div
                                className="h-full rounded-full bg-orange-600 transition-[width]"
                                style={{ width: `${shippingProgress}%` }}
                            />
                        </div>
                    </div>

                    <dl className="mt-5 space-y-3 text-sm">
                        <div className="flex justify-between gap-3 text-zinc-600">
                            <dt>Subtotal</dt>
                            <dd>{currency.format(cartSubtotal)}</dd>
                        </div>
                        <div className="flex justify-between gap-3 text-zinc-600">
                            <dt>Shipping</dt>
                            <dd className={cartShipping === 0 ? "font-semibold text-green-700" : ""}>
                                {cartShipping === 0 ? "Free" : currency.format(cartShipping)}
                            </dd>
                        </div>
                        <div className="flex justify-between gap-3 text-zinc-600">
                            <dt>Estimated tax</dt>
                            <dd>{currency.format(cartTax)}</dd>
                        </div>
                        <div className="flex justify-between gap-3 border-t border-zinc-200 pt-4 text-base font-bold text-zinc-950">
                            <dt>Total</dt>
                            <dd>{currency.format(cartTotal)}</dd>
                        </div>
                    </dl>

                    <Link
                        to="/checkout"
                        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-orange-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                    >
                        Proceed to checkout
                    </Link>
                    <p className="mt-4 flex items-center justify-center gap-2 text-center text-xs leading-5 text-zinc-500">
                        <ShieldCheck size={15} className="shrink-0" />
                        Sample catalog checkout
                    </p>
                </aside>
            </div>
        </section>
    );
}

export default Cart;
