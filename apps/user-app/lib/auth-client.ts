import { createAuthClient } from "better-auth/react"
import { phoneNumberClient } from "better-auth/client/plugins"
export const authClient: ReturnType<typeof createAuthClient> = createAuthClient({
    /** The base URL of the server (optional if you're using the same domain) */
    baseURL: process.env.BETTER_AUTH_URL,
    plugins: [phoneNumberClient()],
})