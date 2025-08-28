import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  thumbnail?: string;
};

type CartState = {
  userId: string | null;
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  setUserId: (id: string) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      userId: null,
      items: [],

      addItem: (item) =>
        set((state) => {
          const exist = state.items.find((i) => i.id === item.id);
          if (exist) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),

      updateQty: (id, qty) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, quantity: qty } : i
          ),
        })),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== id),
        })),

      clearCart: () => set({ items: [] }),

      setUserId: (id) => set({ userId: id }),
    }),
    {
      name: "cart-storage",
      partialize: (state): Pick<CartState, "userId" | "items"> => ({
        userId: state.userId,
        items: state.items,
      }),
    }
  )
);
