import { headers } from "next/headers"
import { AddMoney } from "../../components/addMoney"
import { BalanceCard } from "../../components/balanceCard"
import { OnRampTransaction } from "../../components/onRampTransaction"
import { auth } from "../../../lib/auth"
import { prisma } from "@repo/db"

async function getBalance() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const Balance = await prisma.balance.findFirst({
        where:{
            userId: session?.user.id.toString()
        },
    });
    return{
        amount : Balance?.amount || 0,
        locked : Balance?.locked || 0
    }

}

async function getTransactions(){
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const transactions = await prisma.onRampTransaction.findMany({
        where:{
            userId: session?.user.id.toString()
        }
    })
    return transactions.map(t=>({
        id: t.id,
        time : t.startTime,
        amount : t.amount,
        status : t.status,
        provider : t.provider
    }))
}
export default async function TransferPage() {
    const balance = await getBalance();
    const transactions = await getTransactions();
    return (
        <div className="w-full ">
            <h1 className="text-2xl font-semibold text-[#1b1b1f]">Transfer</h1>
            <h2 className="text-gray-600 mt-2">Transfer money to other users.</h2>
            <div className="flex flex-col">
                <div className="flex gap-4 mt-4">
                    <AddMoney />
                    <BalanceCard amount={balance.amount} locked={balance.locked} />
                </div>
                <div className="mt-3 overflow-hidden">
                    <OnRampTransaction transactions={transactions} />
                </div>
            </div>
        </div>
    )
}