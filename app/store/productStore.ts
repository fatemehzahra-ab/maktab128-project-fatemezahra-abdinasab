import { create } from "zustand";
import { makeAuthenticatedRequest } from "../apis/request";
import { api } from "../apis/url";
import { Category, Product } from "../../types/products";

type ProductStore = {
  products: Product[];
  categories: Category[];

  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
};

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  categories: [],
  loading: false,
  error: null,

  fetchData: async () => {
    try {
      set({ loading: true, error: null });
      const productData = await makeAuthenticatedRequest(
        `${api.products.list}?limit=100`
      );
      const allProducts = productData.data.products;

      const categoryData = await makeAuthenticatedRequest(api.categories.list);
      const allCategories = categoryData.data.categories;

      set({
        products: allProducts,
        categories: allCategories,
        loading: false,
        error: null,
      });
    } catch (err: any) {
      set({
        error: err.message || "خطا در دریافت داده‌ها",
        loading: false,
      });
    }
  },
}));
