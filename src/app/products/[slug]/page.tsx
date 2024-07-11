import { fetchProductItem, ProductItem } from "@/lib/shopify/queries/products";
import { notFound } from "next/navigation";
import { Product } from "../product";

async function Index({ params }: { params: { slug: string } }) {
  const item = await fetchProductItem(params.slug);
  if (!item) notFound();
  return <Product item={item} />;
}

export default Index;
