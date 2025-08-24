import { z } from "zod";

export const addProductSchema = z.object({
  category: z.string(),
  subcategory: z.string(),
  name: z.string().min(5, "نام  بیشتر از ۵ حرف باشد"),
  price: z.number(),
  quantity: z.number(),
  brand: z.string().min(3, "برند باید بیشتر از ۳ حرف باشد"),
  description: z.string().min(10, "توضیحات باید بیشتر از ۱۰ حرف باشد"),
  thumbnail: z.file(),
});

export type ProductInput = z.infer<typeof addProductSchema>;
