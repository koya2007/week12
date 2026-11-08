'use client';

import { useContext } from "react";
import { globalDataContext } from "../layout";
import Image from "next/image";
import { buttonStyles } from "@/components/tailgrids/core/button";
import { Product } from "@/data/products";
import { Badge } from "@/components/tailgrids/core/badge";

export default function Page() {
  const { products ,setProducts,setCarts ,carts } = useContext(globalDataContext);


  const addToCart = (product: Product) => {
    console.log(product);
    //remove products from products and add to carts
    const remain =
    setProducts(products.filter((p: Product) => p.id !== product.id));
    
    // append product to carts
    setCarts([...carts, product]);
  
  
  
  };

  return (
    <div className="mx-auto mt-4 h-[600px] w-[960px] overflow-auto rounded-lg border-2 border-gray-300 bg-cyan-100">
      <div className="grid grid-cols-5 gap-4">
        {products.map((product: Product) => (
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
                className="absolute top-1 right-1 bg-black/70 text-white shadow-md"
              >
                ${product.price}
              </Badge>

              <div className="absolute right-0 bottom-0 left-0 bg-black/70 px-1 text-sm text-white line-clamp-2">
                {product.title}
              </div>
            </div>

            <button
              type="button"
              className={`${buttonStyles({ appearance: 'fill', variant: 'primary' })} h-12 w-[150px] rounded-none bg-cyan-300 text-white hover:bg-cyan-400`}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}