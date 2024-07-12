import { gql } from "@apollo/client";
import { getClient } from "..";
import {
  fetchMultiCollectionsByIds,
  fetchMultiCollectionsProductsByIds,
} from "./collections";

const fetchCollectionGroupsQuery = gql`
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
`;
// CollectionGroup is a metadata object
export const fetchCollectionGroups = async (collectionGroupIds: string[]) => {
  const resp = await getClient().query<{
    nodes: Array<{
      id: string;
      title: string;
      handle: string;
      fields: {
        type: string;
        value: string;
        key: string;
      }[];
    }>;
  }>({
    query: fetchCollectionGroupsQuery,
    variables: {
      ids: collectionGroupIds,
    },
  });

  const collectionGroups = resp.data.nodes.map((node) => ({
    name:
      node.fields.find((field) => field.key === "name")?.value || "Untitled",
    ids: JSON.parse(
      node.fields.find((field) => field.key === "items")?.value || "[]"
    ) as string[],
  }));
  const groups = await Promise.all(
    collectionGroups.map((collectionGroup) => {
      return fetchMultiCollectionsByIds(collectionGroup.ids);
    })
  );
  return collectionGroups.map((g, index) => ({
    name: g.name,
    items: groups[index],
  }));
};
