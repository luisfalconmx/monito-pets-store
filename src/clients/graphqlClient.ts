"use server";

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";
import {
  SHOPIFY_GRAPHQL_ENDPOINT,
  SHOPIFY_GRAPHQL_ACCESS_TOKEN,
} from "@/config/env";

const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      // this needs to be an absolute url, as relative urls cannot be used in SSR
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": SHOPIFY_GRAPHQL_ACCESS_TOKEN,
      },
      uri: SHOPIFY_GRAPHQL_ENDPOINT,
      fetchOptions: {
        cache: "no-store",
      },
      // you can disable result caching here if you want to
      // (this does not work if you are rendering your page with `export const dynamic = "force-static"`)
      // fetchOptions: { cache: "no-store" },
    }),
  });
});

export { getClient };
