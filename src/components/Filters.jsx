import { useLoaderData, Link, Form } from "react-router-dom";
import FormInput from "./FormInput";
import SelectInput from "./SelectInput";
import FormRange from "./FormRange";
import FormCheckbox from "./FormCheckbox";
const Filters = () => {
  const { meta, params } = useLoaderData();
  // console.log(meta);
  const { search, price, company, category, order, shipping } = params;
  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      {/* INPUT SEARCH*/}
      <FormInput
        name="search"
        type="search"
        size="input-sm"
        label="search product"
        defaultValue={search}
      />
      {/* SELECT COMPANY */}
      <SelectInput
        name="company"
        label="select company"
        size="select-sm"
        list={meta.companies}
        defaultValue={company}
      />
      {/* SELECT CATEGORIES */}
      <SelectInput
        name="category"
        label="select category"
        size="select-sm"
        list={meta.categories}
        defaultValue={category}
      />
      {/* SELECT ORDERS */}
      <SelectInput
        name="order"
        label="sort by"
        size="select-sm"
        list={["a-z", "z-a", "high", "low"]}
        defaultValue={order}
      />
      {/* SELECT RANGE */}
      <FormRange
        name="price"
        label="select price"
        size="range-sm"
        price={price}
      />
      {/* SHIPPING */}
      <FormCheckbox
        name="shipping"
        label="free shipping"
        size="checkbox-sm"
        defaultChecked={shipping}
      />
      {/* BUTTONS */}
      <button type="submit" className="btn-primary btn btn-sm">
        search
      </button>
      <Link to="/products" className="btn-accent btn btn-sm">
        reset
      </Link>
    </Form>
  );
};

export default Filters;
