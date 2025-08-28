"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "../../store/cartStore";

export default function CartBadge() {
  const { items } = useCartStore();
  const count = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Link href="/cart" className="relative inline-block">
      <Image src="/icons/shopping.svg" alt="Cart" width={28} height={28} />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {count}
        </span>
      )}
    </Link>
  );
}
