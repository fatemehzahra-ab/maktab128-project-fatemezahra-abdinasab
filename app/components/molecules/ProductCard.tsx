"use client";

import { Card, CardBody, CardHeader, Button } from "@heroui/react";
import Image from "next/image";
import { Product } from "@/types/products";
import { getFullImageUrl } from "@/app/utils/url";
import Link from "next/link";
import AddToCartButton from "../modals/CartButton";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product._id}`}>
      <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md cursor-pointer">
        <CardBody className="p-6 text-natural-900">
          <div className="aspect-square bg-muted rounded-xl mb-6 overflow-hidden">
            <Image
              src={getFullImageUrl(product.thumbnail)}
              alt={product.name}
              width={280}
              height={280}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <CardHeader className="font-semibold mb-3 text-base">
            {product.name}
          </CardHeader>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-bold">
              {product.price.toLocaleString("fa-IR")} تومان
            </span>
          </div>

          <AddToCartButton
            id={product._id ?? ""}
            name={product.name}
            price={product.price}
            thumbnail={product.thumbnail}
          />
        </CardBody>
      </Card>
    </Link>
  );
}
