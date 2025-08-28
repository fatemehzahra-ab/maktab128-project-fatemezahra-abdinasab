"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "../../store/cartStore";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { RadioGroup } from "@heroui/react";
import { ChevronRight, Edit2, Package, Truck, Clock } from "lucide-react";
import Image from "next/image";
import { getFullImageUrl } from "@/app/utils/url";
import Link from "next/link";

import { newDate, format } from "date-fns-jalali";

export function gregorianToPersian(
  gYear: number,
  gMonth: number,
  gDay: number
) {
  const date = new Date(gYear, gMonth - 1, gDay);

  return {
    year: parseInt(format(date, "yyyy")),
    month: parseInt(format(date, "M")),
    day: parseInt(format(date, "d")),
    monthName: format(date, "MMMM"),
    weekday: format(date, "EEEE"),
  };
}

function getNext7Days() {
  const today = new Date();
  const days = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const persian = gregorianToPersian(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
    );
    days.push({
      id: `day-${i}`,
      label: persian.weekday,
      date: persian.day
        .toString()
        .replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]),
      month: persian.monthName,
    });
  }
  return days;
}

export default function CheckoutPage() {
  const { items, updateQty, removeItem } = useCartStore();
  const [selectedDelivery, setSelectedDelivery] = useState("standard");
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [availableDays, setAvailableDays] = useState<any[]>([]);

  useEffect(() => {
    setAvailableDays(getNext7Days());
  }, []);

  const productTotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = selectedDelivery === "express" ? 75000 : 50000;
  const finalTotal = productTotal + shippingCost;
  const discount = productTotal * 0.2;
  const originalCount = productTotal + discount;

  const timeSlots = [
    { id: "9-12", label: "۹ تا ۱۲" },
    { id: "12-15", label: "۱۲ تا ۱۵" },
    { id: "15-18", label: "۱۵ تا ۱۸" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 mt-40 text-natural-900" dir="rtl">
      <div className="bg-white border-b border-natural-50 px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href={"/cart"}>
            <div className="flex items-center gap-2">
              <ChevronRight className="w-5 h-5" />
              <span className="text-sm text-gray-600">بازگشت به سبد خرید</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-4 gap-6 text-black">
        <div className="lg:col-span-3 space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">آدرس تحویل سفارش</h3>
              <Button variant="ghost" size="sm" className="text-blue-600">
                <Edit2 className="w-4 h-4 ml-1" />
                ویرایش
              </Button>
            </div>
            <div className="text-sm text-gray-600">
              <p className="font-medium">استان تهران، شهر تهران</p>
              <p>۲ بهروزی، خ سید دستگاه، کوچه فرانی پلاک ۱۰ واحد ۳</p>
              <p>کدپستی ۱۷۶۰۷۸۹۰</p>
              <p>شماره تماس ۰۹۱۲۳۴۵۶۷</p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">نحوه ارسال</h3>
            <RadioGroup
              value={selectedDelivery}
              onValueChange={setSelectedDelivery}
            >
              <div className="p-4 border border-natural-50 rounded-lg flex items-center gap-2">
                <input
                  type="radio"
                  id="standard"
                  name="delivery"
                  value="standard"
                  checked={selectedDelivery === "standard"}
                  onChange={() => setSelectedDelivery("standard")}
                />
                <label
                  htmlFor="standard"
                  className="flex-1 cursor-pointer flex items-center gap-2"
                >
                  <Package className="w-5 h-5 text-primary" />
                  ارسال عادی
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  ارسال با پست و تحویل ۳ تا ۵ روز کاری
                </p>
              </div>

              <div className="p-4 border border-natural-50 rounded-lg flex items-center gap-2">
                <input
                  type="radio"
                  id="express"
                  name="delivery"
                  value="express"
                  checked={selectedDelivery === "express"}
                  onChange={() => setSelectedDelivery("express")}
                />
                <label
                  htmlFor="express"
                  className="flex-1 cursor-pointer flex items-center gap-2"
                >
                  <Truck className="w-5 h-5 text-blue-500" />
                  ارسال اکسپرس و سریع
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  ارسال با پست پیشتاز و تحویل حداکثر تا ۲ روز کاری
                </p>
              </div>
            </RadioGroup>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4"> محصولات</h3>

            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 border border-natural-50 rounded-lg"
              >
                <div className="relative w-20 h-20">
                  <Image
                    src={getFullImageUrl(item.thumbnail)}
                    alt={item.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onPress={() =>
                      updateQty(item.id, Math.max(1, item.quantity - 1))
                    }
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    size="sm"
                    onPress={() =>
                      updateQty(item.id, Math.min(item.quantity + 1, 3))
                    }
                  >
                    +
                  </Button>
                </div>
              </div>
            ))}
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5" />
              <h3 className="font-semibold">انتخاب روز تحویل</h3>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {availableDays.map((day) => (
                <button
                  key={day.id}
                  onClick={() => setSelectedDay(day.id)}
                  className={`p-3 text-center border border-natural-50 rounded-lg text-sm ${
                    selectedDay === day.id
                      ? "border-primary bg-red-50 text-primary"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="font-medium">{day.label}</div>
                  <div className="text-xs text-gray-500">{day.date}</div>
                  <div className="text-xs text-gray-400">{day.month}</div>
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">انتخاب ساعت تحویل</h3>

            <div className="space-y-3">
              {timeSlots.map((slot) => (
                <label
                  key={slot.id}
                  htmlFor={slot.id}
                  className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer ${
                    selectedTime === slot.id
                      ? "border-primary bg-red-50 text-primary"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center space-x-2 space-x-reverse gap-2">
                    <input
                      type="radio"
                      id={slot.id}
                      name="deliveryTime"
                      value={slot.id}
                      checked={selectedTime === slot.id}
                      onChange={() => setSelectedTime(slot.id)}
                      className=" text-primary focus:ring-primary"
                    />
                    <span>{slot.label}</span>
                  </div>
                </label>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-natural-50">
              <div className="flex justify-between text-sm">
                <span>مجموع هزینه ارسال</span>
                <span>{shippingCost.toLocaleString()} تومان</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-1 text-natural-900">
          <Card className="p-4">
            <h3 className="font-semibold mb-4">اطلاعات پرداخت</h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="">قیمت محصولات</span>
                <span>{originalCount.toLocaleString("fa-IR")} تومان</span>
              </div>

              <div className="flex justify-between text-green-600">
                <span>سود شما</span>
                <span>{discount.toLocaleString("fa-IR")} تومان</span>
              </div>
              <div className="flex justify-between font-semibold border-t border-natural-50 pt-2">
                <span>جمع کل</span>
                <span>{productTotal.toLocaleString("fa-IR")} تومان</span>
              </div>
              <div className="flex justify-between">
                <span className="">هزینه ارسال</span>
                <span>{shippingCost.toLocaleString("fa-IR")} تومان</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t border-natural-50 pt-2">
                <span>جمع کل</span>
                <span>{finalTotal.toLocaleString("fa-IR")} تومان</span>
              </div>
            </div>

            <Button className="w-full mt-6 bg-primary hover:bg-primary/80 text-white">
              پرداخت
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
