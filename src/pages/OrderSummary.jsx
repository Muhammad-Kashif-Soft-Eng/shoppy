import { Link, useSearchParams } from "react-router";
import { ArrowLeft, Package, ShoppingBag } from "lucide-react";

import { useOrders } from "@/context/useOrders";

const currency = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
});

function OrderSummary() {
    const { orders, getOrder } = useOrders();
    const [searchParams] = useSearchParams();
    const requestedOrderId = searchParams.get("orderId");
    const order = requestedOrderId
        ? getOrder(requestedOrderId)
        : orders[0];

    if (!order) {
        const orderNotFound = Boolean(requestedOrderId);

        return (
            <section className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-24">
                <span className="flex size-16 items-center justify-center rounded-2xl bg-orange-50 text-orange-700">
                    <Package size={30} />
                </span>
                <h1 className="mt-6 text-3xl font-black tracking-tight text-zinc-950">
                    {orderNotFound ? "Order not found" : "No order summary yet"}
                </h1>
                <p className="mt-2 max-w-md text-sm leading-6 text-zinc-600">
                    {orderNotFound
                        ? "This order could not be found in your saved order history."
                        : "Once you complete checkout, your latest order summary will appear here."}
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                    {orders.length > 0 && (
                        <Link
                            to="/orders"
                            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-zinc-200 px-4 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
                        >
                            <ArrowLeft size={16} />
                            Order history
                        </Link>
                    )}
                    <Link
                        to="/products"
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
                    >
                        <ShoppingBag size={16} />
                        Browse products
                    </Link>
                </div>
            </section>
        );
    }

    const orderDate = new Date(order.date);
    const dateLabel = Number.isNaN(orderDate.getTime())
        ? "Date unavailable"
        : orderDate.toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
        });

    return (
        <section className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
            <Link
                to="/orders"
                className="inline-flex min-h-10 items-center gap-2 rounded-lg text-sm font-semibold text-zinc-600 transition-colors hover:text-orange-700"
            >
                <ArrowLeft size={16} />
                Order history
            </Link>

            <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-zinc-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-orange-700">
                        Order summary
                    </p>
                    <h1 className="mt-2 break-all text-2xl font-black tracking-tight text-zinc-950 sm:text-3xl">
                        {order.id}
                    </h1>
                    <p className="mt-1 text-sm text-zinc-500">{dateLabel}</p>
                </div>
                <span className="inline-flex w-fit rounded-full bg-green-50 px-3 py-1.5 text-sm font-semibold text-green-700">
                    Confirmed
                </span>
            </div>

            <div className="mt-6 grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
                <div className="min-w-0 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6">
                    <h2 className="text-lg font-bold text-zinc-950">
                        Items ({order.items.reduce((count, item) => count + item.quantity, 0)})
                    </h2>
                    <ul className="mt-5 divide-y divide-zinc-100">
                        {order.items.map((item) => (
                            <li key={item.id} className="flex min-w-0 items-center gap-3 py-4 first:pt-0 last:pb-0">
                                <Link
                                    to={`/products/${item.id}`}
                                    aria-label={`View ${item.title}`}
                                    className="flex size-16 shrink-0 items-center justify-center rounded-xl bg-zinc-50 p-2"
                                >
                                    {item.thumbnail || item.image ? (
                                        <img
                                            src={item.thumbnail || item.image}
                                            alt=""
                                            className="h-full w-full object-contain"
                                        />
                                    ) : (
                                        <ShoppingBag size={20} className="text-zinc-400" />
                                    )}
                                </Link>
                                <div className="min-w-0 flex-1">
                                    <Link
                                        to={`/products/${item.id}`}
                                        className="line-clamp-2 text-sm font-semibold leading-5 text-zinc-900 hover:text-orange-700"
                                    >
                                        {item.title}
                                    </Link>
                                    <p className="mt-1 text-xs text-zinc-500">
                                        Quantity {item.quantity} · {currency.format(item.price)} each
                                    </p>
                                </div>
                                <p className="shrink-0 text-sm font-bold text-zinc-950">
                                    {currency.format(item.price * item.quantity)}
                                </p>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-6 border-t border-zinc-200 pt-5">
                        <h2 className="text-base font-bold text-zinc-950">Delivery address</h2>
                        <address className="mt-2 text-sm not-italic leading-6 text-zinc-600">
                            {order.shipping?.firstName} {order.shipping?.lastName}
                            <br />
                            {order.shipping?.address}
                            <br />
                            {[order.shipping?.city, order.shipping?.state, order.shipping?.zip]
                                .filter(Boolean)
                                .join(", ")}
                        </address>
                    </div>
                </div>

                <aside className="h-fit rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 lg:sticky lg:top-24">
                    <h2 className="text-lg font-bold text-zinc-950">Payment summary</h2>
                    <dl className="mt-5 space-y-3 text-sm">
                        <div className="flex justify-between gap-3 text-zinc-600">
                            <dt>Subtotal</dt>
                            <dd>{currency.format(order.subtotal)}</dd>
                        </div>
                        <div className="flex justify-between gap-3 text-zinc-600">
                            <dt>Shipping</dt>
                            <dd>{order.shippingCost === 0 ? "Free" : currency.format(order.shippingCost)}</dd>
                        </div>
                        <div className="flex justify-between gap-3 text-zinc-600">
                            <dt>Estimated tax</dt>
                            <dd>{currency.format(order.tax)}</dd>
                        </div>
                        <div className="flex justify-between gap-3 border-t border-zinc-200 pt-4 text-base font-bold text-zinc-950">
                            <dt>Total</dt>
                            <dd>{currency.format(order.total)}</dd>
                        </div>
                    </dl>
                    <Link
                        to="/products"
                        className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 px-4 text-sm font-semibold text-zinc-700 transition-colors hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
                    >
                        <ShoppingBag size={16} />
                        Continue shopping
                    </Link>
                </aside>
            </div>
        </section>
    );
}

export default OrderSummary;
