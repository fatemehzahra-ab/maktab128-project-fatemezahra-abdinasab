import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b" dir="rtl">
      <div className="flex items-center justify-between px-6 py-2">
        <ul className="flex items-center gap-6 text-gray-700">
          <li>
            <Link href="#">
              <div className="flex items-center gap-2">
                <Image
                  src={"/icons/navbar/category.svg"}
                  alt={"category"}
                  width={24}
                  height={24}
                />
                <p className="text-primary">دسته بندی کالاها</p>
              </div>
            </Link>
          </li>
          <span className="text-natural-100 flex items-center"> | </span>
          <li>
            <Link href="#">
              <div className="flex items-center gap-2">
                <Image
                  src={"/icons/navbar/sparkle.svg"}
                  alt={"sparkle"}
                  width={24}
                  height={24}
                />
                <p> شگفت انگیزها</p>
              </div>
            </Link>
          </li>
          <li>
            <Link href="#">
              <div className="flex items-center gap-2">
                <Image
                  src={"/icons/navbar/trend.svg"}
                  alt={"trend"}
                  width={24}
                  height={24}
                />
                <p>ترند ترین </p>
              </div>
            </Link>
          </li>
          <li>
            <Link href="#">
              <div className="flex items-center gap-2">
                <Image
                  src={"/icons/navbar/cup.svg"}
                  alt={"cup"}
                  width={24}
                  height={24}
                />
                <p>پرفروش ترین</p>
              </div>
            </Link>
          </li>
          <li>
            <Link href="#">
              <div className="flex items-center gap-2">
                <Image
                  src={"/icons/navbar/heart.svg"}
                  alt={"heart"}
                  width={24}
                  height={24}
                />
                <p>محبوب ترین </p>
              </div>
            </Link>
          </li>
          <span className="text-natural-100 flex items-center"> | </span>
          <li>
            <Link href="#">
              <p>سوالات شما</p>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
