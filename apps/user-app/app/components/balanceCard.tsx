import { Card } from "@repo/ui/card"
export const BalanceCard = ({amount, locked}:{
    amount : number,
    locked : number
})=>{
    return(
        <Card title="Balance" className="w-full flex flex-col gap-4">
            <div className="flex justify-between items-center border-b gap-10 border-slate-300 pb-2">
                <h2>
                    Unlocked Balance
                </h2>
                <div>
                    {amount/100} INR
                </div>
            </div>
            <div className="flex justify-between items-center border-b gap-10 border-slate-300 pb-2">
                <div>Locked Balance</div>
                <div>{locked/100} INR</div>
            </div>
            <div className="flex justify-between items-center border-b gap-10 border-slate-300 pb-2">
                <div>Total Balance</div>
                <div>{(amount + locked)/100} INR</div>
            </div>
        </Card>
    )
}