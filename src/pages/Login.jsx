import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "@/context/useAuth";

function Login() {
    const { login, loading } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");

        const formData = new FormData(event.currentTarget);

        try {
            await login(
                formData.get("email"),
                formData.get("password"),
            );
            navigate("/");
        } catch (err) {
            setError(err.message || "Sign in failed. Please try again.");
        }
    }

    return (
        <section className="mx-auto w-full max-w-lg px-4 py-10 sm:px-6 sm:py-14">
            <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
                    Welcome back
                </p>
                <h1 className="mt-2 text-3xl font-black tracking-tight text-zinc-950">
                    Sign in to Shoppy
                </h1>
                {error && (
                    <p
                        className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                        role="alert"
                    >
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div>
                        <label htmlFor="login-email" className="text-sm font-semibold text-zinc-800">
                            Email address
                        </label>
                        <input
                            id="login-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="mt-2 h-12 w-full rounded-xl border border-zinc-200 px-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                        />
                    </div>
                    <div>
                        <label htmlFor="login-password" className="text-sm font-semibold text-zinc-800">
                            Password
                        </label>
                        <input
                            id="login-password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            maxLength={128}
                            className="mt-2 h-12 w-full rounded-xl border border-zinc-200 px-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-brand-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-wait disabled:opacity-60"
                    >
                        {loading ? "Signing in…" : "Sign In"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-zinc-600">
                    New to Shoppy?{" "}
                    <Link to="/register" className="font-semibold text-brand-700 hover:text-brand-800">
                        Create an account
                    </Link>
                </p>

            </div>
        </section>
    );
}

export default Login;
