"use client";

import { useEffect, useState } from "react";

export function Gallery({
  images,
  refSeleted,
}: {
  images: { originalSrc: string; altText: string }[];
  refSeleted: string | null;
}) {
  const [imageIndex, setImageIndex] = useState(0);
  useEffect(() => {
    setImageIndex(
      images.findIndex((image) => image.originalSrc === refSeleted) === -1
        ? 0
        : images.findIndex((image) => image.originalSrc === refSeleted)
    );
  }, [images, refSeleted]);
  return (
    <div className="flex flex-row pl-24 w-[55%] space-x-4 h-[576px]">
      <div className="flex flex-col max-w-[10%] overflow-y-scroll rounded-sm space-y-2">
        {images.map((image, index) => (
          <div
            key={image.originalSrc}
            className="w-full aspect-square relative rounded-sm overflow-hidden"
            onMouseEnter={() => setImageIndex(index)}
          >
            <img
              alt={image.altText}
              className={`w-full h-full`}
              src={image.originalSrc}
            />
            {imageIndex === index && (
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            )}
          </div>
        ))}
      </div>
      <div className="w-full relative">
        <img
          className="w-full h-full rounded-lg"
          src={images[imageIndex].originalSrc}
          alt={images[imageIndex].altText}
        />
        <div className="absolute bottom-4 right-4 space-x-2">
          <button
            className="btn btn-sm btn-circle"
            onClick={() => {
              setImageIndex((imageIndex + 1) % images.length);
            }}
          >
            {"<-"}
          </button>
          <button
            className="btn btn-sm btn-circle"
            onClick={() => {
              setImageIndex((imageIndex - 1 + images.length) % images.length);
            }}
          >
            {"->"}
          </button>
        </div>
      </div>
    </div>
  );
}
