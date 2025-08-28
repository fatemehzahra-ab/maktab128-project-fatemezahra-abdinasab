import React, { useState } from "react";

const RefrigeratorProductPage = () => {
  const [color, setColor] = useState("قرمز");
  const [warranty, setWarranty] = useState("همه موارد");

  return (
    <div className="max-w-6xl mx-auto p-6 rtl font-sans text-gray-800 bg-white">
      <nav className="text-sm text-gray-500 mb-4">
        زی / هوم / لوازم آشپزخانه / لوازم برقی آشپزخانه / یخچال فریزر اسنک
      </nav>

      <div className="flex gap-6">
        {/* Left Sidebar */}
        <div className="w-1/4 bg-white rounded-lg shadow p-4">
          <button className="text-sm text-blue-500 mb-2 hover:underline">
            نمایش جزییات &gt;
          </button>
          <div className="border border-red-400 rounded p-3 bg-red-50 mb-4">
            <p className="text-red-600 font-semibold text-sm">۲۰٪</p>
            <p className="line-through text-xs text-gray-400">
              ۱,۰۸۰,۰۰۰ تومان
            </p>
            <p className="text-red-600 font-bold text-lg">۸۶۰,۰۰۰ تومان</p>
          </div>
          <button className="w-full bg-red-600 text-white rounded py-2 font-medium hover:bg-red-700 transition">
            افزودن به سبد خرید
          </button>
          <div className="mt-4 text-sm text-gray-600">
            <p>گارانتی ۱۸ ماهه گلدیران</p>
            <p className="mt-1">رنگ قرمز</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white rounded-lg shadow p-6">
          <h1 className="text-xl font-semibold mb-4">
            یخچال فریزر اسنک ۳۴ امتیاز
          </h1>

          <div className="mb-6">
            <h2 className="font-semibold mb-2">طرح و رنگبندی</h2>
            <div className="flex items-center gap-4">
              {["قرمز", "فیروزه ای", "آبی", "صورتی"].map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`px-3 py-1 rounded-full border ${
                    color === c
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-gray-100 border-gray-300 text-gray-600"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="font-semibold mb-2">گارانتی</h2>
            <select
              value={warranty}
              onChange={(e) => setWarranty(e.target.value)}
              className="border rounded px-3 py-2 w-full max-w-xs"
            >
              <option>همه موارد</option>
              <option>گارانتی ۱۲ ماهه</option>
              <option>گارانتی ۱۸ ماهه</option>
            </select>
          </div>

          <h2 className="font-semibold mb-4">ویژگی های اصلی</h2>
          <div className="flex gap-3 flex-wrap mb-6">
            {[
              "نوع یخچال فریزر بالا",
              "نمودار مصرف انرژی +۸۸",
              "ظرفیت 24 فوت",
              "جنس بدنه استیل",
            ].map((feature) => (
              <span
                key={feature}
                className="bg-gray-100 px-3 py-1 rounded text-sm text-gray-700"
              >
                {feature}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            {/* Images */}
            <div className="flex flex-col gap-2">
              <img
                src="https://shop.example.com/images/fridge-red.png"
                alt="یخچال فریزر قرمز"
                className="w-40 rounded"
              />
              <img
                src="https://shop.example.com/images/fridge-open.png"
                alt="داخل یخچال"
                className="w-40 rounded"
              />
              <img
                src="https://shop.example.com/images/fridge-turquoise.png"
                alt="یخچال فیروزه ای"
                className="w-40 rounded"
              />
            </div>
            {/* Main image */}
            <div className="flex-1">
              <img
                src="https://shop.example.com/images/fridge-red.png"
                alt="یخچال فریزر اسنک"
                className="rounded w-full max-w-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefrigeratorProductPage;
