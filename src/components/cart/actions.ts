import {
  addToCart,
  addToCartMutation,
  createCart,
} from "@/lib/shopify/mutations/cart";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function add({
  merchandiseId,
  quantity,
}: {
  merchandiseId: string;
  quantity: number;
}) {
  const cartId = cookies().get("cartId")?.value;
  const newCartId = await createCart();
  try {
    await addToCart(newCartId, [{ merchandiseId, quantity }]);
    revalidateTag("cart");
  } catch (e) {}
}
