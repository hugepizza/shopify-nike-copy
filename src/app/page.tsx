import { fetchHomepageCollections } from "@/lib/shopify/queries/collections";
import currency from "currency.js";
import currencySymbolMap from "currency-symbol-map";

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
  const collections = await fetchHomepageCollections("server");

  return (
    <>
      {collections.collections.edges.map((collection) => (
        <div className="w-full px-12" key={collection.node.id}>
          <p>{collection.node.title}</p>
          <div className="grid grid-cols-4 gap-4">
            {collection.node.products.edges.map((product) => (
              <div key={product.node.id} className="col-span-1">
                <img
                  className="w-full object-cover w-48 h-96"
                  src={product.node.featuredImage.url}
                  alt={product.node.title}
                />
                <p>{product.node.title}</p>
                <p>{product.node.description}</p>
                <p>
                  {currency(
                    product.node.priceRange.minVariantPrice.amount
                  ).format({
                    precision: 2,
                    symbol: currencySymbolMap(
                      product.node.priceRange.minVariantPrice.currencyCode
                    ),
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
