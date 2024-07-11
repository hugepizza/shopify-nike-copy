"use client";

import { ProductItem } from "@/lib/shopify/queries/products";
import { Gallery } from "./gallery";
import { Variants } from "./variants";
import { useState } from "react";

export function Product({ item }: { item: ProductItem["productByHandle"] }) {
  const [selectedVariantImage, seSelectedVariantImage] = useState<
    string | null
  >(null);
  return (
    <div className="px-layout flex flex-row w-full pt-28 h-screen">
      <Gallery
        images={item.images.edges.map((image) => image.node)}
        refSeleted={selectedVariantImage}
      />
      <div className="grow pl-24 pr-36 flex flex-col">
        <Variants item={item} setImage={seSelectedVariantImage} />
        <Actions item={item} />
      </div>
    </div>
  );
}

function Actions({ item }: { item: ProductItem["productByHandle"] }) {
  return (
    <div className="w-full space-y-4">
      <button className="btn btn-block rounded-full hover:bg-opacity-80 btn-accent">
        Add to Bag
      </button>
      <button className="btn btn-block btn-outline rounded-full border-accent border-opacity-50 hover:border-opacity-100 hover:bg-white hover:text-black">
        Favorite
      </button>
    </div>
  );
}
