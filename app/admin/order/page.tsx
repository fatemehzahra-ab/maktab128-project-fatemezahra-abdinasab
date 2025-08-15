"use client";
import { useState } from "react";
import { MagnifyingGlassIcon, CalendarIcon } from "@heroicons/react/24/outline";
import SearchInput from "@/app/components/molecules/SearchBar";
import OrderViewModal from "@/app/components/modals/OrderModal";

const STATUSES = [
  { id: "all", label: "همه موارد", count: 4 },
  { id: "delivered", label: "تحویل شده", count: 1 },
  { id: "shipping", label: "در حال ارسال", count: 1 },
  { id: "returned", label: "مرجوعی", count: 1 },
  { id: "cancelled", label: "لغو شده", count: 1 },
];

type StatusKey = "delivered" | "shipping" | "returned" | "cancelled";

function StatusPill({ status }: { status: StatusKey }) {
  const map: Record<StatusKey, { bg: string; text: string; label: string }> = {
    delivered: {
      bg: "bg-green-100",
      text: "text-green-700",
      label: "تحویل شده",
    },
    shipping: {
      bg: "bg-blue-100",
      text: "text-blue-700",
      label: "در حال ارسال",
    },
    returned: { bg: "bg-gray-100", text: "text-gray-700", label: "مرجوع شده" },
    cancelled: { bg: "bg-red-100", text: "text-red-700", label: "لغو شده" },
  };

  const statusConfig = map[status] ?? {
    bg: "bg-slate-100",
    text: "text-slate-700",
    label: status,
  };

  return (
    <span
      className={`inline-flex items-center flex-nowrap px-2 py-1 rounded-full text-[10px] font-medium ${statusConfig.bg} ${statusConfig.text}`}
    >
      {statusConfig.label}
    </span>
  );
}

export default function DashboardContent() {
  const [filter, setFilter] = useState("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [query, setQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const ORDERS = [
    {
      id: 1234567,
      date: "1404/03/04",
      amount: 100000,
      status: "shipping" as StatusKey,
      customer: "احمد محمدی",
      items: 3,
    },
    {
      id: 1234568,
      date: "1404/03/04",
      amount: 150000,
      status: "cancelled" as StatusKey,
      customer: "فاطمه احمدی",
      items: 2,
    },
    {
      id: 1234569,
      date: "1404/03/04",
      amount: 200000,
      status: "delivered" as StatusKey,
      customer: "علی رضایی",
      items: 5,
    },
    {
      id: 1234570,
      date: "1404/03/04",
      amount: 75000,
      status: "returned" as StatusKey,
      customer: "مریم کریمی",
      items: 1,
    },
  ];

  const filtered = ORDERS.filter((o) => {
    if (filter !== "all" && o.status !== filter) return false;
    if (query && !String(o.id).includes(query) && !o.customer.includes(query))
      return false;
    if (from && o.date < from) return false;
    if (to && o.date > to) return false;
    return true;
  });

  const handleReset = () => {
    setFrom("");
    setTo("");
    setQuery("");
    setFilter("all");
  };

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setIsViewModalOpen(true);
  };

  const totalAmount = filtered.reduce((sum, order) => sum + order.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            پنل مدیریت سفارش‌ها
          </h1>
          <p className="text-gray-600 mt-1">
            مدیریت و پیگیری سفارش‌های مشتریان
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 ">
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-blue-600">
            {filtered.length}
          </div>
          <div className="text-sm text-gray-600">کل سفارش‌ها</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-green-600">
            {totalAmount.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">مجموع فروش (تومان)</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-orange-600">
            {ORDERS.filter((o) => o.status === "shipping").length}
          </div>
          <div className="text-sm text-gray-600">در حال ارسال</div>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="text-2xl font-bold text-red-600">
            {ORDERS.filter((o) => o.status === "cancelled").length}
          </div>
          <div className="text-sm text-gray-600">لغو شده</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1">
            <SearchInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap mb-6">
          {STATUSES.map((s) => (
            <button
              key={s.id}
              className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                filter === s.id
                  ? "bg-primary text-white"
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              onClick={() => setFilter(s.id)}
            >
              {s.label}
              <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
                {s.count}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-gray-500" />
            <label className="text-sm font-medium">از تاریخ:</label>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-40 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">تا تاریخ:</label>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-40 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
            onClick={handleReset}
          >
            ریست فیلترها
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              لیست سفارش‌ها
            </h3>
            <span className="text-sm text-gray-500">
              {filtered.length} سفارش یافت شد
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-right p-4 font-medium text-gray-700">
                    ردیف
                  </th>
                  <th className="text-right p-4 font-medium text-gray-700">
                    شماره سفارش
                  </th>
                  <th className="text-right p-4 font-medium text-gray-700">
                    مشتری
                  </th>
                  <th className="text-right p-4 font-medium text-gray-700">
                    تاریخ
                  </th>
                  <th className="text-right p-4 font-medium text-gray-700">
                    تعداد کالا
                  </th>
                  <th className="text-right p-4 font-medium text-gray-700">
                    مبلغ
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
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <MagnifyingGlassIcon className="w-8 h-8 text-gray-300" />
                        <span>سفارشی با این مشخصات یافت نشد</span>
                      </div>
                    </td>
                  </tr>
                )}
                {filtered.map((order, idx) => (
                  <tr
                    key={order.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="p-4 text-gray-600">{idx + 1}</td>
                    <td className="p-4 font-medium text-blue-600">
                      #{order.id}
                    </td>
                    <td className="p-4">{order.customer}</td>
                    <td className="p-4 text-gray-600">{order.date}</td>
                    <td className="p-4 text-gray-600">{order.items} کالا</td>
                    <td className="p-4 font-medium">
                      {order.amount.toLocaleString()} تومان
                    </td>
                    <td className="p-4">
                      <StatusPill status={order.status} />
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          مشاهده
                        </button>
                        <button className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                          ویرایش
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
      <OrderViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        order={selectedOrder}
      />
    </div>
  );
}
