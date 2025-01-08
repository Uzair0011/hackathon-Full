// "use client";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";

interface IProduct {
  title: string;
  price: number;
  productURL: string;
  image: string[];
}

export default async function AllProducts() {
  const products: IProduct[] = await client.fetch(`
    *[_type == "product"]{
      title, 
      price,
      "productURL": slug.current,
      "image": image[].asset->url
    }
  `);

  return (
    <div className="px-6">
      <div className="w-full h-auto flex flex-wrap gap-4 justify-center">
        {products.map((product) => (
          <div
            key={product.productURL}
            className="w-[250px] flex flex-col items-center border p-4 rounded-lg shadow-md"
          >
            <Link href={`/products/${product.productURL}`}>
              <div className="w-full h-[270px] flex items-center justify-center bg-gray-100 cursor-pointer">
                <Image
                  src={product.image[0]}
                  alt={product.title}
                  width={200}
                  height={200}
                  className="object-contain"
                />
              </div>
            </Link>
            <div className="text-center mt-4">
              <h3 className="text-lg font-medium">{product.title}</h3>
              <p className="text-sm text-gray-500">₹{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
