import { gql } from "@apollo/client";
import { getClient } from "..";
import seoFragment from "../fragments/seo";
import imageFragment from "../fragments/image";
import { Product } from "../types/types";
export const productFragment = gql`
  fragment product on Product {
    id
    handle
    availableForSale
    title
    description
    descriptionHtml
    options {
      id
      name
      values
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
        }
      }
    }
    featuredImage {
      ...image
    }
    images(first: 20) {
      edges {
        node {
          ...image
        }
      }
    }
    seo {
      ...seo
    }
    tags
    updatedAt
  }
  ${imageFragment}
  ${seoFragment}
`;

export const getProductQuery = gql`
  query getProduct($handle: String!) {
    product(handle: $handle) {
      ...product
    }
  }
  ${productFragment}
`;

export const fetchProduct = async (slug: string) => {
  try {
    const resp = await getClient().query<{ product: Product } | undefined>({
      query: getProductQuery,
      variables: { handle: slug },
    });
    return resp.data?.product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
