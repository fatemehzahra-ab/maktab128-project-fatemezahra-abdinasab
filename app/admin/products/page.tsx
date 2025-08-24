"use client";

import SearchInput from "@/app/components/molecules/SearchBar";
import ProductModal from "@/app/components/modals/UpdateProductModal";
import DeleteModal from "@/app/components/modals/DeleteModal";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { Pagination } from "@heroui/pagination";
import { api } from "../../apis/url";
import { getFullImageUrl } from "../../utils/url";
import { makeAuthenticatedRequest } from "../../apis/request";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);

        const data = await makeAuthenticatedRequest(
          `${api.products.list}?page=${page}&limit=10`,
          { method: "GET" }
        );

        setProducts(data.data.products || []);
        setTotalPages(data.total_pages || 1);
      } catch (err: any) {
        setError(err.message || "خطای ناشناخته");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [page]);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.includes(searchQuery) || product.brand.includes(searchQuery);
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string, quantity: number) => {
    if (quantity === 0) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700">
          ناموجود
        </span>
      );
    }
    if (quantity < 10) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
          در حال اتمام
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
        موجود
      </span>
    );
  };

  const handleCreateProduct = () => {
    setSelectedProduct(null);
    setModalMode("create");
    setIsProductModalOpen(true);
  };

  const handleEditProduct = (product: any) => {
    setSelectedProduct(product);
    setModalMode("edit");
    setIsProductModalOpen(true);
  };

  const handleDeleteProduct = (product: any) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleSaveProduct = async (productData: any) => {
    try {
      if (modalMode === "create") {
        const data = await makeAuthenticatedRequest(
          `${api.products.list}?page=${page}&limit=10`,
          { method: "GET" }
        );
        setProducts(data.data.products || []);
        setTotalPages(data.total_pages || 1);
      } else {
        const data = await makeAuthenticatedRequest(
          `${api.products.list}?page=${page}&limit=10`,
          { method: "GET" }
        );
        setProducts(data.data.products || []);
        setTotalPages(data.total_pages || 1);
      }
    } catch (err: any) {
      setError(err.message || "خطا در بروزرسانی لیست محصولات");
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (selectedProduct && selectedProduct._id) {
        await makeAuthenticatedRequest(
          api.products.delete(selectedProduct._id),
          {
            method: "DELETE",
          }
        );

        const data = await makeAuthenticatedRequest(
          `${api.products.list}?page=${page}&limit=10`,
          { method: "GET" }
        );
        setProducts(data.data.products || []);
        setTotalPages(data.total_pages || 1);
      }

      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
    } catch (err: any) {
      setError(err.message || "خطا در حذف محصول");
      setIsDeleteModalOpen(false);
      setSelectedProduct(null);
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        در حال بارگذاری محصولات...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        خطا در بارگذاری محصولات: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">مدیریت کالاها</h1>
          <p className="text-gray-600 mt-1">مدیریت محصولات و موجودی انبار</p>
        </div>
        <button
          onClick={handleCreateProduct}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          افزودن کالا
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-blue-600">
            {products.length}
          </div>
          <div className="text-sm text-gray-600">کل محصولات</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-green-600">
            {products.filter((p) => p.quantity > 0).length}
          </div>
          <div className="text-sm text-gray-600">موجود</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-yellow-600">
            {products.filter((p) => p.quantity < 10 && p.quantity > 0).length}
          </div>
          <div className="text-sm text-gray-600"> در حال اتمام</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-red-600">
            {products.filter((p) => p.quantity === 0).length}
          </div>
          <div className="text-sm text-gray-600">ناموجود</div>
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
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              لیست محصولات
            </h3>
            <span className="text-sm text-gray-500">
              {products.length} محصول یافت شد
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-right p-4 font-medium text-gray-700">
                    تصویر
                  </th>
                  <th className="text-right p-4 font-medium text-gray-700">
                    نام محصول
                  </th>

                  <th className="text-right p-4 font-medium text-gray-700">
                    برند
                  </th>
                  <th className="text-right p-4 font-medium text-gray-700">
                    قیمت
                  </th>
                  <th className="text-right p-4 font-medium text-gray-700">
                    موجودی
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
                {filteredProducts.map((product, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-4">
                      <img
                        src={getFullImageUrl(product.thumbnail)}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    </td>

                    <td className="p-4 font-medium">{product.name}</td>
                    <td className="p-4 text-gray-600 font-medium">
                      {product.brand}
                    </td>

                    <td className="p-4 font-medium">
                      {product.price.toLocaleString()} تومان
                    </td>
                    <td className="p-4 text-gray-600">
                      {product.quantity} عدد
                    </td>
                    <td className="p-4">
                      {getStatusBadge(product.status, product.quantity)}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="inline-flex items-center justify-center w-8 h-8 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <PencilIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product)}
                          className="inline-flex items-center justify-center w-8 h-8 border border-gray-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Pagination
        className="flex justify-center"
        page={page}
        total={totalPages}
        onChange={setPage}
      />

      <ProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onSave={handleSaveProduct}
        product={selectedProduct}
        mode={modalMode}
      />

      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="حذف محصول"
        message={`آیا از حذف محصول "${selectedProduct?.name}" اطمینان دارید؟ این عمل قابل بازگشت نیست.`}
      />
    </div>
  );
}
