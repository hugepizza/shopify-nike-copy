import { fetchProductItem } from "@/lib/shopify/queries/products";
import { notFound } from "next/navigation";

async function Product({ params }: { params: { slug: string } }) {
  const item = await fetchProductItem(params.slug);
  if (!item) notFound();

  return (
    <>
      <div className="px-layout flex-row w-full">
        <div className="flex flex-row w-1/2 space-x-2">
          <div className="flex flex-col w-[10%] overflow-y-scroll rounded-md">
            {item.images.edges.map((image) => (
              <img
                key={image.node.originalSrc}
                alt={image.node.altText}
                className="w-full aspect-square"
                src={image.node.originalSrc}
              />
            ))}
          </div>
          <div className="grow">
            <img
              className="w-full max-h-96"
              src={item.images.edges[0].node.originalSrc}
              alt={item.images.edges[0].node.altText}
            />
          </div>
        </div>
        <div className="w-1/2"></div>
      </div>
    </>
  );
}

export default Product;
