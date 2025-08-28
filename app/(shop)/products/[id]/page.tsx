"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useProductStore } from "@/app/store/productStore";
import { Import } from "lucide-react";
import { getFullImageUrl } from "@/app/utils/url";
import AddToCartButton from "@/app/components/modals/CartButton";

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const { products, categories } = useProductStore();

  const product = useMemo(
    () => products.find((p) => p._id === id),
    [products, id]
  );
  const categoryMap: Record<string, string> = useMemo(
    () =>
      categories.reduce((map, category) => {
        map[category._id] = category.name;
        return map;
      }, {} as Record<string, string>),
    [categories]
  );

  if (!product)
    return <p className="text-center mt-20 text-gray-600">محصولی یافت نشد.</p>;

  function getValidImageUrl(img?: string) {
    if (!img) return "/images/hero.png";
    if (img.startsWith("http")) return img;
    return getFullImageUrl(img);
  }

  const colors = ["قرمز", "آبی", "فیروزه‌ای", "صورتی"];
  const warranties = ["همه موارد", "گارانتی ۱۲ ماهه", "گارانتی ۱۸ ماهه"];
  const discount = product.price * 0.2;

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedWarranty, setSelectedWarranty] = useState(warranties[0]);

  console.log(product.category);
  return (
    <div
      dir="rtl"
      className="max-w-full mx-auto p-6 rtl font-sans text-gray-800 bg-white pt-46"
    >
      <nav className="text-sm text-gray-500 mb-4">
        زی هوم/ {categoryMap[product.category]} / {product.name}
      </nav>

      <div className="flex gap-6">
        <div className="flex-2/3 bg-white rounded-lg shadow p-6">
          <div className="flex gap-2">
            <div className="w-1/2 bg-white rounded-lg p-4 ">
              <h1 className="text-xl font-semibold mb-4">{product.name}</h1>
              <div className="flex gap-2 my-10">
                <div className="flex flex-col gap-1 mx-1">
                  {[product.thumbnail].map((img, index) => (
                    <Image
                      key={index}
                      src={getValidImageUrl(img)}
                      alt={`${product.name} ${index + 1}`}
                      width={300}
                      height={300}
                      className="rounded w-full max-w-md "
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="w-1/2 bg-white rounded-lg my-5 p-4">
              <div className="mb-6">
                <h2 className="font-semibold mb-2">طرح و رنگبندی</h2>
                <div className="flex items-center gap-4">
                  {colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`px-3 py-1 rounded-full border ${
                        selectedColor === c
                          ? "bg-primary text-white border-primary"
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
                  value={selectedWarranty}
                  onChange={(e) => setSelectedWarranty(e.target.value)}
                  className="border rounded px-3 py-2 w-full max-w-xs"
                >
                  {warranties.map((w) => (
                    <option key={w}>{w}</option>
                  ))}
                </select>
              </div>

              <h2 className="font-semibold mb-4">توضیحات محصول</h2>
              <p className="mb-6 text-gray-700">{product.description}</p>
            </div>
          </div>
        </div>
        <div className="w-1/4 bg-white rounded-lg shadow p-4">
          <button className="text-sm text-blue-500 mb-2 hover:underline">
            نمایش جزییات &gt;
          </button>

          <div className="border border-primary-400 rounded p-3 bg-red-50 mb-4">
            <p className="text-primary font-semibold text-sm">۲۰%</p>
            <p className="line-through text-xs text-gray-400">
              {(product.price + discount).toLocaleString("fa-IR")} تومان
            </p>
            <p className="text-primary font-bold text-lg">
              {product.price.toLocaleString("fa-IR")} تومان
            </p>
          </div>

          <AddToCartButton
            id={product._id ?? ""}
            name={product.name}
            price={product.price}
            thumbnail={product.thumbnail ?? "/images/placeholder.png"}
          />

          <div className="mt-4 text-sm text-gray-600">
            <p>گارانتی: {selectedWarranty}</p>
            <p className="mt-1">رنگ: {selectedColor}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
