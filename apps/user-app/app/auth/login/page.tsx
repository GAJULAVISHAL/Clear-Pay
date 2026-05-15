"use client"

import Link from "next/link"
import { FormEvent, useState } from "react"
import { authClient } from "../../../lib/auth-client"
import { useRouter } from "next/navigation"


type Status = {
    type: "idle" | "loading" | "success" | "error"
    message?: string
}

const Login = () => {
    const [identifier, setIdentifier] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(true)
    const [status, setStatus] = useState<Status>({ type: "idle" })
    const router = useRouter()

    const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setStatus({ type: "loading" })

        const normalizedIdentifier = identifier.trim()
        const isEmail = normalizedIdentifier.includes("@")
        const { data, error } = isEmail
            ? await authClient.signIn.email({
                email: normalizedIdentifier,
                password,
                rememberMe,
                callbackURL: "/dashboard/dashboard",
            })
            : await (authClient.signIn as any).phoneNumber({
                phoneNumber: normalizedIdentifier,
                password,
                rememberMe,
            })

        if (data) {
            setStatus({ type: "success", message: "Logged in successfully." })
            if (!isEmail) {
                router.push("/dashboard/dashboard")
            }
        } else if (error) {
            setStatus({ type: "error", message: error.message ?? "Login failed." })
        } else {
            setStatus({ type: "error", message: "Login failed." })
        }
    }

    return (
        <div
            className="w-full max-w-md rounded-3xl border border-[rgba(27,27,31,0.12)] bg-white/75 p-8 shadow-[0_32px_90px_-65px_rgba(15,23,42,0.6)]"
            style={{ animation: "fade-up 700ms ease-out both" }}
        >
            <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ff6f3d] text-sm font-semibold text-white">
                    Pay
                </div>
                <div className="leading-tight">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#4a4a53]">ClearPay</p>
                    <p className="text-sm font-semibold text-[#1b1b1f]">Payments you can feel</p>
                </div>
            </div>

            <div className="mb-3 space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-[#4a4a53]">Welcome back</p>
                <h1 className="text-3xl font-semibold text-[#1b1b1f]">
                    Sign in to ClearPay
                </h1>
                <p className="text-sm text-[#4a4a53]">Access balances and recent activity in seconds.</p>
            </div>

                <form className="space-y-3" onSubmit={handleLogin}>
                    <div className="space-y-2">
                        <label className="text-sm text-[#4a4a53]" htmlFor="identifier">
                            Email or phone
                        </label>
                        <input
                            id="identifier"
                            name="identifier"
                            type="text"
                            autoComplete="username"
                            required
                            value={identifier}
                            onChange={(event) => setIdentifier(event.target.value)}
                            className="w-full rounded-2xl border border-[rgba(27,27,31,0.15)] bg-white/80 px-4 py-3 text-sm text-[#1b1b1f] outline-none transition placeholder:text-[#8a8a96] focus:border-[#ff6f3d]"
                            placeholder="you@company.com or +1234567890"
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
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="w-full rounded-2xl border border-[rgba(27,27,31,0.15)] bg-white/80 px-4 py-3 text-sm text-[#1b1b1f] outline-none transition placeholder:text-[#8a8a96] focus:border-[#ff6f3d]"
                            placeholder="Enter your password"
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-[#4a4a53]" htmlFor="rememberMe">
                            <input
                                id="rememberMe"
                                name="rememberMe"
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(event) => setRememberMe(event.target.checked)}
                                className="h-4 w-4 rounded border-[rgba(27,27,31,0.25)] bg-white text-[#ff6f3d]"
                            />
                            Remember me
                        </label>
                        <span className="text-[#8a8a96]">Secure device only</span>
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
                        {status.type === "loading" ? "Signing in..." : "Sign in"}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-[#4a4a53]">
                    <span>New here? </span>
                    <Link className="font-semibold text-[#ff6f3d] hover:text-[#ff916a]" href="/auth/signup">
                        Create an account
                    </Link>
                </div>
        </div>
    )
}

export default Login