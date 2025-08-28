import Link from "next/link";
import Image from "next/image";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { useProductStore } from "@/app/store/productStore";
import { useEffect } from "react";

export default function Navbar() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { categories, fetchData, loading, error } = useProductStore();

  useEffect(() => {
    if (isOpen && categories.length === 0) {
      fetchData();
    }
  }, [isOpen, categories.length, fetchData]);

  return (
    <nav className="bg-white shadow-sm border-b" dir="rtl">
      <div className="flex items-center justify-between px-6 py-2">
        <ul className="flex items-center gap-6 text-gray-700">
          <li>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onOpen();
              }}
            >
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
      <Drawer
        dir="rtl"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="py-7 top-2 bottom-2 w-2xs text-natural-900"
      >
        <DrawerContent>
          <DrawerHeader className="flex flex-col gap-1">
            دسته بندی‌ها
          </DrawerHeader>
          <DrawerBody>
            {loading && <p>در حال بارگذاری...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && !error && categories.length > 0 && (
              <ul className="space-y-3">
                {categories.map((cat) => (
                  <li key={cat._id}>
                    <Link
                      href={`/products/category/${cat._id}`}
                      className="block px-2 py-1 hover:bg-primary-100 hover:text-primary rounded"
                      onClick={onClose}
                    >
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </DrawerBody>
          <DrawerFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
              بستن
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </nav>
  );
}
