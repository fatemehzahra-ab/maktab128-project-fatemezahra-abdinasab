"use client";
import { useState, useEffect } from "react";
import type React from "react";
import { makeAuthenticatedRequest } from "../../apis/request";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { api } from "../../apis/url";
import {
  Category,
  Product,
  ProductModalProps,
  Subcategory,
} from "@/types/products";

export default function ProductModal({
  isOpen,
  onClose,
  onSave,
  product,
  mode,
}: ProductModalProps) {
  const [formData, setFormData] = useState<Product>({
    name: "",
    category: "",
    subcategory: "",
    brand: "",
    description: "",
    price: 0,
    quantity: 0,
    status: "active",
    file: undefined,
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setLoading(false);
      setError(null);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    fetch(api.categories.list)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data?.data?.categories))
          setCategories(data.data.categories);
        else setCategories([]);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    if (product && mode === "edit") {
      setFormData({ ...product, file: undefined });

      if (product.category) {
        fetch(api.subcategories.getByCategory(product.category))
          .then((res) => res.json())
          .then((data) => {
            if (Array.isArray(data?.data?.subcategories))
              setSubcategories(data.data.subcategories);
            else setSubcategories([]);
          })
          .catch((err) => {
            console.error(err);
            setError("خطا در بارگذاری زیردسته‌ها");
          });
      } else setSubcategories([]);
    } else {
      setFormData({
        name: "",
        category: "",
        subcategory: "",
        brand: "",
        description: "",
        price: 0,
        quantity: 0,
        status: "active",
        file: undefined,
      });
      setSubcategories([]);
    }
  }, [product, mode, isOpen]);

  const handleCategoryChange = (categoryId: string) => {
    setFormData({ ...formData, category: categoryId, subcategory: "" });

    fetch(api.subcategories.getByCategory(categoryId))
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data?.data?.subcategories))
          setSubcategories(data.data.subcategories);
        else setSubcategories([]);
      })
      .catch((err) => {
        console.error(err);
        setError("خطا در بارگذاری زیردسته‌ها");
      });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    const file = e.target.files[0];
    const maxSize = 5 * 1024 * 1024;

    if (!file.type.startsWith("image/"))
      return setError("لطفاً یک فایل تصویری معتبر انتخاب کنید");
    if (file.size > maxSize)
      return setError("حجم فایل باید کمتر از ۵ مگابایت باشد");

    setFormData({ ...formData, file });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log("[v0] Form data before submission:", {
        name: formData.name,
        hasFile: !!formData.file,
        fileType: formData.file?.type,
        fileName: formData.file?.name,
      });

      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("category", formData.category);
      payload.append("subcategory", formData.subcategory);
      payload.append("brand", formData.brand);
      payload.append("description", formData.description);
      payload.append("price", String(formData.price));
      payload.append("quantity", String(formData.quantity));

      if (formData.file && formData.file instanceof File) {
        payload.append("thumbnail", formData.file);
        console.log(
          "[v0] Appending file:",
          formData.file.name,
          formData.file.type
        );
      } else {
        console.log("[v0] No file to upload or file is not a File object");
      }

      const url =
        mode === "edit" && formData._id
          ? api.products.update(formData._id)
          : api.products.create;
      const method = mode === "edit" ? "PATCH" : "POST";

      console.log("[v0] Request URL:", url);
      console.log("[v0] Request method:", method);

      const data = await makeAuthenticatedRequest(url, {
        method,
        body: payload,
      });

      console.log("[v0] Response data:", data);

      if (data && data.data) {
        onSave(data.data);
        onClose();
      } else {
        setError("Invalid response from server");
      }
    } catch (err: any) {
      console.error("[v0] Request failed:", err);
      setError(err.message || "خطایی در ذخیره محصول رخ داد");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {mode === "create" ? "افزودن کالای جدید" : "ویرایش کالا"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="بستن"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <select
              value={formData.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
              aria-label="دسته‌بندی"
            >
              <option value="">انتخاب دسته‌بندی</option>
              {Array.isArray(categories) &&
                categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
            </select>

            <select
              value={formData.subcategory}
              onChange={(e) =>
                setFormData({ ...formData, subcategory: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
              required
              disabled={!formData.category}
              aria-label="زیردسته"
            >
              <option value="">انتخاب زیردسته</option>
              {Array.isArray(subcategories) &&
                subcategories.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              نام محصول
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
              aria-label="نام محصول"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              برند
            </label>
            <input
              type="text"
              value={formData.brand}
              onChange={(e) =>
                setFormData({ ...formData, brand: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
              aria-label="برند"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              توضیحات
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
              aria-label="توضیحات"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                قیمت (تومان)
              </label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
                aria-label="قیمت"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                موجودی
              </label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: Number(e.target.value) })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
                aria-label="موجودی"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              تصویر محصول
            </label>
            {mode === "edit" && product?.thumbnail}
            <input
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleFileChange}
              className="w-full"
              aria-label="تصویر محصول"
            />
          </div>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading
                ? "در حال ذخیره..."
                : mode === "create"
                ? "افزودن"
                : "ذخیره تغییرات"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
            >
              انصراف
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
