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
    <div className="w-full">
      <div
        ref={ref}
        className="flex flex-row gap-4 overflow-x-scroll snap-x snap-mandatory"
      >
        {props.collections.map((collection, index) => (
          <div
            key={collection.id}
            className={`min-w-scroll-w snap-start scroll-mx-layout mb-8 ${
              index === 0 && "ml-layout"
            } ${index === props.collections.length - 1 && "mr-layout"}`}
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
