import currency from "currency.js";
import currencySymbolMap from "currency-symbol-map";
import { forwardRef } from "react";
export interface CollectionProductScrollProps {
  id: string;
  title: string;
  products: {
    id: string;
    title: string;
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
        className="flex flex-row overflow-x-scroll gap-4 snap-x snap-mandatory"
        ref={ref}
      >
        {props.products.map((product, index) => (
          <div
            key={product.id}
            className={`min-w-scroll-w snap-start scroll-mx-layout mb-8 ${
              index === 0 && "ml-layout"
            } ${index === props.products.length - 1 && "mr-layout"}`}
          >
            <img
              className="object-cover w-full h-[400px]"
              src={product.featuredImage.url}
              alt={product.title}
            />
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
                {currency(product.priceRange.minVariantPrice.amount).format({
                  precision: 2,
                  symbol: currencySymbolMap(
                    product.priceRange.minVariantPrice.currencyCode
                  ),
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
