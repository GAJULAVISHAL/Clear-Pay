import "dotenv/config";
import express from "express";
import { hdfcInputSchema } from "./zod/schema";
import { prisma } from "@repo/db";

const app = express();
app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
    const { userIdentifier, amount, token } = req.body;
    if (!userIdentifier || !amount || !token) {
        return res.status(400).json({ message: "Invalid request body" });
    }
    const parseResult = hdfcInputSchema.safeParse({ userIdentifier, amount, token });
    if (!parseResult.success) {
        return res.status(400).json({ message: "Invalid request body" });
    }

    const PendingTransaction = await prisma.onRampTransaction.findFirst({
        where:{
            token,
        }
    })

    if(PendingTransaction?.status === "Success"){
        return res.status(400).json({ message: "Transaction already processed" });
    }


    try {
        await prisma.$transaction([
            prisma.balance.updateMany({
                where: {
                    userId: userIdentifier
                },
                data: {
                    amount: {
                        // You can also get this from your DB
                        increment: amount
                    }
                }
            }),
            prisma.onRampTransaction.updateMany({
                where: {
                    token: token
                },
                data: {
                    status: "Success",
                }
            })
        ]);

        res.json({
            message: "Captured"
        })
    } catch (e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }

})

const port = process.env.PORT ? Number(process.env.PORT) : 3004;
app.listen(port, () => {
    console.log(`bank-webhook listening on ${port}`);
});