import { createStorefrontClient } from "@shopify/hydrogen-react";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const storeClient = createStorefrontClient({
  storeDomain: process.env.NEXT_PUBLIC_STORE_DOMAIN,
  publicStorefrontToken: process.env.NEXT_PUBLIC_STOREFRONT_API_TOKEN,
  privateStorefrontToken: process.env.STOREFRONT_API_TOKEN,
  storefrontApiVersion: "2024-04",
});

export const serverClient = new ApolloClient({
  uri: storeClient.getStorefrontApiUrl(),
  headers: storeClient.getPrivateTokenHeaders(),
  cache: new InMemoryCache({}),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});

export const clientClient = new ApolloClient({
  uri: storeClient.getStorefrontApiUrl(),
  headers: storeClient.getPrivateTokenHeaders(),
  cache: new InMemoryCache({}),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});

export const getClient = (env: "server" | "client") => {
  return env === "server" ? serverClient : clientClient;
};
