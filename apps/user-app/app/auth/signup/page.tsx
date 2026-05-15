"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"
import { authClient } from "../../../lib/auth-client"

type Status = {
    type: "idle" | "loading" | "success" | "error"
    message?: string
}

const SignUpPage = () => {
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [password, setPassword] = useState("")
    const [status, setStatus] = useState<Status>({ type: "idle" })

    const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setStatus({ type: "loading" })

        const { data, error } = await (authClient.signUp.email as any)({
            name,
            email,
            password,
            phoneNumber: phoneNumber.trim() || undefined,
            callbackURL: "/dashboard/dashboard",
        })

        if (data) {
            setStatus({ type: "success", message: "Account created. Welcome aboard." })
            router.replace("/dashboard/dashboard")
        } else if (error) {
            setStatus({ type: "error", message: error.message ?? "Signup failed." })
        } else {
            setStatus({ type: "error", message: "Signup failed." })
        }
    }

    const HandleGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/dashboard/dashboard",
        })
    }

    return (
        <div
            className="w-full max-w-md rounded-3xl border border-[rgba(27,27,31,0.12)] bg-white/75 p-6 shadow-[0_32px_90px_-65px_rgba(15,23,42,0.6)]"
            style={{ animation: "fade-up 700ms ease-out both" }}
        >
            <div className="mb-4 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ff6f3d] text-sm font-semibold text-white">
                    Pay
                </div>
                <div className="leading-tight">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#4a4a53]">ClearPay</p>
                    <p className="text-sm font-semibold text-[#1b1b1f]">Payments you can feel</p>
                </div>
            </div>

            <div className="mb-3 space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-[#4a4a53]">Get started</p>
                <h1 className="text-3xl font-semibold text-[#1b1b1f]">
                    Create your ClearPay account
                </h1>
                <p className="text-sm text-[#4a4a53]">Settle invoices and payouts in minutes.</p>
            </div>

            <form className="space-y-3" onSubmit={handleSignUp}>
                <div className="space-y-2">
                    <label className="text-sm text-[#4a4a53]" htmlFor="name">
                        Full name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="w-full rounded-2xl border border-[rgba(27,27,31,0.15)] bg-white/80 px-4 py-3 text-sm text-[#1b1b1f] outline-none transition placeholder:text-[#8a8a96] focus:border-[#ff6f3d]"
                        placeholder="Your name"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-[#4a4a53]" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="w-full rounded-2xl border border-[rgba(27,27,31,0.15)] bg-white/80 px-4 py-3 text-sm text-[#1b1b1f] outline-none transition placeholder:text-[#8a8a96] focus:border-[#ff6f3d]"
                        placeholder="you@company.com"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-[#4a4a53]" htmlFor="phoneNumber">
                        Phone number
                    </label>
                    <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        autoComplete="tel"
                        value={phoneNumber}
                        onChange={(event) => setPhoneNumber(event.target.value)}
                        className="w-full rounded-2xl border border-[rgba(27,27,31,0.15)] bg-white/80 px-4 py-3 text-sm text-[#1b1b1f] outline-none transition placeholder:text-[#8a8a96] focus:border-[#ff6f3d]"
                        placeholder="+1234567890"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-[#4a4a53]" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="w-full rounded-2xl border border-[rgba(27,27,31,0.15)] bg-white/80 px-4 py-3 text-sm text-[#1b1b1f] outline-none transition placeholder:text-[#8a8a96] focus:border-[#ff6f3d]"
                        placeholder="Create a password"
                    />
                </div>

                {status.type === "error" && (
                    <p className="rounded-2xl border border-red-200/80 bg-red-50 px-3 py-2 text-sm text-red-700">
                        {status.message}
                    </p>
                )}
                {status.type === "success" && (
                    <p className="rounded-2xl border border-emerald-200/80 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
                        {status.message}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={status.type === "loading"}
                    className="w-full rounded-full bg-[#ff6f3d] px-4 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_-24px_rgba(255,111,61,0.9)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {status.type === "loading" ? "Creating account..." : "Create account"}
                </button>
            </form>

            <div className="mt-4 space-y-3">
                <p className="text-center text-sm text-[#8a8a96]">Or continue with</p>
                <button
                    className="w-full rounded-full border border-[rgba(27,27,31,0.12)] bg-white/80 px-4 py-2 text-sm font-semibold text-[#1b1b1f] transition hover:-translate-y-0.5 hover:bg-white"
                    onClick={HandleGoogleSignIn}
                >
                    Google
                </button>
            </div>

            <div className="mt-4 text-center text-sm text-[#4a4a53]">
                <span>Already have an account? </span>
                <Link className="font-semibold text-[#ff6f3d] hover:text-[#ff916a]" href="/auth/login">
                    Sign in
                </Link>
            </div>
        </div>
    )
}

export default SignUpPage