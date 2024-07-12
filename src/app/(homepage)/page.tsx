import { fetchHomepageObject } from "@/lib/shopify/queries/homepage";
import Banners from "@/components/banner";
import ScrollClientWrapper from "@/components/collection-scroll/container";

export default async function Home() {
  const { banners } = await fetchHomepageObject();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <Banners banners={banners} />
      <Hero />
      <Scrolls />
    </main>
  );
}
function Hero() {
  return (
    <div className="min-h-screen px-layout">
      <div className="hero-content max-w-full p-0 py-0 flex-col text-center">
        <img
          src="https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/h_1659,c_limit/1d1c7f44-d43b-45f9-aa71-eca4fda65141/nike-just-do-it.jpg"
          className="w-full object-fill animate-fade-in"
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

async function Scrolls() {
  const { collectionGroupScrolls, collectionProductScrolls } =
    await fetchHomepageObject();
  const productScrolls = collectionProductScrolls.map((item) => (
    <ScrollClientWrapper
      key={item.handle}
      props={{
        handle: item.handle,
        title: item.title,
        products: [
          ...item.products.edges.map((product) => product.node),
          ...item.products.edges.map((product) => product.node),
        ],
      }}
    />
  ));

  const groupScrolls = collectionGroupScrolls.map((group) => (
    <ScrollClientWrapper
      key={group.name}
      props={{
        title: group.name,
        collections: [...group.items, ...group.items].map((item) => ({
          handle: item.handle,
          title: item.title,
          image: item.image,
        })),
      }}
    />
  ));
  const mergeScrolls: JSX.Element[] = [];
  const maxLength = Math.max(productScrolls.length, groupScrolls.length);

  for (let i = 0; i < maxLength; i++) {
    if (i < productScrolls.length) {
      mergeScrolls.push(productScrolls[i]);
    }
    if (i < groupScrolls.length) {
      mergeScrolls.push(groupScrolls[i]);
    }
  }
  return (
    <div className="w-full flex flex-col">
      {mergeScrolls.map((scroll) => (
        <div className="py-8" key={scroll.key}>
          {scroll}
        </div>
      ))}
    </div>
  );
}
