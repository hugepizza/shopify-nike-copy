import { forwardRef } from "react";

export interface CollectionGroupScrollProps {
  title: string;
  collections: {
    id: string;
    title: string;
    image?: {
      altText: string;
      height: number;
      url?: string;
      width: number;
    };
  }[];
}
// eslint-disable-next-line react/display-name
export const CollectionGroupScrollZ = forwardRef<
  React.ElementRef<"div">,
  CollectionGroupScrollProps
>((props, ref) => {
  return (
    <div className="max-w-full">
      <div
        className="flex flex-row overflow-x-scroll gap-4 px-layout snap-x snap-mandatory"
        ref={ref}
      >
        {props.collections.map((collection, index) => (
          <div
            key={collection.id}
            className={`min-w-scroll-w snap-start scroll-mx-layout mb-8`}
          >
            <img
              className="object-cover h-[460px]"
              src={collection.image?.url}
              alt={collection.title}
            />
            <div className="pt-6 text-xl">
              <p className="">{collection.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
