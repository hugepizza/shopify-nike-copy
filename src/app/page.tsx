import { fetchHomepageCollections } from "@/lib/shopify/queries/collections";
import { CollectionProductScroll } from "@/components/collection-scroll/product";
import { fetchHomepageObject } from "@/lib/shopify/queries/homepage";
import { log } from "console";
import { randomUUID } from "crypto";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <Hero />
      <Collections />
    </main>
  );
}
function Hero() {
  return (
    <div className="min-h-screen px-12">
      <div className="hero-content max-w-full p-0 py-2 flex-col text-center">
        <img
          src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_1659,c_limit/1d1c7f44-d43b-45f9-aa71-eca4fda65141/nike-just-do-it.jpg"
          className="w-full object-fill"
        />
        <div className="flex flex-col items-center">
          <p className="py-2">Nike Pegasus 41</p>
          <h1 className="text-7xl font-bold">{"DON'T WASTE YOUR ENERGY"}</h1>
          <p className="py-6">
            Run in Pegasus. Feel the responsive energy return of Air Zoom and
            all-new ReactX foam.
          </p>
          <button className="btn btn-sm h-8 btn-primary rounded-full">
            Shop
          </button>
        </div>
      </div>
    </div>
  );
}

async function Collections() {
  const { collectionGroupScrolls, collectionProductScrolls } =
    await fetchHomepageObject();
  const productScrolls = collectionProductScrolls.map((collection) => (
    <CollectionProductScroll
      key={collection.id}
      props={{
        id: collection.id,
        title: collection.title,
        products: collection.products.edges.map((product) => product.node),
      }}
    />
  ));

  const groupScrolls = collectionGroupScrolls.map((group) => (
    <div key={randomUUID()} className="flex flex-row">
      {group.map((collection) => (
        <div key={collection.id} className="flex flex-row">
          {collection.title}
        </div>
      ))}
    </div>
  ));
  return (
    <>
      {productScrolls} {groupScrolls}
    </>
  );
}
