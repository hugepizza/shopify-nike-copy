"use client";

import { useRef } from "react";
import {
  CollectionProductScrollProps,
  CollectionProductScrollZ,
} from "./product";
import { CollectionGroupScrollZ, CollectionGroupScrollProps } from "./group";

function ScrollClientWrapper({
  props,
}: {
  props: CollectionProductScrollProps | CollectionGroupScrollProps;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="w-full flex flex-row justify-between px-layout">
        <div>
          <h3 className="text-2xl mb-6">{props.title}</h3>
        </div>
        <div className="space-x-3">
          <button
            className="btn btn-circle"
            onClick={() => {
              console.log(ref.current?.querySelector("div")?.clientWidth);
              ref.current?.scrollBy({
                left:
                  (ref.current?.querySelector("div")?.clientWidth || 0) * -1,
                behavior: "smooth",
              });
            }}
          >
            {"<-"}
          </button>
          <button
            className="btn btn-circle"
            onClick={() => {
              ref.current?.scrollBy({
                left: ref.current?.querySelector("div")?.clientWidth || 0,
                behavior: "smooth",
              });
            }}
          >
            {"->"}
          </button>
        </div>
      </div>
      {"products" in props ? (
        <CollectionProductScrollZ {...props} ref={ref} />
      ) : "collections" in props ? (
        <CollectionGroupScrollZ {...props} ref={ref} />
      ) : (
        <>1</>
      )}
    </>
  );
}

export default ScrollClientWrapper;
