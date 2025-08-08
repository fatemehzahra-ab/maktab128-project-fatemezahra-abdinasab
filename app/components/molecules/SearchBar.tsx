import Image from "next/image";

export default function SearchInput() {
  return (
    <div
      dir="rtl"
      className="flex items-center border border-gray-300 rounded-lg px-4 py-3 bg-white gap-1"
    >
      <Image src="/icons/search.svg" alt={""} width={24} height={24} />
      <input
        type="text"
        placeholder="جستجو"
        className="flex-1 bg-transparent outline-none text-natural-700 placeholder-natural-400 w-[665px]"
      />
    </div>
  );
}
