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
export const fetchHomepageCollections = async () => {
  try {
    const resp = await getClient().query<FetchHomepageCollections>({
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

    return resp.data;
  } catch (error) {
    console.error("Error fetching homepage collections:", error);
    throw error;
  }
};

export const fetchCollectionProducts = async (collectionGids: string[]) => {
  const resp = await getClient().query<{
    nodes: {
      id: string;
      title: string;
      description: string;
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
    }[];
  }>({
    query: gql`
      query ($ids: [ID!]!) {
        nodes(ids: $ids) {
          ... on Collection {
            id
            title
            description
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
    `,
    variables: {
      ids: collectionGids,
    },
  });

  return resp.data.nodes;
};

export const fetchCollectionGroups = async (collectionGroupIds: string[]) => {
  console.log("collectionGroupIds", collectionGroupIds);

  const resp = await getClient().query<{
    nodes: {
      id: string;
      title: string;
      handle: string;
      fields: {
        type: string;
        value: string;
        key: string;
      }[];
    }[];
  }>({
    query: gql`
      query ($ids: [ID!]!) {
        nodes(ids: $ids) {
          ... on Metaobject {
            fields {
              type
              value
              key
            }
          }
        }
      }
    `,
    variables: {
      ids: collectionGroupIds,
    },
  });

  const collectionGroups = resp.data.nodes.map(
    (node) =>
      JSON.parse(
        node.fields.find((field) => field.key === "items")?.value || "[]"
      ) as string[]
  );
  const groups = await Promise.all(
    collectionGroups.map((collectionGroup) => {
      return fetchCollectionProducts(collectionGroup);
    })
  );
  console.log("xxx", groups);
  return groups;
};
