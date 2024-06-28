import currency from "currency.js";
import currencySymbolMap from "currency-symbol-map";
interface CollectionProductScrollProps {
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
export async function CollectionProductScroll({
  props,
}: {
  props: CollectionProductScrollProps;
}) {
  return (
    <>
      <div className="w-full px-12" key={props.id}>
        <h3 className="text-2xl mb-6">{props.title}</h3>
        <div className="flex flex-row gap-4 overflow-x-auto snap-x">
          {[
            ...props.products,
            ...props.products,
            ...props.products,
            ...props.products,
            ...props.products,
            ...props.products,
            ...props.products,
          ].map((product) => (
            <div key={product.id} className="snap-center">
              <img
                className="object-cover min-w-[400px] h-[400px]"
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
    </>
  );
}
