import * as z from "zod";
export const hdfcInputSchema = z.object({
    userIdentifier : z.string(),
    amount : z.number(),
    token : z.string(),
})