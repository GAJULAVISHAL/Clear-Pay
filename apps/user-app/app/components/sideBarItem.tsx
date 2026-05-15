"use client"
import { usePathname, useRouter } from "next/navigation";


export const SideBarItem = ({ Icon, Title, href }: { Icon: React.ReactNode; Title: string; href: string }) => {
    const router = useRouter()
    const pathName = usePathname()
    const selected = pathName === href || (pathName?.startsWith(`${href}/`) ?? false)

    return (
        <div
            className={`flex items-center justify-center m-2 p-2 gap-2 ${selected ? "bg-[#ff6f3d] text-white" : "bg-[#f0f0f0] text-[#1b1b1f]"} font-bold rounded-2xl hover:bg-[#ff6f3d] hover:text-white cursor-pointer transition-colors`}
            onClick={() => router.push(href)}
        >
            <div>
                {Icon}
            </div>
            <div>
                {Title}
            </div>
        </div>
    )
}