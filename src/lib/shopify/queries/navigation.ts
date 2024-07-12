import { gql } from "@apollo/client";
import { getClient } from "..";
import { Menu } from "../types/types";

const getNavigationQuery = gql`
  query getNavigation {
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
    const resp = await getClient().query<Menu>({
      query: getNavigationQuery,
    });
    return resp.data;
  } catch (error) {
    console.error("Error fetching navigation:", error);
    throw error;
  }
};
