"use client";

import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { useProductStore } from "@/app/store/productStore";
import ProductCard from "@/app/components/molecules/ProductCard";

export default function CategoryPage() {
  const { id } = useParams<{ id: string }>();

  const products = useProductStore((state) => state.products);
  const loading = useProductStore((state) => state.loading);
  const error = useProductStore((state) => state.error);
  const fetchData = useProductStore((state) => state.fetchData);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => p.category === id);
  }, [products, id]);

  return (
    <div
      dir="rtl"
      className="max-w-full bg-white mx-auto px-4 py-20 text-natural-900 pt-46"
    >
      {loading && <p className="text-center">در حال بارگذاری...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          <h1 className="text-3xl font-bold mb-10 text-center">
            محصولات دسته‌بندی
          </h1>

          {filteredProducts.length === 0 ? (
            <p className="text-center">محصولی یافت نشد.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
