import React from "react";
import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bg-natural-50 text-gray-700 font-sans" dir="rtl">
      <div className=" pt-18 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <Image
            src="/icons/logo.svg"
            alt="Logo"
            width={102}
            height={33}
            className="py-6"
          />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-9">
            <div className="md:col-span-2 ml-[124px] w-[400]">
              <h3 className="text-md font-semibold text-natural-900 mb-3">
                درباره زی هوم
              </h3>
              <p className="text-sm text-natural-600">
                فروشگاه ما با ارایه مجموعه ای متنوع از محصولات خانه، تجربه ای
                آسان و مطمئن برای خرید آنلاین فراهم کرده است. با ضمانت کیفیت،
                ارسال سریع و پشتیبانی حرفه ای، همراه شما هستیم. برای کسب اطلاعات
                بیشتر درباره خدمات و شرایط فروش، کلیک کنید.
              </p>
              <a href="#" className="text-sm text-natural-600">
                مشاهده بیشتر...
              </a>
              <div className="mt-6">
                <p>تلفن پشتیبانی: ۴۴۳۴۹۸۶۷-۰۲۱</p>
              </div>

              <div className="flex  items-center justify-between">
                <p className="text-sm mt-1">همراه ما باشید</p>
                <div className="flex">
                  <Link href="/">
                    <Image
                      src="/icons/footer/linkedin.svg"
                      alt="Logo"
                      width={40}
                      height={40}
                    />
                  </Link>
                  <Link href="/">
                    <Image
                      src="/icons/footer/twitter.svg"
                      alt="Logo"
                      width={40}
                      height={40}
                    />
                  </Link>
                  <Link href="/">
                    <Image
                      src="/icons/footer/instagram.svg"
                      alt="Logo"
                      width={40}
                      height={40}
                    />
                  </Link>
                  <Link href="/">
                    <Image
                      src="/icons/footer/youtube.svg"
                      alt="Logo"
                      width={40}
                      height={40}
                    />
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-md font-semibold text-natural-900 mb-3">
                محصولات
              </h3>
              <ul className="space-y-2 text-sm text-natural-600">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    مبلمان
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    دکوراسیون
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    لوازم آشپزخانه
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    ابزار خانه
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    سرویس خواب
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-md font-semibold text-natural-900 mb-3">
                خدمات مشتریان
              </h3>
              <ul className="space-y-2 text-sm text-natural-600">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    پیگیری سفارش
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    شرایط و قوانین
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    روش های ارسال
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    سوالات متداول
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-md font-semibold text-natural-900 mb-3">
                درباره ما
              </h3>
              <ul className="space-y-2 text-sm text-natural-600">
                <li>
                  <a href="#" className="hover:text-blue-600">
                    معرفی فروشگاه
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    تماس با ما
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    همکاری با ما
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600">
                    وبلاگ
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex justify-around mt-10 mb-12">
        <div className="px-4 sm:px-6 lg:px-8 bg-white h-[104px] flex rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex items-center justify-center gap-2">
              <Image
                src="/icons/footer/ship.svg"
                alt="Logo"
                width={32}
                height={32}
              />
              <div className="flex flex-col">
                <h4 className="font-bold mt-4 flex gap-2">
                  ارسال سریع
                  <span className="text-natural-100 font-light">------</span>
                </h4>
                <p className="text-sm text-gray-500">در کمترین زمان ممکن</p>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Image
                src="/icons/footer/undo.svg"
                alt="Logo"
                width={32}
                height={32}
              />
              <div className="flex flex-col">
                <h4 className="font-bold mt-4">ضمانت بازگشت کالا</h4>
                <p className="text-sm text-gray-500">حداکثر ۱۰ روز کاری</p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/icons/footer/cube.svg"
                alt="Logo"
                width={32}
                height={32}
              />
              <div className="flex flex-col">
                <h4 className="font-bold mt-4">اصالت کالا</h4>
                <p className="text-sm text-gray-500">از بهترین برندها</p>
              </div>
            </div>
          </div>
        </div>
        <Image src="/images/enamad2.svg" alt="Logo" width={330} height={32} />
      </div>
      <div className="bg-natural-900 text-natural-300 py-4 px-6" dir="rtl">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-sm">
            کلیه حقوق این سایت متعلق به شرکت آریا گستر (فروشگاه زی هوم) می‌باشد.
          </p>
          <p className="text-sm text-center">
            Zihome.com.2025 &copy; copyright
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
