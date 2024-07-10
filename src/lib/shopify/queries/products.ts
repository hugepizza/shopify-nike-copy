import { gql } from "@apollo/client";
import { getClient } from "..";

export interface ProductItem {
  productByHandle: {
    id: string;
    title: string;
    description: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
        currencyCode: string;
      };
      maxVariantPrice: {
        amount: string;
        currencyCode: string;
      };
    };
    images: {
      edges: {
        node: {
          originalSrc: string;
          altText: string;
        };
      }[];
    };
    variants: {
      edges: {
        node: {
          id: string;
          title: string;
          price: string;
          availableForSale: boolean;
        };
      }[];
    };
  };
}
const PRODUCT_ITEM_QUERY = gql`
  query getProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      description
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      images(first: 5) {
        edges {
          node {
            originalSrc
            altText
          }
        }
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            price {
              amount
              currencyCode
            }
            availableForSale
          }
        }
      }
    }
  }
`;

export const fetchProductItem = async (slug: string) => {
  try {
    const resp = await getClient().query<ProductItem | undefined>({
      query: PRODUCT_ITEM_QUERY,
      variables: { handle: slug },
    });
    console.log("slug", slug);

    return resp.data?.productByHandle || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
