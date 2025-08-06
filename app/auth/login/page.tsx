export default function LoginPage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/images/login.png')" }}
    >
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full space-y-6 text-right" dir="rtl">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-semibold text-gray-800 flex justify-center gap-2">
              زیبایی به سبک
              <img src="/icons/logo.svg" alt="" />
            </h1>
            <p className="text-gray-500 text-sm">
              متنوع‌ ترین کالکشن خانه و آشپزخانه و دکوراسیون
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-6 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-medium">ورود | ثبت نام</span>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 ">
                  نام کاربری
                </label>
                <input
                  type="text"
                  name="username"
                  required
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm border p-1 focus:ring focus:ring-indigo-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  رمز عبور
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  className="mt-2 block w-full rounded-md border-gray-300 shadow-sm border p-1 focus:ring focus:ring-indigo-200"
                />
              </div>
            </form>
            <button
              disabled
              className="w-full bg-gray-300 text-gray-500 font-semibold py-2 rounded-lg cursor-not-allowed"
            >
              تایید
            </button>

            <p className="text-xs text-gray-500 text-center mt-2">
              با ورود به{" "}
              <span className="text-red-600 font-semibold">زیهوم</span>، شما
              <a href="#" className="text-red-500 hover:underline mx-1">
                شرایط استفاده
              </a>
              و
              <a href="#" className="text-red-500 hover:underline mx-1">
                قوانین حریم خصوصی
              </a>
              ما را می‌پذیرید.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
