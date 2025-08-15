"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  User,
  ShoppingCart,
  Package,
  DollarSign,
  BarChart3,
  Settings,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@heroui/button";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("loggedInUser");
      if (storedUser) {
        setUser(storedUser);
      }
    }
  }, []);

  const navigationItems = [
    {
      id: "orders",
      label: "سفارش‌ها",
      icon: ShoppingCart,
      path: "/admin/order",
    },
    {
      id: "inventory",
      label: "موجودی و قیمت ها",
      icon: DollarSign,
      path: "/admin/stock",
    },
    {
      id: "products",
      label: "کالا ها",
      icon: Package,
      path: "/admin/products",
    },
    { id: "analytics", label: "گزارش‌ها", icon: BarChart3, path: "/analytics" },
    { id: "settings", label: "تنظیمات", icon: Settings, path: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-[#fafafa] text-gray-800 p-6" dir="rtl">
      <div className="max-w-7xl mx-auto grid grid-cols-12 gap-6">
        <main className="col-span-9">{children}</main>

        <aside className="col-span-3">
          <div className="bg-white rounded-2xl p-4 shadow-sm sticky top-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <User className="w-6 h-6" />
              </div>
              <div>
                <div className="font-medium text-gray-900">
                  {user ?? "ادمین"}
                </div>
                <div className="text-xs text-gray-500">0912-345-678</div>
              </div>
            </div>

            <nav className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.path;
                return (
                  <Button
                    key={item.id}
                    onPress={() => router.push(item.path)}
                    className={`w-full justify-start gap-3 h-11 transition-colors
                      ${
                        isActive
                          ? "bg-primary-100 text-primary"
                          : "bg-white text-natural-800 hover:bg-primary-100 hover:text-primary"
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="text-sm text-gray-500 mb-3">آمار سریع</div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">سفارش‌های امروز</span>
                  <span className="text-sm font-medium">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">فروش امروز</span>
                  <span className="text-sm font-medium">2.4M </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">محصولات</span>
                  <span className="text-sm font-medium">156</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
