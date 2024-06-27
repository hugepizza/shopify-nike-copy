import { gql } from "@apollo/client";
import { getClient } from "..";

export interface FetchHomepageCollections {
  collections: {
    edges: {
      node: {
        id: string;
        title: string;
        products: {
          edges: {
            node: {
              id: string;
              title: string;
              description: string;
              featuredImage: {
                altText: string;
                height: number;
                url: string;
                width: number;
              };
              priceRange: {
                minVariantPrice: {
                  amount: string;
                  currencyCode: string;
                };
              };
            };
          }[];
        };
      };
    }[];
  };
}
export const fetchHomepageCollections = async (
  env: "server" | "client" = "server"
) => {
  try {
    const resp = await getClient(env).query<FetchHomepageCollections>({
      query: gql`
        query {
          collections(first: 2) {
            edges {
              node {
                id
                title
                products(first: 5) {
                  edges {
                    node {
                      id
                      title
                      description
                      featuredImage {
                        altText
                        height
                        url
                        width
                      }
                      priceRange {
                        minVariantPrice {
                          amount
                          currencyCode
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
    });
    console.log(JSON.stringify(resp.data, null, 2));

    console.log("resp", resp.data.collections);
    return resp.data;
  } catch (error) {
    console.error("Error fetching homepage collections:", error);
    throw error;
  }
};
