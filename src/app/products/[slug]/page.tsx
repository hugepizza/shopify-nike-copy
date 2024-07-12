import { fetchProduct } from "@/lib/shopify/queries/products";
import { notFound } from "next/navigation";
import { ProductDisplay } from "../product";

async function Index({ params }: { params: { slug: string } }) {
  const item = await fetchProduct(params.slug);
  if (!item) notFound();
  return <ProductDisplay item={item} />;
}

export default Index;
