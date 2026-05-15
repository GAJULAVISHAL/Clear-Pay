"use server"
import { headers } from "next/headers"
import { auth } from "../auth"
import { prisma } from "@repo/db"

enum OnRampStatus{
    Success = "Success",
    Failure = "Failure",
    Processing = "Processing"
}

export const OnRampTransaction = async({amount, provider}:{
    amount:number,
    provider:string,
})=>{
    const session = await auth.api.getSession({
        headers : await headers()
    })
    const userId = session?.user.id
    if(!userId){
        return {
            error : "Unauthorized"
        }
    }

    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); //this token originally comes from the provider, but since we are mocking it, we will generate a random token

    await prisma.onRampTransaction.create({
        data:{
            userId : userId.toString(),
            amount,
            provider,
            status : OnRampStatus.Processing,
            token,
            startTime: new Date()
        }
    })

    return {
        success : "Transaction initiated successfully"
    }
}
