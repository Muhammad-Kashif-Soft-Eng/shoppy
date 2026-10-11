import { Link } from "react-router";
import { ShoppingBag } from "lucide-react";

const linkClassName =
    "flex min-h-10 max-w-full items-center rounded-md py-2 text-sm leading-5 text-zinc-600 transition-colors hover:text-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600";

function Footer() {
    return (
        <footer className="mt-auto w-full min-w-0 border-t border-zinc-200 bg-white">
            <div className="mx-auto w-full min-w-0 max-w-7xl px-3 py-8 sm:px-6 sm:py-10 lg:px-8">
                <div className="grid min-w-0 grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">

                    {/* Brand */}
                    <div className="min-w-0 sm:col-span-2 lg:col-span-1">
                        <Link
                            to="/"
                            aria-label="Shoppy home"
                            className="inline-flex max-w-full items-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-600"
                        >
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-orange-600 text-white">
                                <ShoppingBag size={19} />
                            </span>

                            <span className="text-xl font-black tracking-tight text-zinc-950 sm:text-2xl">
                                shoppy<span className="text-orange-600">.</span>
                            </span>
                        </Link>

                        <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-500 sm:mt-4">
                            Discover products and keep your shopping simple.
                        </p>
                    </div>

                    {/* Shopping links */}
                    <nav
                        aria-labelledby="footer-explore-heading"
                        className="min-w-0"
                    >
                        <h2
                            id="footer-explore-heading"
                            className="text-sm font-bold text-zinc-950"
                        >
                            Explore
                        </h2>

                        <ul className="mt-3 flex min-w-0 flex-col items-start gap-1 sm:mt-4">
                            <li className="min-w-0 max-w-full">
                                <Link className={linkClassName} to="/products">
                                    Shop All
                                </Link>
                            </li>
                            <li className="min-w-0 max-w-full">
                                <Link className={linkClassName} to="/categories">
                                    Categories
                                </Link>
                            </li>
                            <li className="min-w-0 max-w-full">
                                <Link className={linkClassName} to="/wishlist">
                                    Wishlist
                                </Link>
                            </li>
                            <li className="min-w-0 max-w-full">
                                <Link className={linkClassName} to="/cart">
                                    Cart
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    {/* Account and order links */}
                    <nav
                        aria-labelledby="footer-account-heading"
                        className="min-w-0"
                    >
                        <h2
                            id="footer-account-heading"
                            className="text-sm font-bold leading-5 text-zinc-950"
                        >
                            Account &amp; Orders
                        </h2>

                        <ul className="mt-3 flex min-w-0 flex-col items-start gap-1 sm:mt-4">
                            <li className="min-w-0 max-w-full">
                                <Link className={linkClassName} to="/login">
                                    Login
                                </Link>
                            </li>
                            <li className="min-w-0 max-w-full">
                                <Link className={linkClassName} to="/register">
                                    Register
                                </Link>
                            </li>
                            <li className="min-w-0 max-w-full">
                                <Link className={linkClassName} to="/orders">
                                    Order History
                                </Link>
                            </li>
                            <li className="min-w-0 max-w-full">
                                <Link className={linkClassName} to="/order-summary">
                                    Order Summary
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>

                {/* Copyright */}
                <div className="mt-8 min-w-0 border-t border-zinc-200 pt-4 sm:mt-10 sm:pt-5">
                    <p className="text-xs leading-5 text-zinc-500">
                        © {new Date().getFullYear()} Shoppy. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;