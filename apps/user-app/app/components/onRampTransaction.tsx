import { Card } from "@repo/ui/card"

export const OnRampTransaction = ({ transactions }: {
    transactions: {
        id: number,
        time: Date,
        amount: number,
        status: string,
        provider: string
    }[]
}) => {
    if (!transactions.length) {
        return (
            <Card title="Recent Transactions" className="w-full">
                <h2 className="text-center text-slate-500">No transactions yet.</h2>
            </Card>
        )
    }
    return (
        <Card title="Recent Transactions" className="w-full flex flex-col">
            <div className="pt-2 max-h-[40vh] overflow-y-auto mb-4 pr-2">
                {transactions.map(t => <div key={t.id} className="flex justify-between mb-2">
                    <div>
                        <div className="text-sm">
                            Received INR
                        </div>
                        <div className="text-slate-600 text-xs">
                            {t.time.toDateString()}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        + Rs {t.amount / 100}
                    </div>

                </div>)}
            </div>
        </Card>
    )
}