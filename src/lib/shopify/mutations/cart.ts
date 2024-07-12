import { getClient } from "..";
import cartFragment from "../fragments/cart";
import { gql } from "@apollo/client";
import { Cart } from "../types/types";
import { getCartQuery } from "../queries/cart";

export const addToCartMutation = gql`
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const createCartMutation = gql`
  mutation createCart($lineItems: [CartLineInput!]) {
    cartCreate(input: { lines: $lineItems }) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const editCartItemsMutation = gql`
  mutation editCartItems($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export const removeFromCartMutation = gql`
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...cart
      }
    }
  }
  ${cartFragment}
`;

export async function createCart() {
  const res = await getClient().query<{ data: { cartCreate: Cart } }>({
    query: createCartMutation,
  });

  return res.data.data.cartCreate.id;
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
) {
  const res = await getClient().query({
    query: addToCartMutation,
    variables: {
      cartId,
      lines,
    },
  });
}
export async function getCart(cartId: string): Promise<Cart | undefined> {
  const res = await getClient().query<{ data: { cart: Cart } }>({
    query: getCartQuery,
    variables: { cartId },
  });

  if (!res.data.data.cart) {
    return undefined;
  }

  return res.data.data.cart;
}

// export async function removeFromCart(
//   cartId: string,
//   lineIds: string[]
// ): Promise<Cart> {
//   const res = await getClient().query<ShopifyRemoveFromCartOperation>({
//     query: removeFromCartMutation,
//     variables: {
//       cartId,
//       lineIds,
//     },
//   });

//   return reshapeCart(res.body.data.cartLinesRemove.cart);
// }

// export async function updateCart(
//   cartId: string,
//   lines: { id: string; merchandiseId: string; quantity: number }[]
// ): Promise<Cart> {
//   const res = await getClient().query<ShopifyUpdateCartOperation>({
//     query: editCartItemsMutation,
//     variables: {
//       cartId,
//       lines,
//     },
//   });

//   return reshapeCart(res.body.data.cartLinesUpdate.cart);
// }
