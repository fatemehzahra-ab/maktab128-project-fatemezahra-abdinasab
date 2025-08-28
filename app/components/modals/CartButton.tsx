"use client";

import { useCartStore } from "../../store/cartStore";

type AddToCartButtonProps = {
  id: string;
  name: string;
  price: number;
  thumbnail?: string;
};

export default function AddToCartButton({
  id,
  name,
  price,
  thumbnail,
}: AddToCartButtonProps) {
  const { addItem } = useCartStore();

  const handleAdd = () => {
    console.log({ id, name, price, thumbnail });
    addItem({
      id,
      name,
      price,
      thumbnail,
      quantity: 1,
    });
  };

  return (
    <button
      onClick={handleAdd}
      className="w-full bg-primary text-white rounded py-2 font-medium hover:bg-primary/80 transition"
    >
      افزودن به سبد خرید
    </button>
  );
}
