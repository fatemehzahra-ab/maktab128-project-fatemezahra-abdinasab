"use client";

import Link from "next/link";
import Image from "next/image";
import SearchInput from "../../molecules/SearchBar";
import Navbar from "./Navbar";
import UserMenu from "../../atom/UserMenu";
import CartBadge from "../../atom/CartBadge"; // Adjust path if needed

export default function Header() {
  return (
    <header
      dir="rtl"
      className="w-full text-sm fixed top-0 left-0 right-0 z-50"
    >
      <div className="bg-natural-900 text-white flex justify-between px-6 py-2">
        <span>خرید بیش از یک میلیون تومان ارسال رایگان | خدمات رایگان</span>
        <span>۵۰٪ تخفیف | فروش بهاره</span>
      </div>

      <div className="flex items-center justify-between px-6 py-4 bg-white border-b">
        <Link href="/">
          <Image src="/icons/logo.svg" alt="Logo" width={125} height={56} />
        </Link>

        <SearchInput value={""} onChange={() => {}} />

        <div className="flex items-center gap-6">
          <UserMenu />
          <CartBadge />
        </div>
      </div>

      <Navbar />
    </header>
  );
}
