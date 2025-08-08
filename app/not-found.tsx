import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="bg-white max-w-[1440] h-dvh flex flex-col justify-center items-center"
      dir="rtl"
    >
      <Image
        src="/images/not-found.svg"
        alt="Logo"
        width={690}
        height={429}
        className="py-6 "
      />
      <div className="text-natural-800 flex flex-col justify-center items-center font-semibold">
        <p>خطا404!</p>
        <p>صفحه یافت نشد</p>

        <p className="my-3">این صفحه وجود ندارد یا حذف شده است!</p>
      </div>

      <Link href="/">
        <button className="text-white bg-primary rounded-lg py-2 my-2 px-2 cursor-pointer">
          بازگشت به صفحه اصلی
        </button>
      </Link>
    </div>
  );
}
