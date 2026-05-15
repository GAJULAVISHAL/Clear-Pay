"use client"
import Link from "next/link"

export default function Home() {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden text-[#1b1b1f]"
      style={{
        background:
          "radial-gradient(1200px circle at 10% -10%, rgba(255,193,117,0.35), transparent 60%), radial-gradient(900px circle at 90% 10%, rgba(126,214,255,0.35), transparent 55%), linear-gradient(135deg, #f8f4ef, #efe7dd)",
      }}
    >
      <div aria-hidden className="absolute inset-0">
        <div
          className="absolute -left-24 top-24 h-64 w-64 rounded-full bg-[rgba(255,193,117,0.35)] blur-3xl"
          style={{ animation: "float 12s ease-in-out infinite" }}
        />
        <div
          className="absolute -right-20 top-12 h-72 w-72 rounded-full bg-[rgba(126,214,255,0.35)] blur-3xl"
          style={{ animation: "float 14s ease-in-out infinite 1s" }}
        />
        <div
          className="absolute -bottom-30 left-1/2 h-80 w-152 -translate-x-1/2 rounded-[42%] border border-[rgba(27,27,31,0.12)] bg-[rgba(255,255,255,0.75)] shadow-[0_40px_120px_-60px_rgba(0,0,0,0.35)]"
          style={{ animation: "drift 18s ease-in-out infinite" }}
        />
      </div>

      <main className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col gap-16 px-6 py-10 lg:px-10">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ff6f3d] text-sm font-semibold text-white">
              Pay
            </div>
            <div className="leading-tight">
              <p className="text-sm uppercase tracking-[0.2em] text-[#4a4a53]">ClearPay</p>
              <p className="text-base font-semibold">Payments you can feel</p>
            </div>
          </div>
          <nav className="hidden items-center gap-3 text-sm font-medium sm:flex">
            <Link
              href="/auth/login"
              className="rounded-full border border-[rgba(27,27,31,0.12)] px-4 py-2 text-[#1b1b1f] transition hover:-translate-y-0.5 hover:bg-white/70"
            >
              Sign in
            </Link>
            <Link
              href="/auth/signup"
              className="rounded-full bg-[#ff6f3d] px-4 py-2 text-white shadow-[0_16px_40px_-20px_rgba(255,111,61,0.9)] transition hover:-translate-y-0.5"
            >
              Sign up
            </Link>
          </nav>
        </header>

        <section className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <span
              className="inline-flex items-center gap-2 rounded-full border border-[rgba(27,27,31,0.12)] bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#4a4a53]"
              style={{ animation: "fade-up 700ms ease-out both" }}
            >
              Payment app for modern teams
            </span>
            <h1
              className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
              style={{ animation: "fade-up 700ms ease-out 80ms both" }}
            >
              Move money with calm, confident speed.
            </h1>
            <p
              className="text-base text-[#4a4a53] sm:text-lg"
              style={{ animation: "fade-up 700ms ease-out 160ms both" }}
            >
              ClearPay is a payment app that keeps balances clear, receipts organized, and
              every transfer verified in seconds. Share links, request payouts, and settle
              invoices without the friction.
            </p>
            <div
              className="flex flex-wrap items-center gap-4"
              style={{ animation: "fade-up 700ms ease-out 240ms both" }}
            >
              <Link
                href="/auth/signup"
                className="rounded-full bg-[#ff6f3d] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_-22px_rgba(255,111,61,0.95)] transition hover:-translate-y-0.5"
              >
                Create your account
              </Link>
              <Link
                href="/auth/login"
                className="rounded-full border border-[rgba(27,27,31,0.12)] px-6 py-3 text-sm font-semibold text-[#1b1b1f] transition hover:-translate-y-0.5 hover:bg-white/70"
              >
                Sign in
              </Link>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-[#4a4a53]">
              <div>
                <p className="text-lg font-semibold text-[#1b1b1f]">10k+</p>
                <p>Monthly payouts</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-[#1b1b1f]">120+</p>
                <p>Supported countries</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-[#1b1b1f]">99.99%</p>
                <p>Transfer uptime</p>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            {[
              {
                title: "Instant settlement",
                copy: "Confirm receipts and clear payouts in one tap with automatic reconciliation.",
              },
              {
                title: "Smart safeguards",
                copy: "Adaptive fraud checks and biometric approvals keep every payment verified.",
              },
              {
                title: "Unified cash view",
                copy: "Track balances, cards, and recurring invoices from one calm dashboard.",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="rounded-3xl border border-[rgba(27,27,31,0.12)] bg-[rgba(255,255,255,0.75)] p-6 shadow-[0_24px_70px_-55px_rgba(15,23,42,0.5)]"
                style={{ animation: `fade-up 700ms ease-out ${index * 80 + 140}ms both` }}
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-[#4a4a53]">{item.copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-6 rounded-[32] border border-[rgba(27,27,31,0.12)] bg-white/70 p-8 text-sm text-[#4a4a53] shadow-[0_40px_100px_-70px_rgba(0,0,0,0.3)]">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-base font-semibold text-[#1b1b1f]">
              Ready to launch faster payments for your business?
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/auth/signup"
                className="rounded-full bg-[#ff6f3d] px-5 py-2 text-xs font-semibold uppercase  tracking-wide text-white"
              >
                Start free
              </Link>
              <Link
                href="/auth/login"
                className="rounded-full border border-[rgba(27,27,31,0.12)] px-5 py-2 text-xs font-semibold uppercase tracking-wide text-[#1b1b1f]"
              >
                Sign in
              </Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="font-semibold text-[#1b1b1f]">2 minute setup</p>
              <p>Connect a bank, invite your team, and start accepting payments.</p>
            </div>
            <div>
              <p className="font-semibold text-[#1b1b1f]">Transparent fees</p>
              <p>Flat pricing with no hidden gateway costs or reconciliation fees.</p>
            </div>
            <div>
              <p className="font-semibold text-[#1b1b1f]">Real-time alerts</p>
              <p>Instant push notifications on payouts, chargebacks, and approvals.</p>
            </div>
          </div>
        </section>
      </main>

      <style jsx>{`
        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(18px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-14px);
          }
        }

        @keyframes drift {
          0%,
          100% {
            transform: translate(-50%, 0) rotate(0deg);
          }
          50% {
            transform: translate(-48%, -12px) rotate(1.5deg);
          }
        }
      `}</style>
    </div>
  )
}