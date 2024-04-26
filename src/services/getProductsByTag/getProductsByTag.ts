import {
  GetProductsByTagQuery,
  GetProductsByTagQueryVariables,
  GetProductsByTagDocument,
} from "@/generated/shopify.schema";
import { getClient } from "@/clients/graphqlClient";

export const getProductsByTag = async (tag: string) => {
  try {
    const client = getClient();
    const response = await client.query<
      GetProductsByTagQuery,
      GetProductsByTagQueryVariables
    >({
      query: GetProductsByTagDocument,
      variables: {
        tag: `tag:${tag}`,
      },
    });

    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};
