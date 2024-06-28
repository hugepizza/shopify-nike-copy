import { gql } from "@apollo/client";
import { getClient } from "..";

export interface FetchNavigation {
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
}
const GET_NAVIGATION_QUERY = gql`
  query {
    menu(handle: "main-menu") {
      title
      items {
        id
        title
        type
        resource
        resourceId
        items {
          id
          title
          type
          resource
          resourceId
          items {
            id
            title
            type
            resource
            resourceId
          }
        }
      }
    }
  }
`;

export const fetchNavigation = async () => {
  try {
    const resp = await getClient().query<FetchNavigation>({
      query: GET_NAVIGATION_QUERY,
    });
    return resp.data;
  } catch (error) {
    console.error("Error fetching navigation:", error);
    throw error;
  }
};
