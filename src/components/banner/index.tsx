"use client";

import { useEffect, useRef, useState } from "react";

function Banners({
  banners,
}: {
  banners: {
    id: string;
    title: string;
    subtitle?: string;
    link?: {
      text: string;
      url: string;
    };
  }[];
}) {
  const container = useRef<HTMLDivElement>(null);
  const [_, setActive] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (container.current) {
        container.current?.scrollBy({ left: 1, behavior: "smooth" });
        setActive((prev) => {
          if (prev + 1 === banners.length) {
            container.current!.scrollLeft = 0;
          }
          return (prev + 1) % banners.length;
        });
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [banners.length]);
  return (
    <div className="carousel w-full" ref={container}>
      {banners.map((banner) => (
        <div
          className="carousel-item bg-stone-100 min-w-full flex flex-col justify-center items-center pt-2 pb-1"
          key={banner.id}
        >
          <p>{banner.title}</p>
          <p className="text-xs text-primary/70">{banner.subtitle}</p>
          <a className="text-xs font-medium underline pt-1">
            {banner.link?.text}
          </a>
        </div>
      ))}
    </div>
  );
}

export default Banners;
