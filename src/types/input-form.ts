import { inputFormSchema } from "@/schema/input-form";
import { z } from "zod";

export type InputFormType = z.infer<typeof inputFormSchema>;
