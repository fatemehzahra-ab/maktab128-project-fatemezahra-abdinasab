"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function PaymentCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();

  const [state, setState] = useState<{
    loading: boolean;
    ok: boolean;
    data?: { trackId: string };
  }>({ loading: true, ok: false });

  useEffect(() => {
    const processPayment = async () => {
      const success = params.get("success");
      const status = params.get("status");
      const trackId = params.get("trackId") || "";
      const orderId = params.get("orderId");

      if (!success || !status || !orderId) {
        setState({ loading: false, ok: false });
        return;
      }

      if (success === "1" && status === "2") {
        try {
          const res = await fetch(`/order/${orderId}/confirm-payment`, {
            method: "POST",
          });
          if (!res.ok) throw new Error("Failed to confirm order");
          await res.json();
          setState({ loading: false, ok: true, data: { trackId } });
        } catch (err) {
          console.error(err);
          setState({ loading: false, ok: false });
        }
      } else {
        setState({ loading: false, ok: false });
      }
    };

    processPayment();
  }, [params]);

  if (state.loading) return <div className="p-10">در حال بررسی پرداخت...</div>;

  return (
    <div className="max-w-full mx-auto flex flex-col justify-center items-center gap-2 p-10 mt-40 bg-white ">
      {state.ok ? (
        <>
          <Image
            src={"/icons/success.svg"}
            alt={""}
            width={40}
            height={40}
            className="text-center"
          />
          <h1 className="text-2xl font-semibold text-success-600 mb-4">
            پرداخت شما با موفقیت انجام شد.
          </h1>
          <p className="text-sm text-gray-700 mb-2">
            از اعتماد شما سپاسگذاریم.
          </p>
          <p className="text-sm text-gray-700 mb-2">
            شناسه رهگیری: {state.data?.trackId}
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-4 py-2 rounded-lg bg-success-600 text-white"
          >
            بازگشت به فروشگاه
          </button>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            پرداخت ناموفق ❌
          </h1>
          <p className="text-sm text-gray-700 mb-2">
            اگر مبلغی کسر شده باشد طی حداکثر ۷۲ ساعت به حساب شما بازمی گردد.
          </p>
          <button
            onClick={() => router.push("/cart")}
            className="px-4 py-2 rounded-lg bg-red-600 text-white"
          >
            بازگشت به سبد خرید
          </button>
        </>
      )}
    </div>
  );
}
