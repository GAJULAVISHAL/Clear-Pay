"use client"

import { TextInput } from "@repo/ui/input" 
import { Card } from "@repo/ui/card"
import { Center } from "@repo/ui/center"
import { Select } from "@repo/ui/select"
import { useState } from "react"
import { OnRampTransaction } from "../../lib/Actions/onRampTransaction"

const BankOptions = [{
    name : "HDFC",
    redirectUrl: "https://www.hdfcbank.com/"   
},{
    name : "ICICI",
    redirectUrl: "https://www.icicibank.com/"
}]
export const AddMoney = ()=>{
    const [redirectUrl, setRedirectUrl] = useState(BankOptions[0]?.redirectUrl || "")
    const [amount, setAmount] = useState("")
    const [provider, setProvider] = useState(BankOptions[0]?.name || "")

    return(
       <Card className="border-2 border-gray-300 mt-4 rounded-xl w-full" title="Add Money">
        <div className="flex  flex-col gap-4 items-start ">
            <TextInput  label="Amount" placeholder="Enter amount to add" onChange={(value) => setAmount(value)} />
            <h2>Bank</h2>
            <Select 
                options={BankOptions.map(x=>({
                    key : x.name,
                    value : x.name
                }))} 
                onSelect={value => {
                    setProvider(BankOptions.find(x => x.name === value)?.name || "")
                    setRedirectUrl(BankOptions.find(x => x.name === value)?.redirectUrl || "")
                }}
            >

            </Select>
            <button className="p-2 bg-[#ff6f3d] text-white rounded-2xl" 
            onClick={async (e)=>{
                e.preventDefault()
                await OnRampTransaction({ amount: Number(amount)*100, provider })
                window.location.href = redirectUrl || ""
            }}
            >
                Add Money
            </button>
        </div>
       </Card>

    )
}