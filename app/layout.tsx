"use client";
import "./globals.css";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { buttonStyles } from "@/components/tailgrids/core/button";
import { fetchProduts, Product } from "@/data/products";
import { createContext, useEffect, useState } from "react";
import { Badge } from "@/components/tailgrids/core/badge";
import { doLogout } from "@/utils/login";
import { Button } from '@/components/tailgrids/core/button'

export const globalDataContext = createContext<any>(null);

export default function RootLayout({ children }: LayoutProps<"/">) {
  const pathname = usePathname();
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [carts, setCarts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProduts()
      .then((data) => setProducts(data as Product[]))
      .catch((error) => setProducts([] as Product[]));
  }, []);
  useEffect(() => {
    console.log(products);
  }, [products]);



const handleLogout = () => {
  doLogout(router, "/login");


}

  return (
    <html>
      <body>
        <globalDataContext.Provider
          value={{ products, setProducts, carts, setCarts }}
        >
          <Header />
          <nav className="flex justify-center gap-4 mt-4">
            <Link
              href="/"
              className={buttonStyles({
                appearance: pathname === '/' ? 'fill' : 'outline',
                variant: 'primary',
                size: 'sm',
                className: 'rounded-full',
              })}
            >
              Home
            </Link>


            <Link
              href="/animation"
              className={buttonStyles({
                appearance: pathname === '/animation' ? 'fill' : 'outline',
                variant: 'primary',
                size: 'sm',
                className: 'rounded-full',
              })}
            >
              Animation
            </Link>


            <Link
              href="/calculator"
              className={buttonStyles({
                appearance: pathname === '/calculator' ? 'fill' : 'outline',
                variant: 'primary',
                size: 'sm',
                className: 'rounded-full',
              })}
            >
              Calculator
            </Link>

            <Link
              href="/todos"
              className={buttonStyles({
                appearance: pathname === '/todos' ? 'fill' : 'outline',
                variant: 'primary',
                size: 'sm',
                className: 'rounded-full',
              })}
            >
              Todos
            </Link>

             <Link
              href="/products"
              className={buttonStyles({
                appearance: pathname === '/products' ? 'fill' : 'outline',
                variant: 'primary',
                size: 'sm',
                className: 'rounded-full',
              })}
            >
              Products({products.length})
            </Link>

            <div className="relative inline-block">
             <Link
              href="/carts"
              className={buttonStyles({
                appearance: pathname === '/carts' ? 'fill' : 'outline',
                variant: 'primary',
                size: 'sm',
                className: 'rounded-full',
              })}
            >
              Carts
            </Link>
            <Badge
              size="sm"
              className="absolute -top-2 -right-2 bg-red-500 text-white"
            >
              {carts.length}
            </Badge>
          </div>

          <Button
            appearance="outline"
            variant="danger"
            size="sm"
            className="ml-1"
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
          
          </nav>
          <main>{children}</main>
          <Footer />
        </globalDataContext.Provider>
      </body>
    </html>
  );
}
