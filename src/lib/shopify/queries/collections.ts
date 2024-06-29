import { gql } from "@apollo/client";
import { getClient } from "..";

export const fetchCollectionProducts = async (collectionGids: string[]) => {
  const resp = await getClient().query<{
    nodes: {
      id: string;
      title: string;
      description: string;
      image: {
        altText: string;
        height: number;
        url: string;
        width: number;
      };
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
            image {
              altText
              height
              url
              width
            }
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

  const collectionGroups = resp.data.nodes.map((node) => ({
    name:
      node.fields.find((field) => field.key === "name")?.value || "Untutiled",
    ids: JSON.parse(
      node.fields.find((field) => field.key === "items")?.value || "[]"
    ) as string[],
  }));
  const groups = await Promise.all(
    collectionGroups.map((collectionGroup) => {
      return fetchCollectionProducts(collectionGroup.ids);
    })
  );
  return collectionGroups.map((g, index) => ({
    name: g.name,
    items: groups[index],
  }));
};
