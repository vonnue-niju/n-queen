import { z } from "zod";

export const inputFormSchema = z.object({
  rows: z
    .number()
    .min(1, "number of rows is required")
    .max(20, {
        message: "number of rows should be less than 20"
    }),
});
