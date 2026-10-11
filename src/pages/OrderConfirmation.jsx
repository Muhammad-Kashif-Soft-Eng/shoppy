import { Link, useLocation } from "react-router";
import { Check } from "lucide-react";

import { useOrders } from "@/context/useOrders";

function OrderConfirmation() {
    const { state } = useLocation();
    const { getOrder } = useOrders();
    const order = state?.orderId ? getOrder(state.orderId) : null;

    return (
        <section className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-16 text-center sm:px-6 sm:py-24">
            <span className="flex size-16 items-center justify-center rounded-full bg-green-100 text-green-700">
                <Check size={32} />
            </span>
            <h1 className="mt-6 text-3xl font-black tracking-tight text-zinc-950">
                {order ? "Your demo order is confirmed" : "Order confirmation"}
            </h1>
            {order ? (
                <>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">
                        Order <span className="font-semibold text-zinc-900">{order.id}</span> was saved in this browser.
                    </p>
                    <p className="mt-4 text-xl font-bold text-zinc-950">
                        Total: ${order.total.toFixed(2)}
                    </p>
                </>
            ) : (
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                    No recent order is available in this browser session.
                </p>
            )}
            <div className="mt-6 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
                {order && (
                    <Link
                        to={`/order-summary?orderId=${encodeURIComponent(order.id)}`}
                        className="inline-flex min-h-12 items-center justify-center rounded-xl bg-orange-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-orange-700"
                    >
                        View order summary
                    </Link>
                )}
                <Link
                    to="/orders"
                    className="inline-flex min-h-12 items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50"
                >
                    Order history
                </Link>
                <Link
                    to="/products"
                    className="inline-flex min-h-12 items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50"
                >
                    Continue shopping
                </Link>
            </div>
        </section>
    );
}

export default OrderConfirmation;
