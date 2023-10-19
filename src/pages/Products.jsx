import { useNavigation } from "react-router-dom";
import {
  Filters,
  Loading,
  PaginationContainer,
  ProductsContainer,
} from "../components";
import { customFetch } from "../utils";
const url = "/products";
export const loader = async ({ request }) => {
  // console.log(request);
  // get request one by one
  // const param = new URL(request.url).searchParams;
  // const nothing = param.get("nothing");
  // const search = param.get("search");
  // console.log(param);
  // console.log(search);
  // console.log(nothing);

  // get all request url and store into an object
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  // console.log(params);

  const res = await customFetch(url, { params });
  return { products: res.data.data, meta: res.data.meta, params };
};
const Products = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <>
      <Filters />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ProductsContainer />
          <PaginationContainer />
        </>
      )}
    </>
  );
};

export default Products;
