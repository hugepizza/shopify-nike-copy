interface CollectionGroupScrollProps {
  name: string;
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
export async function CollectionGroupScroll({
  props,
}: {
  props: CollectionGroupScrollProps;
}) {
  return (
    <>
      <div className="w-full " key={props.name}>
        <h3 className="text-2xl mb-6 pl-12">{props.name}</h3>
        <div className="flex flex-row gap-4 overflow-x-scroll snap-x">
          {[
            ...props.collections,
            ...props.collections,
            ...props.collections,
            ...props.collections,
            ...props.collections,
            ...props.collections,
            ...props.collections,
          ].map((collection, index) => (
            <div
              key={collection.id}
              className={`snap-start scroll-mx-12 min-w-scroll-w ${
                index === 0 && "pl-12"
              }`}
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
    </>
  );
}
