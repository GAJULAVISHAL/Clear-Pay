"use server"
import { prisma } from "@repo/db"
import { auth } from "../auth"
import { headers } from "next/headers"
import { phoneNumber } from "better-auth/plugins"
export const p2pTransfer = async({to,amount}:{
    to : string,
    amount : number
})=>{
    const session = await auth.api.getSession({
        headers : await headers()
    })
    const userId = session?.user.id
    if(!userId){
        return{
            error : "Unauthorized"
        }
    }
    const recipient = await prisma.user.findUnique({
        where:{
            phoneNumber : to,
        }
    })
    if(!recipient){
        return{
            error : "Recipient not found"
        }
    }  

    await prisma.$transaction(async tx =>{
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${userId} FOR UPDATE`

        const senderBalance = await tx.balance.findFirst({
            where:{
                userId : userId
            }
        })
        if(!senderBalance){
            throw new Error("Sender balance not found")
        }
        if(senderBalance.amount < amount){
            throw new Error("Insufficient funds")
        }

        await tx.balance.update({
            where:{
                userId : userId
            },
            data:{
                amount :{decrement : amount}
            }
        })

        await tx.balance.update({
            where:{
                userId : recipient.id ,
                
            },
            data:{
                amount :{increment : amount}
            }
        })

        await tx.p2pTransfer.create({
            data:{
                fromUserId : userId,
                toUserId : recipient.id,
                amount,
                timestamp : new Date(),
            }
        })
    })
}