export type Nodes<T> = {
  nodes: Array<T>;
};
export type Edge<T> = {
  node: T;
};
export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Money = {
  amount: string;
  currencyCode: string;
};
export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};
export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};
export type CartItem = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: Product;
  };
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: Connection<CartItem>;
  totalQuantity: number;
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
};

export type SEO = {
  title: string;
  description: string;
};

export type Collection = {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  updatedAt: string;
  image?: Image;
};

export type Product = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  variants: Connection<ProductVariant>;
  featuredImage: Image;
  images: Connection<Image>;
  seo: SEO;
  tags: string[];
  updatedAt: string;
};

export type CollectionProducts = Collection & {
  products: Connection<Product>;
};

export type Menu = {
  menu: {
    title: string;
    items: {
      id: string;
      title: string;
      type: string;
      resource: string;
      resourceId: string;
      items: {
        id: string;
        title: string;
        type: string;
        resource: string;
        resourceId: string;
        items: {
          id: string;
          title: string;
          type: string;
          resource: string;
          resourceId: string;
        }[];
      }[];
    }[];
  };
};
