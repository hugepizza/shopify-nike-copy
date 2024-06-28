import { createStorefrontClient } from "@shopify/hydrogen-react";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";

const storeClient = createStorefrontClient({
  storeDomain: process.env.NEXT_PUBLIC_STORE_DOMAIN,
  publicStorefrontToken: process.env.NEXT_PUBLIC_STOREFRONT_API_TOKEN,
  privateStorefrontToken: process.env.STOREFRONT_API_TOKEN,
  storefrontApiVersion: "2024-04",
});
console.log(storeClient.getStorefrontApiUrl());

const httpLink = new HttpLink({
  uri: storeClient.getStorefrontApiUrl(),
  fetch: function (uri, options) {
    return fetch(uri, {
      ...(options ?? {}),
      headers: {
        ...(options?.headers ?? {}),
        ...storeClient.getPublicTokenHeaders(),
      },
      next: {
        revalidate: 0,
      },
    });
  },
});

const serverHttpLink = new HttpLink({
  uri: storeClient.getStorefrontApiUrl(),
  fetch: function (uri, options) {
    return fetch(uri, {
      ...(options ?? {}),
      headers: {
        ...(options?.headers ?? {}),
        ...storeClient.getPrivateTokenHeaders(),
      },
      next: {
        revalidate: 0,
      },
    });
  },
});

export const serverClient = new ApolloClient({
  link: ApolloLink.from([serverHttpLink]),
  cache: new InMemoryCache({}),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});

export const clientClient = new ApolloClient({
  link: ApolloLink.from([httpLink]),
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

export const getClient = () => {
  return typeof window === undefined ? serverClient : clientClient;
};
