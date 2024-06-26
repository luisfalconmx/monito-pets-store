import {
  GetProductsByCollectionQuery,
  GetProductsByCollectionQueryVariables,
  GetProductsByCollectionDocument,
} from "@/generated/shopify.schema";
import { getClient } from "@/clients/graphqlClient";

export const getProductsByCollection = async (
  collectionName: string,
  first: number,
  after?: string
) => {
  try {
    const client = getClient();
    const response = await client.query<
      GetProductsByCollectionQuery,
      GetProductsByCollectionQueryVariables
    >({
      query: GetProductsByCollectionDocument,
      variables: {
        handle: collectionName,
        first,
        after,
      },
    });

    const data = response.data;
    return data;
  } catch (error) {
    console.error(error);
  }
};
