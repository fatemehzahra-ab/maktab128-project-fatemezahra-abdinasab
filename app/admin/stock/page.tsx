"use client";

import SearchInput from "@/app/components/molecules/SearchBar";
import ProductModal from "@/app/components/modals/UpdateProductModal";
import DeleteModal from "@/app/components/modals/DeleteModal";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ExclamationTriangleIcon,
  CubeIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { Pagination } from "@heroui/pagination";

export default function StockPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [alertFilter, setAlertFilter] = useState("all");
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("http://127.0.0.1:8000/api/products");
        if (!res.ok) {
          throw new Error("خطا در دریافت محصولات");
        }
        const data = await res.json();

        setProducts(data.data.products);
        console.log(data.data.products[0]._id);
      } catch (err: any) {
        setError(err.message || "خطای ناشناخته");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const getStockStatus = (current: number) => {
    if (current === 0)
      return {
        status: "out",
        label: "ناموجود",
        color: "bg-red-100 text-red-700",
      };
    if (current <= 10)
      return {
        status: "low",
        label: "در حال اتمام ",
        color: "bg-yellow-100 text-yellow-700",
      };
    return {
      status: "normal",
      label: "عادی",
      color: "bg-green-100 text-green-700",
    };
  };

  const handleEditItem = (item: any) => {
    setSelectedItem(item);
    setModalMode("edit");
    setIsStockModalOpen(true);
  };

  const handleDeleteItem = (item: any) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const handleSaveItem = (itemData: any) => {
    if (modalMode === "create") {
      const newId =
        products.length > 0
          ? Math.max(...products.map((i) => i._id || 0)) + 1
          : Date.now();

      const newItem = {
        ...itemData,
        _id: newId,
        lastUpdated: new Date().toLocaleDateString("fa-IR"),
      };
      setProducts([...products, newItem]);
    } else if (selectedItem) {
      setProducts(
        products.map((i) =>
          i._id === selectedItem._id
            ? {
                ...itemData,
                _id: selectedItem._id,
                lastUpdated: new Date().toLocaleDateString("fa-IR"),
              }
            : i
        )
      );
    }
    setIsStockModalOpen(false);
    setSelectedItem(null);
  };

  const handleConfirmDelete = () => {
    if (selectedItem) {
      setProducts(products.filter((i) => i._id !== selectedItem._id));
      setIsDeleteModalOpen(false);
      setSelectedItem(null);
    }
  };

  const filteredItems = products.filter((item) => {
    const matchesSearch =
      item.name.includes(searchQuery) || item.sku?.includes(searchQuery);
    const stockStatus = getStockStatus(item.quantity).status;

    if (alertFilter === "all") return matchesSearch;
    if (alertFilter === "low")
      return matchesSearch && (stockStatus === "low" || stockStatus === "out");
    if (alertFilter === "out") return matchesSearch && stockStatus === "out";
    return matchesSearch;
  });

  const filters = [
    { id: "all", label: "همه موارد", count: products.length },
    {
      id: "low",
      label: "در حال اتمام ",
      count: products.filter(
        (i) =>
          getStockStatus(i.quantity).status === "low" ||
          getStockStatus(i.quantity).status === "out"
      ).length,
    },
    {
      id: "out",
      label: "ناموجود",
      count: products.filter((i) => getStockStatus(i.quantity).status === "out")
        .length,
    },
  ];

  const totalValue = products.reduce(
    (sum, item) => sum + item.quantity * item.avgCost,
    0
  );
  const lowStockItems = products.filter(
    (i) =>
      getStockStatus(i.quantity).status === "low" ||
      getStockStatus(i.quantity).status === "out"
  ).length;

  if (loading) return <div>در حال بارگذاری...</div>;
  if (error) return <div className="text-red-600">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">موجودی و قیمت‌ها</h1>
          <p className="text-gray-600 mt-1">مدیریت موجودی انبار و قیمت‌گذاری</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {totalValue.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">
                ارزش کل موجودی (تومان)
              </div>
            </div>
            <CubeIcon className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-green-600">
                {
                  products.filter(
                    (i) => getStockStatus(i.currentStock).status === "normal"
                  ).length
                }
              </div>
              <div className="text-sm text-gray-600">موجودی عادی</div>
            </div>
            <ArrowTrendingUpIcon className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {lowStockItems}
              </div>
              <div className="text-sm text-gray-600">نیاز به سفارش</div>
            </div>
            <ExclamationTriangleIcon className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-red-600">
                {
                  products.filter(
                    (i) => getStockStatus(i.quantity).status === "out"
                  ).length
                }
              </div>
              <div className="text-sm text-gray-600">ناموجود</div>
            </div>
            <ArrowTrendingDownIcon className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1">
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`inline-flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                alertFilter === filter.id
                  ? "bg-primary text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setAlertFilter(filter.id)}
            >
              {filter.label}
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
                {filter.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-right p-4 font-medium text-gray-700">
                    نام محصول
                  </th>

                  <th className="text-right p-4 font-medium text-gray-700">
                    موجودی فعلی
                  </th>

                  <th className="text-right p-4 font-medium text-gray-700">
                    قیمت
                  </th>

                  <th className="text-right p-4 font-medium text-gray-700">
                    وضعیت
                  </th>

                  <th className="text-right p-4 font-medium text-gray-700">
                    عملیات
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.map((item, _id) => {
                  const stockStatus = getStockStatus(item.quantity);

                  return (
                    <tr
                      key={item._id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="p-4 font-medium">{item.name}</td>

                      <td className="p-4 text-gray-600">{item.quantity} عدد</td>

                      <td className="p-4 font-medium">
                        {item.price.toLocaleString()} تومان
                      </td>

                      <td className="p-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${stockStatus.color}`}
                        >
                          {stockStatus.label}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditItem(item)}
                            className="inline-flex items-center justify-center w-8 h-8 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleDeleteItem(item)}
                            className="inline-flex items-center justify-center w-8 h-8 border border-gray-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination className="flex justify-center" initialPage={1} total={3} />
      <ProductModal
        isOpen={isStockModalOpen}
        onClose={() => setIsStockModalOpen(false)}
        onSave={handleSaveItem}
        product={selectedItem}
        mode={modalMode}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="حذف کالا از موجودی"
        message={`آیا از حذف "${selectedItem?.name}" از موجودی اطمینان دارید؟ این عمل قابل بازگشت نیست.`}
      />
    </div>
  );
}
