"use client";

import Image from "next/image";
import { useCartStore } from "../../store/cartStore";
import { ShoppingCart, Trash2, Package } from "lucide-react";
import { getFullImageUrl } from "@/app/utils/url";

export default function CartPage() {
  const { items, updateQty, removeItem, clearCart } = useCartStore();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const discount = total * 0.2;
  const originalCount = total + discount;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-40 text-natural-900">
        <div className="bg-white border-b border-natural-50 px-6 py-4">
          <div className="flex items-center max-w-7xl mx-auto">
            <Image
              src="/icons/shopping.svg"
              alt="Cart"
              width={28}
              height={28}
            />
            <h1 className="text-lg font-medium">سبد خرید</h1>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mb-4">
            <Image
              src="/icons/shopping.svg"
              alt="Cart"
              width={50}
              height={50}
            />
          </div>
          <p className="mt-4 text-lg">سبد خرید شما خالی است</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-40 text-black" dir="rtl">
      <div className="bg-white border-b border-natural-50 px-6 py-4">
        <div className="flex items-center max-w-7xl mx-auto">
          <Image src="/icons/shopping.svg" alt="Cart" width={28} height={28} />
          <h1 className="text-lg font-medium">سبد خرید</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-natural-50 p-6">
              <div className="flex border-natural-50 border-b mb-6">
                <button className="px-4 py-2 text-primary border-b-2 border-primary font-medium">
                  خرید فعلی شما
                </button>
              </div>

              {items.map((item) => (
                <div key={item.id} className="flex gap-6">
                  <div className="flex justify-between w-full m-2 p-5 rounded-lg shadow border border-natural-50">
                    <div>
                      <h2 className="text-xl font-medium mb-4">{item.name}</h2>

                      <div className="w-80">
                        <Image
                          src={getFullImageUrl(item.thumbnail)}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="rounded"
                        />
                      </div>
                      <div className="p-2">
                        <div className="flex items-center gap-2 mb-6">
                          <Package className="w-4 h-4 text-green-600" />
                          <span className="text-sm text-green-600">
                            موجود در انبار
                          </span>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {item.price.toLocaleString("fa-IR")} تومان
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() =>
                          updateQty(item.id, Math.max(item.quantity - 1, 1))
                        }
                        className="px-2 py-1 border rounded hover:bg-muted"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQty(item.id, Math.min(item.quantity + 1, 3))
                        }
                        className="px-2 py-1 border rounded hover:bg-muted"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-4 hover:underline hover:text-primary"
                      >
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white rounded-lg border border-natural-50 p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-natural-600">قیمت محصولات</span>
                  <span className="font-medium">
                    {originalCount.toLocaleString("fa-IR")} تومان
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">تخفیف</span>
                  <span className="font-medium">
                    {discount.toLocaleString("fa-IR")} تومان
                  </span>
                </div>

                <div className="border-t border-natural-100 pt-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>جمع کل</span>
                    <span>{total.toLocaleString("fa-IR")} تومان</span>
                  </div>
                </div>

                <div className="flex justify-between text-success-600">
                  <span>سود شما</span>
                  <span>{discount.toLocaleString("fa-IR")} تومان</span>
                </div>
              </div>

              <button className="w-full bg-primary text-white py-3 px-4 rounded-lg mt-6 font-medium hover:bg-primary/90">
                تایید و ادامه خرید
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
