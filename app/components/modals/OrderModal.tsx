"use client";
import {
  XMarkIcon,
  UserIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";

interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

interface Order {
  id: number;
  date: string;
  amount: number;
  status: "delivered" | "shipping" | "returned" | "cancelled";
  customer: string;
  items: number;
  customerInfo?: {
    phone: string;
    email: string;
    address: string;
  };
  orderItems?: OrderItem[];
}

interface OrderViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | null;
}

export default function OrderViewModal({
  isOpen,
  onClose,
  order,
}: OrderViewModalProps) {
  if (!isOpen || !order) return null;

  const statusMap = {
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

  const statusConfig = statusMap[order.status];

  const orderItems: OrderItem[] = order.orderItems || [];
  const customerInfo = order.customerInfo || {
    phone: "09123456789",
    email: "customer@example.com",
    address: "تهران، خیابان ولیعصر، پلاک 123",
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              جزئیات سفارش #{order.id}
            </h2>
            <p className="text-gray-600 mt-1">مشاهده کامل اطلاعات سفارش</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ShoppingBagIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">شماره سفارش</div>
                  <div className="font-bold text-blue-600">#{order.id}</div>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CurrencyDollarIcon className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">مبلغ کل</div>
                  <div className="font-bold text-green-600">
                    {order.amount.toLocaleString()} تومان
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <CalendarIcon className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">تاریخ سفارش</div>
                  <div className="font-bold text-orange-600">{order.date}</div>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <UserIcon className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">وضعیت</div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.text}`}
                  >
                    {statusConfig.label}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              اطلاعات مشتری
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  نام مشتری
                </label>
                <div className="mt-1 text-gray-900">{order.customer}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  شماره تماس
                </label>
                <div className="mt-1 text-gray-900">{customerInfo.phone}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  ایمیل
                </label>
                <div className="mt-1 text-gray-900">{customerInfo.email}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  آدرس تحویل
                </label>
                <div className="mt-1 text-gray-900">{customerInfo.address}</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              کالاهای سفارش
            </h3>
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-right p-4 font-medium text-gray-700">
                        کالا
                      </th>
                      <th className="text-right p-4 font-medium text-gray-700">
                        تعداد
                      </th>
                      <th className="text-right p-4 font-medium text-gray-700">
                        قیمت واحد
                      </th>
                      <th className="text-right p-4 font-medium text-gray-700">
                        قیمت کل
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems.map((item) => (
                      <tr key={item.id} className="border-b border-gray-100">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <div className="font-medium text-gray-900">
                                {item.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-gray-600">{item.quantity}</td>
                        <td className="p-4 text-gray-600">
                          {item.price.toLocaleString()} تومان
                        </td>
                        <td className="p-4 font-medium text-gray-900">
                          {(item.price * item.quantity).toLocaleString()} تومان
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-gray-50">
                    <tr>
                      <td
                        colSpan={3}
                        className="p-4 font-semibold text-gray-900 text-left"
                      >
                        مجموع کل:
                      </td>
                      <td className="p-4 font-bold text-lg text-blue-600">
                        {order.amount.toLocaleString()} تومان
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            بستن
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            چاپ سفارش
          </button>
        </div>
      </div>
    </div>
  );
}
