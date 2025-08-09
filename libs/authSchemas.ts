import { z } from "zod";

export const signupSchema = z.object({
  firstname: z.string().min(3, "نام باید بیشتر از ۳ حرف باشد"),
  lastname: z.string().min(4, "نام خانوادگی باید بیشتر از ۴ حرف باشد"),
  username: z.string().min(6, "نام کاربری باید بیشتر از ۶ حرف باشد"),
  password: z
    .string()
    .min(8, { message: "نام کاربری باید بیشتر از ۸ حرف باشد" })
    .regex(/[A-Z]/, {
      message: "پسورد باید شامل حروف بزرگ باشد",
    })
    .regex(/[a-z]/, {
      message: "پسورد باید شامل حروف کوچک باشد",
    })
    .regex(/[@]/, { message: "پسورد باید شامل اشکال مختلف باشد" }),
  phoneNumber: z
    .string()
    .regex(/^(?:09|۰۹)[0-9۰-۹]{9}$/, "شماره تلفن همراه باید معتبر باشد"),
  address: z.string().min(6, "آدرس باید بیشتر از ۶ حرف باشد"),
});

export type SignupInput = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  username: z.string().min(6, "نام کاربری باید بیشتر از ۶ حرف باشد"),
  password: z
    .string()
    .min(8, { message: "نام کاربری باید بیشتر از ۸ حرف باشد" })
    .regex(/[A-Z]/, {
      message: "پسورد باید شامل حروف بزرگ باشد",
    })
    .regex(/[a-z]/, {
      message: "پسورد باید شامل حروف کوچک باشد",
    })
    .regex(/[@]/, { message: "پسورد باید شامل اشکال مختلف باشد" }),
});

export type LoginInput = z.infer<typeof loginSchema>;
