import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";

import { useCart } from "@/context/useCart";
import { useOrders } from "@/context/useOrders";

const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

function Checkout() {
    const { items, cartSubtotal, cartShipping, cartTax, cartTotal, clearCart } = useCart();
    const { placeOrder } = useOrders();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    if (items.length === 0) {
        return (
            <section className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:px-6">
                <h1 className="text-3xl font-black text-zinc-950">Your cart is empty</h1>
                <p className="mt-2 text-sm text-zinc-600">Add products before proceeding to checkout.</p>
                <Link
                    to="/products"
                    className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-orange-600 px-5 text-sm font-semibold text-white hover:bg-orange-700"
                >
                    Browse products
                </Link>
            </section>
        );
    }

    function handleSubmit(event) {
        event.preventDefault();
        setError("");
        const fields = new FormData(event.currentTarget);
        const shipping = Object.fromEntries(fields.entries());

        try {
            const order = placeOrder(
                items,
                {
                    subtotal: cartSubtotal,
                    shipping: cartShipping,
                    tax: cartTax,
                    total: cartTotal,
                },
                shipping,
            );
            clearCart();
            navigate("/order-confirmation", { state: { orderId: order.id } });
        } catch (err) {
            setError(err.message || "We couldn't place your demo order. Please try again.");
        }
    }

    return (
        <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <Link
                to="/cart"
                className="inline-flex min-h-10 items-center gap-2 rounded-lg text-sm font-semibold text-zinc-600 hover:text-orange-700"
            >
                <ArrowLeft size={16} />
                Back to cart
            </Link>
            <h1 className="mt-4 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
                Checkout
            </h1>
            <p className="mt-2 text-sm text-zinc-600">
                Enter delivery details to place a sample order.
            </p>

            <div className="mt-8 grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
                <form
                    onSubmit={handleSubmit}
                    className="min-w-0 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-7"
                >
                    <h2 className="text-lg font-bold text-zinc-950">Delivery details</h2>
                    {error && (
                        <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700" role="alert">
                            {error}
                        </p>
                    )}
                    <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {[
                            { name: "firstName", label: "First name", autocomplete: "given-name" },
                            { name: "lastName", label: "Last name", autocomplete: "family-name" },
                            { name: "address", label: "Street address", autocomplete: "street-address", wide: true },
                            { name: "city", label: "City", autocomplete: "address-level2" },
                            { name: "state", label: "State / region", autocomplete: "address-level1" },
                            { name: "zip", label: "ZIP / postal code", autocomplete: "postal-code" },
                        ].map((field) => (
                            <div key={field.name} className={field.wide ? "sm:col-span-2" : ""}>
                                <label htmlFor={`shipping-${field.name}`} className="text-sm font-semibold text-zinc-800">
                                    {field.label}
                                </label>
                                <input
                                    id={`shipping-${field.name}`}
                                    name={field.name}
                                    autoComplete={field.autocomplete}
                                    required
                                    maxLength={100}
                                    className="mt-2 h-12 w-full rounded-xl border border-zinc-200 px-3 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                                />
                            </div>
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-orange-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-orange-700 sm:w-auto"
                    >
                        Place demo order
                    </button>
                </form>

                <aside className="h-fit rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 lg:sticky lg:top-24">
                    <h2 className="text-lg font-bold text-zinc-950">Order summary</h2>
                    <ul className="mt-4 max-h-64 space-y-3 overflow-y-auto">
                        {items.map((item) => (
                            <li key={item.id} className="flex justify-between gap-3 text-sm">
                                <span className="min-w-0 text-zinc-600">
                                    <span className="line-clamp-2">{item.title}</span>
                                    <span className="text-xs">Qty {item.quantity}</span>
                                </span>
                                <span className="shrink-0 font-medium text-zinc-900">
                                    {currency.format(item.price * item.quantity)}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <dl className="mt-5 space-y-3 border-t border-zinc-200 pt-4 text-sm">
                        <div className="flex justify-between text-zinc-600">
                            <dt>Subtotal</dt>
                            <dd>{currency.format(cartSubtotal)}</dd>
                        </div>
                        <div className="flex justify-between text-zinc-600">
                            <dt>Shipping</dt>
                            <dd>{cartShipping === 0 ? "Free" : currency.format(cartShipping)}</dd>
                        </div>
                        <div className="flex justify-between text-zinc-600">
                            <dt>Estimated tax</dt>
                            <dd>{currency.format(cartTax)}</dd>
                        </div>
                        <div className="flex justify-between border-t border-zinc-200 pt-4 text-base font-bold text-zinc-950">
                            <dt>Total</dt>
                            <dd>{currency.format(cartTotal)}</dd>
                        </div>
                    </dl>
                </aside>
            </div>
        </section>
    );
}

export default Checkout;
