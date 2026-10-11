import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { useAuth } from "@/context/useAuth";

function Register() {
    const { register, loading } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    async function handleSubmit(event) {
        event.preventDefault();
        setError("");

        const formData = new FormData(event.currentTarget);
        const password = formData.get("password");

        if (password !== formData.get("confirmPassword")) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await register({
                firstName: formData.get("firstName"),
                lastName: formData.get("lastName"),
                email: formData.get("email"),
                password,
            });
            navigate("/");
        } catch (err) {
            setError(err.message || "Registration failed. Please try again.");
        }
    }

    return (
        <section className="mx-auto w-full max-w-lg px-4 py-10 sm:px-6 sm:py-14">
            <div className="rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-8">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
                    Join Shoppy
                </p>
                <h1 className="mt-2 text-3xl font-black tracking-tight text-zinc-950">
                    Create an account
                </h1>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                    Create a local demo account to try the sign-in experience.
                </p>

                {error && (
                    <p
                        className="mt-5 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                        role="alert"
                    >
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2">
                        <div>
                            <label htmlFor="register-first-name" className="text-sm font-semibold text-zinc-800">
                                First name
                            </label>
                            <input
                                id="register-first-name"
                                name="firstName"
                                autoComplete="given-name"
                                required
                                maxLength={60}
                                className="mt-2 h-12 w-full rounded-xl border border-zinc-200 px-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                            />
                        </div>
                        <div>
                            <label htmlFor="register-last-name" className="text-sm font-semibold text-zinc-800">
                                Last name
                            </label>
                            <input
                                id="register-last-name"
                                name="lastName"
                                autoComplete="family-name"
                                required
                                maxLength={60}
                                className="mt-2 h-12 w-full rounded-xl border border-zinc-200 px-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="register-email" className="text-sm font-semibold text-zinc-800">
                            Email address
                        </label>
                        <input
                            id="register-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            maxLength={254}
                            className="mt-2 h-12 w-full rounded-xl border border-zinc-200 px-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                        />
                    </div>
                    <div>
                        <label htmlFor="register-password" className="text-sm font-semibold text-zinc-800">
                            Password
                        </label>
                        <input
                            id="register-password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            minLength={8}
                            maxLength={128}
                            className="mt-2 h-12 w-full rounded-xl border border-zinc-200 px-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                        />
                        <p className="mt-1.5 text-xs text-zinc-500">
                            Use at least 8 characters.
                        </p>
                    </div>
                    <div>
                        <label htmlFor="register-confirm-password" className="text-sm font-semibold text-zinc-800">
                            Confirm password
                        </label>
                        <input
                            id="register-confirm-password"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            required
                            minLength={8}
                            maxLength={128}
                            className="mt-2 h-12 w-full rounded-xl border border-zinc-200 px-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-brand-600 px-4 text-sm font-semibold text-white transition-colors hover:bg-brand-700 disabled:cursor-wait disabled:opacity-60"
                    >
                        {loading ? "Creating account…" : "Create Account"}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-zinc-600">
                    Already have an account?{" "}
                    <Link to="/login" className="font-semibold text-brand-700 hover:text-brand-800">
                        Sign in
                    </Link>
                </p>

            </div>
        </section>
    );
}

export default Register;
