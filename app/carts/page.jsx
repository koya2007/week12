"use client";

import { useContext } from "react";
import Image from "next/image";
import { Badge } from "@/components/tailgrids/core/badge";
import { globalDataContext } from "../layout";

export default function CartsPage() {
  const { carts } = useContext(globalDataContext);

  return (
    <div className="mx-auto mt-4 w-[960px] rounded-lg border-2 border-gray-300 bg-cyan-100 p-4">
      <h1 className="mb-4 text-xl font-bold">Carts ({carts.length})</h1>

      {carts.length === 0 ? (
        <p>No products in cart</p>
      ) : (
        <div className="grid grid-cols-5 gap-4">
          {carts.map((product) => (
            <div key={product.id} className="text-center">
              <div className="relative h-[150px] w-[150px]">
                <Image
                  src={product.thumbnailUrl}
                  alt={product.title}
                  fill
                  sizes="150px"
                  className="object-cover"
                />
                <Badge
                  size="sm"
                  className="absolute top-1 right-1 bg-black/70 text-white"
                >
                  ${product.price}
                </Badge>
                <div className="absolute right-0 bottom-0 left-0 bg-black/70 px-1 text-sm text-white line-clamp-2">
                  {product.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}