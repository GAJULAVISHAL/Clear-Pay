import { prisma } from "@repo/db"
import { betterAuth } from "better-auth"
import { phoneNumber } from "better-auth/plugins"
import { prismaAdapter } from "better-auth/adapters/prisma"

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
    },
    socialProviders:{
        google:{
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }
    },
    plugins: [phoneNumber()],
    secret: process.env.BETTER_AUTH_API_KEY,
    baseURL: process.env.BETTER_AUTH_URL
})