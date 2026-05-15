import { headers } from "next/headers"
import { auth } from "../../lib/auth"
import { redirect } from "next/navigation"
export default async function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

    const session = await auth.api.getSession({
        headers : await headers()
    })
    if(session) {
      redirect("/dashboard/dashboard")
    }

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

      <main className="relative z-10 flex min-h-screen w-full items-center justify-center px-6 py-12">
        {children}
      </main>

    </div>
  )
}