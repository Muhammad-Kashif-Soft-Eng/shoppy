import { Link } from "react-router";
import { Home, ShoppingBag } from "lucide-react";

function NotFound() {
    return (
        <section className="flex min-h-[60vh] items-center justify-center px-4 py-16">
            <div className="w-full max-w-lg text-center">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange-700">
                    Page not found
                </p>
                <h1 className="mt-3 text-7xl font-black tracking-tight text-zinc-950 sm:text-8xl">
                    404
                </h1>

                <p className="mt-4 text-base leading-7 text-zinc-600">
                    We couldn’t find the page you were looking for. It may have moved or the address may be incorrect.
                </p>
                <div className="mt-7 flex flex-col justify-center gap-3 min-[380px]:flex-row">
                    <Link
                        to="/"
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                    >
                        <Home size={16} />
                        Go home
                    </Link>
                    <Link
                        to="/products"
                        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                    >
                        <ShoppingBag size={16} />
                        Browse products
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default NotFound;