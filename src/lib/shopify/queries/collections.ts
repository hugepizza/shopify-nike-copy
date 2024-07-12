import { gql } from "@apollo/client";
import { getClient } from "..";
import seoFragment from "../fragments/seo";
import { productFragment } from "./products";
import { Collection, CollectionProducts, Edge, Nodes } from "../types/types";
import imageFragment from "../fragments/image";

const collectionFragment = gql`
  fragment collection on Collection {
    handle
    title
    description
    image {
      ...image
    }
    seo {
      ...seo
    }
    updatedAt
  }
  ${seoFragment}
  ${imageFragment}
`;

export const getCollectionQuery = gql`
  query getCollection($handle: String!) {
    collection(handle: $handle) {
      ...collection
    }
  }
  ${collectionFragment}
`;

export const getMultiCollectionsProductsByIdsQuery = gql`
  query getCollectionsProductsByCollectionIds($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Collection {
        ...collection
        products(first: 5) {
          edges {
            node {
              ...product
            }
          }
        }
      }
    }
  }
  ${collectionFragment}
  ${productFragment}
`;

export const getMultiCollectionsByIdsQuery = gql`
  query getCollectionsProductsByCollectionIds($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Collection {
        ...collection
      }
    }
  }
  ${collectionFragment}
`;

const fetchCollectionByHandle = async (handle: string) => {
  const resp = await getClient().query<Collection | undefined>({
    query: getCollectionQuery,
    variables: { handle },
  });
  return resp.data;
};

const fetchCollectionProductsByHandle = async (handle: string) => {
  const resp = await getClient().query<Collection | undefined>({
    query: getCollectionQuery,
    variables: { handle },
  });
  return resp.data;
};

export const fetchMultiCollectionsProductsByIds = async (
  collectionGids: string[]
) => {
  const resp = await getClient().query<Nodes<CollectionProducts>>({
    query: getMultiCollectionsProductsByIdsQuery,
    variables: {
      ids: collectionGids,
    },
  });
  console.log(resp.data);

  return resp.data.nodes;
};
export const fetchMultiCollectionsByIds = async (collectionGids: string[]) => {
  const resp = await getClient().query<Nodes<Collection>>({
    query: getMultiCollectionsByIdsQuery,
    variables: {
      ids: collectionGids,
    },
  });

  return resp.data.nodes;
};
