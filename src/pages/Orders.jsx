import { redirect, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { customFetch } from "../utils";
import {
  ComplexPaginationContainer,
  SectionTitle,
  OrderList,
} from "../components";
import { removeUser } from "../features/user/userSlice";
import { clearCart } from "../features/cart/cartSlice";

export const loader =
  (store) =>
  async ({ request }) => {
    const user = store.getState().userState.user;
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);

    if (!user) {
      toast.warn("You must be logged in to checkout!");
      return redirect("/login");
    }
    console.log(params);
    try {
      const response = await customFetch.get("/orders", {
        params,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(response);
      return { orders: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        "There was an error placing your order";

      toast.error(errorMessage);
      // if (error.response.status === 401 || 403) {
      if (error.response.status === 401) {
        store.dispatch(removeUser());
        store.dispatch(clearCart());
        return redirect("/login");
      }
      return null;
    }
  };
const Orders = () => {
  const { meta } = useLoaderData();
  if (meta.pagination.total < 1) {
    return <SectionTitle text="Please make an order" />;
  }
  return (
    <>
      <SectionTitle text="Your orders" />
      <OrderList />
      <ComplexPaginationContainer />
    </>
  );
};

export default Orders;
