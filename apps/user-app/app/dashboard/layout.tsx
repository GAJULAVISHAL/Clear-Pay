import { headers } from "next/headers"
import { auth } from "../../lib/auth"
import { redirect } from "next/navigation"
import Logout from "../components/logout"
import { SideBarItem } from "../components/sideBarItem"
import { DashboardIcon, TransactionsIcon, TransferIcon } from "../components/icons"

export default async function DashBoardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (!session) {
    redirect("/auth/login")
  }

  return (
    <div className="flex h-screen w-full flex-col">
      <nav className="mx-4 flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#ff6f3d] text-sm font-semibold text-white">
            Pay
          </div>
          <div className="leading-tight">
            <p className="text-sm uppercase tracking-[0.2em] text-[#4a4a53]">ClearPay</p>
            <p className="text-base font-semibold">Payments you can feel</p>
          </div>
        </div>
        <Logout />
      </nav>
      <div className="flex flex-1 gap-4 px-8 pb-2 pt-2 min-h-0">
        <div className="flex h-full flex-col border-r-2 border-gray-300 pr-4">

          <h1 className="text-2xl mb-2 font-semibold text-[#1b1b1f]">Welcome back, {session.user.name}!</h1>
          <SideBarItem Icon={<DashboardIcon />} Title="Dashboard" href="/dashboard/dashboard" />
          <SideBarItem Icon={<TransactionsIcon />} Title="Transactions" href="/dashboard/transactions" />
          <SideBarItem Icon={<TransferIcon />} Title="Transfer" href="/dashboard/transfer" />
          <SideBarItem Icon={<TransferIcon />} Title="P2P Transfer" href="/dashboard/p2p" />
        </div>
        <div className="flex-1 min-h-0 overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
}