import currency from "currency.js";

import { forwardRef } from "react";
import Link from "next/link";
import { currencyDisplay } from "@/lib/currency";
export interface CollectionProductScrollProps {
  id: string;
  title: string;
  products: {
    id: string;
    title: string;
    handle: string;
    description: string;
    featuredImage: {
      altText: string;
      height: number;
      url: string;
      width: number;
    };
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
  }[];
}

// eslint-disable-next-line react/display-name
export const CollectionProductScrollZ = forwardRef<
  React.ElementRef<"div">,
  CollectionProductScrollProps
>((props, ref) => {
  return (
    <div className="max-w-full" key={props.id}>
      <div
        className="flex flex-row overflow-x-scroll gap-4 px-layout snap-x snap-mandatory"
        ref={ref}
      >
        {props.products.map((product) => (
          <div
            key={product.id}
            className={`min-w-scroll-w snap-start scroll-mx-layout mb-8`}
          >
            <Link href={`/products/${product.handle}`}>
              <img
                className="object-cover w-full h-[400px]"
                src={product.featuredImage.url}
                alt={product.title}
              />
            </Link>
            <div className="py-1">
              <p className="font-medium">{product.title}</p>
              <p className="text-primary/50 pb-1">
                {product.description ? (
                  <text>{product.description}</text>
                ) : (
                  <text>&nbsp;</text>
                )}
              </p>
              <p className="font-medium">
                {currencyDisplay({
                  amount: Number(product.priceRange.minVariantPrice.amount),
                  currencyCode: product.priceRange.minVariantPrice.currencyCode,
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
