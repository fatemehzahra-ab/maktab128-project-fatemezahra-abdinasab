"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { Button } from "@heroui/react";
import Footer from "./components/organism/Footer";
import { Category, Product } from "@/types/products";
import { useProductStore } from "./store/productStore";
import Header from "./components/organism/header/Header";
import ProductCard from "./components/molecules/ProductCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Home() {
  const { products, categories, loading, error, fetchData } = useProductStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const categoryMap: Record<string, string> = categories.reduce(
    (map, category) => {
      map[category._id] = category.name;
      return map;
    },
    {} as Record<string, string>
  );

  const categoryIds: string[] = Array.from(
    new Set(products.map((p) => p.category).filter(Boolean))
  ) as string[];

  const productsByCategory = categoryIds.map((catId) => ({
    categoryId: catId,
    categoryName: categoryMap[catId] ?? "بدون دسته‌بندی",
    items: products.filter((p) => p.category === catId),
  }));

  const categoryIcons: Record<string, string> = {
    "68a8142417802efa04adf415": "/images/mobl.svg",
    "68a591003557762c45f9798c": "/images/kitchen.svg",
    "68a8146c17802efa04adf417": "/images/light.svg",
    "68a8144517802efa04adf416": "/images/electronic.svg",
  };

  return (
    <>
      <Header />
      <Image
        src={"/images/hero.svg"}
        alt={"hero"}
        width={1490}
        height={700}
        className="pt-40"
      />

      <div dir="rtl" className="bg-white text-natural-900">
        <section className="py-16 bg-gradient-to-b from-muted/20 to-muted/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                دسته‌بندی محصولات
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                محصولات متنوع ما در دسته‌بندی‌های مختلف
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 md:gap-8">
              {categories.map((cat) => (
                <Link
                  key={cat._id}
                  href={`/products/category/${cat._id}`}
                  className="group block"
                >
                  <div className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-md hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      <Image
                        src={categoryIcons[cat._id] || "/images/default.svg"}
                        alt={cat.name}
                        fill
                        className="object-contain transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <h3 className="text-center font-semibold text-lg text-gray-700 group-hover:text-primary transition-colors">
                      {cat.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 max-w-7xl mx-auto">
          <div className="relative rounded-3xl p-12 text-black overflow-hidden bg-white">
            <Image
              src="/images/kitchenbanner.svg"
              alt="Kitchen banner background"
              fill
              className="object-cover"
              priority
            />
            <div className="relative px-16 text-natural-50">
              <h3 className="text-lg font-bold mb-6">
                کامل ترین کالکشن ابزارهای آشپزخانه
              </h3>
              <p className="text-sm mb-8 opacity-90">
                آشپزخانه ات را با سبک زی هوم تکمیل کن
              </p>
              <Link href={`/products/category/68a591003557762c45f9798c`}>
                <Button
                  size="md"
                  className="bg-primary hover:bg-primary/100 text-natural-50 px-8"
                >
                  مشاهده همه
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-20 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">محصولات ویژه</h2>
            <p className="text-muted-foreground text-lg">
              انتخابی از بهترین محصولات ما
            </p>
          </div>

          {loading && <p className="text-center">در حال بارگذاری محصولات...</p>}
          {error && <p className="text-center text-red-600">{error}</p>}

          {!loading && !error && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-natural-900">
                  {products.length === 0 ? (
                    <p className="col-span-full text-center">
                      محصولی یافت نشد.
                    </p>
                  ) : (
                    products
                      .slice(0, 3)
                      .map((product) => (
                        <ProductCard key={product._id} product={product} />
                      ))
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 text-primary-foreground relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-3">پیشنهاد ویژه</h3>
                  <p className="text-primary-foreground/80 mb-6">
                    تخفیف ویژه محصولات منتخب
                  </p>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-sm">تا ۳۰٪ تخفیف</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm">ارسال رایگان</span>
                    </div>
                  </div>
                  <Button className="bg-white text-primary hover:bg-white/90 w-full">
                    مشاهده همه
                  </Button>
                </div>
              </div>
            </div>
          )}
        </section>

        <div dir="rtl" className="bg-white text-natural-900">
          {productsByCategory.map(({ categoryId, categoryName, items }) => (
            <section key={categoryId} className="py-20 px-4 max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <Link href={`/products/category/${categoryId}`}>
                  <h2 className="text-3xl font-bold mb-4">{categoryName}</h2>
                </Link>
                <p className="text-muted-foreground text-lg">
                  انتخابی از بهترین محصولات {categoryName}
                </p>
              </div>

              {items.length === 0 ? (
                <p className="col-span-full text-center">محصولی یافت نشد.</p>
              ) : (
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={20}
                  slidesPerView={1}
                  navigation
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                  }}
                >
                  {items.map((product) => (
                    <SwiperSlide key={product._id}>
                      <ProductCard product={product} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </section>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
