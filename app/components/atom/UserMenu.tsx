"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  }, []);

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, handleClickOutside]);

  return (
    <div className="relative inline-block text-right" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-1 cursor-pointer focus:outline-none"
      >
        <Image src="/icons/user.svg" alt="User menu" width={28} height={28} />
      </button>

      {open && (
        <div
          className="absolute left-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 animate-fadeIn"
          role="menu"
          aria-label="User menu"
        >
          <Link
            href="/auth/login"
            className="block px-4 py-2 text-gray-700 hover:bg-primary-100 hover:text-primary rounded-t-lg"
            role="menuitem"
          >
            ورود
          </Link>
          <Link
            href="/auth/signup"
            className="block px-4 py-2 text-gray-700 hover:bg-primary-100 hover:text-primary"
            role="menuitem"
          >
            ثبت نام
          </Link>
          <Link
            href="/profile"
            className="block px-4 py-2 text-gray-700 hover:bg-primary-100 hover:text-primary rounded-b-lg"
            role="menuitem"
          >
            پروفایل کاربری
          </Link>
        </div>
      )}
    </div>
  );
}
