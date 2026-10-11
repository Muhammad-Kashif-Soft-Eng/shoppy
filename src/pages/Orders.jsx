import { useState } from "react";
import { Link, useLocation } from "react-router";
import { ArrowRight, ChevronDown, Package, ShoppingBag } from "lucide-react";

import { useOrders } from "@/context/useOrders";

const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

function OrderCard({ order, isNew }) {
    const [open, setOpen] = useState(isNew);
    const orderDate = new Date(order.date);
    const dateLabel = Number.isNaN(orderDate.getTime())
        ? "Date unavailable"
        : orderDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    const itemCount = order.items.reduce((count, item) => count + item.quantity, 0);

    return (
        <article className={`overflow-hidden rounded-2xl border border-zinc-200 bg-white ${isNew ? "ring-2 ring-orange-300" : ""}`}>
            <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:p-5">
                <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setOpen((value) => !value)}
                    className="flex min-w-0 flex-1 items-center gap-4 text-left"
                >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-700">
                        <Package size={20} />
                    </span>
                    <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                            <span className="break-all font-bold text-zinc-950">{order.id}</span>
                            <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                                Confirmed
                            </span>
                            {isNew && (
                                <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700">
                                    New
                                </span>
                            )}
                        </span>
                        <span className="mt-1 block text-sm text-zinc-500">
                            {dateLabel} · {itemCount} {itemCount === 1 ? "item" : "items"}
                        </span>
                    </span>
                    <ChevronDown
                        size={18}
                        className={`shrink-0 text-zinc-400 transition-transform ${open ? "rotate-180" : ""}`}
                    />
                </button>
                <div className="flex items-center justify-between gap-4 border-t border-zinc-100 pt-3 sm:border-0 sm:pt-0">
                    <div className="sm:text-right">
                        <p className="text-xs text-zinc-500">Order total</p>
                        <p className="text-lg font-bold text-zinc-950">
                            {currency.format(order.total)}
                        </p>
                    </div>
                    <Link
                        to={`/order-summary?orderId=${encodeURIComponent(order.id)}`}
                        className="inline-flex min-h-10 shrink-0 items-center gap-1 rounded-lg border border-zinc-200 px-3 text-sm font-semibold text-zinc-700 transition-colors hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
                    >
                        Details
                        <ArrowRight size={15} />
                    </Link>
                </div>
            </div>

            {open && (
                <div className="border-t border-zinc-200 bg-zinc-50/60 p-4 sm:p-5">
                    <ul className="space-y-3">
                        {order.items.map((item) => (
                            <li key={item.id} className="flex min-w-0 items-center gap-3">
                                <Link
                                    to={`/products/${item.id}`}
                                    aria-label={`View ${item.title}`}
                                    className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-white p-1"
                                >
                                    {item.thumbnail || item.image ? (
                                        <img
                                            src={item.thumbnail || item.image}
                                            alt=""
                                            className="h-full w-full object-contain"
                                        />
                                    ) : (
                                        <ShoppingBag size={18} className="text-zinc-400" />
                                    )}
                                </Link>
                                <div className="min-w-0 flex-1">
                                    <Link
                                        to={`/products/${item.id}`}
                                        className="line-clamp-1 text-sm font-semibold text-zinc-900 hover:text-orange-700"
                                    >
                                        {item.title}
                                    </Link>
                                    <p className="mt-0.5 text-xs text-zinc-500">
                                        Qty {item.quantity} × {currency.format(item.price)}
                                    </p>
                                </div>
                                <p className="shrink-0 text-sm font-semibold text-zinc-900">
                                    {currency.format(item.price * item.quantity)}
                                </p>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-5 grid gap-5 border-t border-zinc-200 pt-4 text-sm sm:grid-cols-2">
                        <div>
                            <h3 className="font-semibold text-zinc-900">Delivery address</h3>
                            <p className="mt-2 text-zinc-600">
                                {order.shipping?.firstName} {order.shipping?.lastName}
                            </p>
                            <p className="text-zinc-600">{order.shipping?.address}</p>
                            <p className="text-zinc-600">
                                {[order.shipping?.city, order.shipping?.state, order.shipping?.zip]
                                    .filter(Boolean)
                                    .join(", ")}
                            </p>
                        </div>
                        <dl className="space-y-1.5 text-zinc-600 sm:ml-auto sm:w-full sm:max-w-xs">
                            <div className="flex justify-between gap-3">
                                <dt>Subtotal</dt>
                                <dd>{currency.format(order.subtotal)}</dd>
                            </div>
                            <div className="flex justify-between gap-3">
                                <dt>Shipping</dt>
                                <dd>{order.shippingCost === 0 ? "Free" : currency.format(order.shippingCost)}</dd>
                            </div>
                            <div className="flex justify-between gap-3">
                                <dt>Estimated tax</dt>
                                <dd>{currency.format(order.tax)}</dd>
                            </div>
                            <div className="flex justify-between gap-3 border-t border-zinc-200 pt-2 font-bold text-zinc-950">
                                <dt>Total</dt>
                                <dd>{currency.format(order.total)}</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            )}
        </article>
    );
}

function Orders() {
    const { orders } = useOrders();
    const { state } = useLocation();
    const newOrderId = state?.orderId;

    if (orders.length === 0) {
        return (
            <section className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-24 lg:px-8">
                <span className="flex size-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-700">
                    <Package size={30} />
                </span>
                <h1 className="mt-6 text-3xl font-black tracking-tight text-zinc-950">
                    No orders yet
                </h1>
                <p className="mt-2 max-w-md text-sm leading-6 text-zinc-600">
                    Completed orders will appear here. Start browsing to find something you like.
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
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-700">
                        Your purchases
                    </p>
                    <h1 className="mt-2 text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
                        Order history
                    </h1>
                    <p className="mt-2 text-sm text-zinc-600" aria-live="polite">
                        {orders.length} {orders.length === 1 ? "order" : "orders"} saved
                    </p>
                </div>
                <Link
                    to="/products"
                    className="inline-flex min-h-10 items-center justify-center gap-2 self-start rounded-lg border border-zinc-200 px-3 text-sm font-semibold text-zinc-700 transition-colors hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700 sm:self-auto"
                >
                    <ShoppingBag size={16} />
                    Continue shopping
                </Link>
            </div>

            {newOrderId && orders.some((order) => order.id === newOrderId) && (
                <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-900">
                    Order <span className="font-semibold">{newOrderId}</span> was added to your history.
                </div>
            )}

            <div className="mt-6 space-y-4">
                {orders.map((order) => (
                    <OrderCard
                        key={order.id}
                        order={order}
                        isNew={order.id === newOrderId}
                    />
                ))}
            </div>
        </section>
    );
}

export default Orders;
