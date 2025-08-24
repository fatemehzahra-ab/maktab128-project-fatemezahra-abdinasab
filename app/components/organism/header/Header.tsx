"use client";

import Link from "next/link";
import SearchInput from "../../molecules/SearchBar";
import Image from "next/image";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="w-full text-sm">
      <div
        className="bg-natural-900 text-white flex justify-between px-6 py-2"
        dir="rtl"
      >
        <span>خرید بیش از یک میلیون تومان ارسال رایگان | خدمات رایگان</span>
        <span>۵۰٪ تخفیف | فروش بهاره</span>
      </div>

      <div
        className="flex items-center justify-between px-6 py-4 bg-white border-b"
        dir="rtl"
      >
        <Link href="/">
          <Image src="/icons/logo.svg" alt="Logo" width={125} height={56} />
        </Link>
        <SearchInput
          value={""}
          onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
            throw new Error("Function not implemented.");
          }}
        />

        <div className="flex gap-4 items-center divide-x divide-gray-300">
          <Link href={"/auth/login"}>
            <button className="flex items-center gap-1 border mx-4 px-3 py-1 rounded-lg border-natural-100 text-natural-800 cursor-pointer ">
              <Image
                src="/icons/user.svg"
                alt="login user icon"
                width={24}
                height={24}
              />{" "}
              ثبت نام / ورود
            </button>
          </Link>

          <button className="flex">
            <Image
              src="/icons/shopping.svg"
              alt="login user icon"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
      <Navbar />
    </header>
  );
}
