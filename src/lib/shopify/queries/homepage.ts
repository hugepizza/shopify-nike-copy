import { gql } from "@apollo/client";
import { getClient } from "..";
import { fetchCollectionProducts, fetchCollectionGroups } from "./collections";

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
              handle: "home-page-collections-nike-copy"
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
    console.log("collectionGroupIds", collectionGroupIds);
    const detailCollectionIds = homePageDate.data.metaobject.fields
      .filter((field) => field.key === "products_scrolls")
      .map((field) => JSON.parse(field.value) as string[])
      .flat();

    const collectionGroupScrolls = await fetchCollectionGroups(
        collectionGroupIds
    );
    const collectionProductScrolls = await fetchCollectionProducts(
      detailCollectionIds
    );
    return { collectionGroupScrolls, collectionProductScrolls };
  } catch (error) {
    console.error("Error fetching homepage collections:", error);
    throw error;
  }
};
