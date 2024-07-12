import { gql } from "@apollo/client";
import { getClient } from "..";
import {
  fetchMultiCollectionsByIds,
  fetchMultiCollectionsProductsByIds,
} from "./collections";
import { fetchCollectionGroups } from "./metadata";

export interface FetchHomepageObject {
  metaobject: {
    handle: string;
    fields: {
      key: string;
      value: string;
    }[];
  };
}
export const fetchHomepageObject = async () => {
  try {
    const homePageDate = await getClient().query<FetchHomepageObject>({
      query: gql`
        query {
          metaobject(
            handle: {
              handle: "home-page-nike-copy"
              type: "home_page_collections"
            }
          ) {
            id
            handle
            fields {
              type
              value
              key
              reference {
                ... on Metaobject {
                  type
                  id
                }
              }
            }
          }
        }
      `,
    });
    const collectionGroupIds = homePageDate.data.metaobject.fields
      .filter((field) => field.key === "collection_groups_scrolls")
      .map((field) => JSON.parse(field.value) as string[])
      .flat();

    const detailCollectionIds = homePageDate.data.metaobject.fields
      .filter((field) => field.key === "products_scrolls")
      .map((field) => JSON.parse(field.value) as string[])
      .flat();
    const bannersIds = homePageDate.data.metaobject.fields
      .filter((field) => field.key === "banners")
      .map((field) => JSON.parse(field.value) as string[])
      .flat();

    const collectionGroupScrolls = await fetchCollectionGroups(
      collectionGroupIds
    );
    const collectionProductScrolls = await fetchMultiCollectionsProductsByIds(
      detailCollectionIds
    );

    const banners = await fetchHomepageBannerObject(bannersIds);
    return { collectionGroupScrolls, collectionProductScrolls, banners };
  } catch (error) {
    console.error("Error fetching homepage collections:", error);
    throw error;
  }
};

export const fetchHomepageBannerObject = async (ids: string[]) => {
  try {
    const bannerData = await getClient().query<{
      nodes: {
        id: string;
        fields: {
          key: string;
          value?: string;
        }[];
      }[];
    }>({
      query: gql`
        query ($ids: [ID!]!) {
          nodes(ids: $ids) {
            ... on Metaobject {
              id
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
        ids,
      },
    });
    bannerData.data.nodes.forEach((node) => {
      node.fields.forEach((field) => {});
    });
    const banners = bannerData.data.nodes.map((node) => ({
      id: node.id,
      title: node.fields.find((field) => field.key === "title")!
        .value as string,
      subtitle: node.fields.find((field) => field.key === "subtitle")?.value as
        | string
        | undefined,
      link: node.fields.find((field) => field.key === "link")?.value
        ? (JSON.parse(
            node.fields.find((field) => field.key === "link")!.value!
          ) as {
            text: string;
            url: string;
          })
        : undefined,
    }));

    return banners;
  } catch (error) {
    console.error("Error fetching homepage banners:", error);
    throw error;
  }
};
