"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupInput } from "@/libs/authSchemas";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";

export default function SignupPage() {
  const router = useRouter();
  const promise = () =>
    new Promise((resolve) =>
      setTimeout(() => resolve({ name: "Sonner" }), 50000)
    );
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: SignupInput) => {
    const signupPromise = axios.post(
      "http://127.0.0.1:8000/api/auth/signup",
      data
    );
    toast.promise(signupPromise, {
      loading: "در حال ثبت نام...",
      success: "ثبت نام با موفقیت انجام شد",
      error: "خطا در ثبت نام",
    });
    try {
      await signupPromise;
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (err: any) {
      console.error(err.response?.data);
    }
  };
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/images/login.png')" }}
    >
      <Toaster richColors position="top-center" expand={false} />
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full space-y-6 text-right" dir="rtl">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-semibold text-gray-800 flex justify-center gap-2">
              زیبایی به سبک
              <img src="/icons/logo.svg" alt="" />
            </h1>
            <p className="text-gray-500 text-sm">
              متنوع‌ ترین کالکشن خانه و آشپزخانه و دکوراسیون
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-medium">ورود | ثبت نام</span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 ">
                  نام
                </label>
                <input
                  type="text"
                  {...register("firstname")}
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm border p-1 focus:ring focus:ring-indigo-200 text-gray-600"
                />
                {errors.firstname && (
                  <p className="text-primary text-xs font-semibold pr-2 pt-1">
                    {errors.firstname.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 ">
                  نام خانوادگی
                </label>
                <input
                  type="text"
                  {...register("lastname")}
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm border p-1 focus:ring focus:ring-indigo-200 text-gray-600"
                />
                {errors.lastname && (
                  <p className="text-primary text-xs font-semibold pr-2 pt-1">
                    {errors.lastname.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 ">
                  نام کاربری
                </label>
                <input
                  type="text"
                  {...register("username")}
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm border p-1 focus:ring focus:ring-indigo-200 text-gray-600"
                />
                {errors.username && (
                  <p className="text-primary text-xs font-semibold pr-2 pt-1">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  رمز عبور
                </label>
                <input
                  type="password"
                  {...register("password")}
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm border p-1 focus:ring focus:ring-indigo-200 text-gray-600"
                />
                {errors.password && (
                  <p className="text-primary text-xs font-semibold pr-2 pt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  تلفن همراه
                </label>
                <input
                  type="text"
                  {...register("phoneNumber")}
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm border p-1 focus:ring focus:ring-indigo-200 text-gray-600"
                />
                {errors.phoneNumber && (
                  <p className="text-primary text-xs font-semibold pr-2 pt-1">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  آدرس
                </label>
                <input
                  type="text"
                  {...register("address")}
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm border p-1 focus:ring focus:ring-indigo-200 text-gray-600"
                />
                {errors.address && (
                  <p className="text-primary text-xs font-semibold pr-2 pt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={!isValid}
                className={`w-full bg-gray-300 text-gray-500 font-semibold py-2 rounded-lg ${
                  isValid
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                تایید
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-2">
              با ورود به{" "}
              <span className="text-primary font-semibold">زیهوم</span>، شما
              <a href="#" className="text-primary hover:underline mx-1">
                شرایط استفاده
              </a>
              و
              <a href="#" className="text-primary hover:underline mx-1">
                قوانین حریم خصوصی
              </a>
              ما را می‌پذیرید.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
