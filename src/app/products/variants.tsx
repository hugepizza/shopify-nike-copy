"use client";

import { currencyDisplay } from "@/lib/currency";
import { ProductItem } from "@/lib/shopify/queries/products";
import { Dispatch, SetStateAction, use, useState } from "react";

export function Variants({
  item,
  setImage: seSelectedVariantImage,
}: {
  item: ProductItem["productByHandle"];
  setImage: Dispatch<SetStateAction<string | null>>;
}) {
  const optionNames = item.variants.edges[0].node.selectedOptions.map(
    (option) => option.name
  );

  const mainOption = optionNames[0];

  const outer: {
    mainOptionName: string;
    variants: {
      id: string;
      title: string;
      price: {
        amount: string;
        currencyCode: string;
      };
      availableForSale: boolean;
      selectedOptions: {
        name: string;
        value: string;
      }[];
      image?: {
        altText: string;
        originalSrc: string;
      };
    }[];
  }[] = [];

  item.variants.edges
    .map((e) => e.node)
    .forEach((v) => {
      const mainValue = v.selectedOptions.find(
        (o) => o.name === mainOption
      )?.value;
      if (mainValue) {
        const constexisted = outer.find((o) => o.mainOptionName === mainValue);
        const mainOptionFiltered = {
          ...v,
          selectedOptions: v.selectedOptions.filter(
            (o) => o.name !== mainOption
          ),
        };
        if (constexisted) {
          constexisted.variants.push(mainOptionFiltered);
        } else {
          outer.push({
            mainOptionName: mainValue,
            variants: [mainOptionFiltered],
          });
        }
      }
    });

  const [outerIndex, setOuterIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div className="w-full flex flex-col">
      <h3 className="text-2xl">{item.title}</h3>
      {item.description}

      {selected ? (
        currencyDisplay({
          amount: Number(
            item.variants.edges.find((v) => v.node.id === selected)?.node.price
              .amount
          ),
          currencyCode: item.variants.edges.find((v) => v.node.id === selected)
            ?.node.price.currencyCode,
        })
      ) : (
        <>
          {currencyDisplay({
            amount: Number(item.priceRange.minVariantPrice.amount),
            currencyCode: item.priceRange.minVariantPrice.currencyCode,
          })}
          ~
          {currencyDisplay({
            amount: Number(item.priceRange.maxVariantPrice.amount),
            currencyCode: item.priceRange.maxVariantPrice.currencyCode,
          })}
        </>
      )}
      <ul className="menu menu-vertical lg:menu-horizontal bg-base-200 rounded-box">
        {outer.map((variants, index) => (
          <li
            className={`btn ${index === outerIndex ? "btn-active" : ""}`}
            key={variants.mainOptionName}
            onClick={() => {
              setOuterIndex(index);
              setSelected(null);
              seSelectedVariantImage(null);
            }}
          >
            {variants.mainOptionName}
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-2 gap-2 py-2">
        {outer[outerIndex].variants.map((variant) => (
          <div
            key={variant.id}
            className={`col-span-1 btn ${
              variant.availableForSale ? "" : "btn-disabled"
            } ${selected === variant.id ? "btn-active" : ""}`}
            onClick={() => {
              setSelected(variant.id);
              seSelectedVariantImage(variant.image?.originalSrc || null);
            }}
          >
            {variant.selectedOptions[0].value}
          </div>
        ))}
      </div>
    </div>
  );
}
