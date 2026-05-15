"use client"
import { Card } from "@repo/ui/card"
import { TextInput } from "@repo/ui/input"
import { useState } from "react"
import { p2pTransfer } from "../../lib/Actions/p2pTransfers"

export const SendCard = () => {
    const [amount, setAmout] = useState("")
    const [recipient, setRecipient] = useState("")
    return (
        <Card title="Send Money" className="border-2 border-gray-300 mt-4 rounded-xl">
            <div className="flex flex-col gap-4">
                <TextInput label="Amount" placeholder="Amount" onChange={value => setAmout(value)} />
                <TextInput label="Recipient Number" placeholder="Recipient Number" onChange={value => setRecipient(value)} />
                <button className="p-2 bg-[#ff6f3d] text-white rounded-2xl" onClick={async() => {
                    await p2pTransfer({
                        to : recipient,
                        amount : Number(amount) * 100
                    })
                    console.log("Sending", amount, "to", recipient)
                }  }>
                    Send
                </button>
            </div>
        </Card>
    )
}