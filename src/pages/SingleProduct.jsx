import { useLoaderData, Link } from "react-router-dom";
import { formatPriceUSD, customFetch, generateAmountOptions } from "../utils";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../features/cart/cartSlice";

// loader
export const loader = async ({ params }) => {
  // console.log(params);
  const res = await customFetch(`/products/${params.id}`);
  return { product: res.data.data };
};

// component
const SingleProduct = () => {
  const { product } = useLoaderData();

  // console.log(product);
  const { title, company, description, image, price, colors } =
    product.attributes;

  const dollarsAmount = formatPriceUSD(price);
  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const handleChange = (e) => {
    setAmount(parseInt(e.target.value));
  };

  // redux part
  const cartProduct = {
    cartID: product.id + productColor,
    productID: product.id,
    title,
    company,
    productColor,
    image,
    price,
    amount,
  };
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addItem({ product: cartProduct }));
  };
  return (
    <section>
      <div className="text-sm breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>

      {/* PRODUCT */}
      <div className="mt-6 grid gap-y-8 lg:gap-x-16 lg:grid-cols-2">
        {/* IMG */}
        <img
          src={image}
          alt={title}
          className="h-96 w-full object-cover rounded-lg"
        />
        {/* DEtail */}
        <div>
          <h1 className="text-3xl font-bold capitalize">{title}</h1>
          <h4 className="text-lg text-neutral-content font-bold mt-2">
            {company}
          </h4>
          <p className="mt-3 text-xl">{dollarsAmount}</p>
          <p className="mt-6 leading-8">{description}</p>

          {/* COLORS */}
          <div className="mt-5">
            <h4 className="font-medium text-md tracking-wider capitalize">
              Color
            </h4>
            <div className="mt-2">
              {colors.map((color) => {
                return (
                  <button
                    key={color}
                    type="button"
                    className={`badge w-7 h-7 mr-2 ${
                      color === productColor && "border-2 border-secondary"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setProductColor(color)}
                  ></button>
                );
              })}
            </div>
          </div>

          {/* AMOUNT */}
          <div className="flex gap-4 justify-center items-end">
            <div className="form-control w-8/12">
              <label htmlFor="amount" className="label">
                <h4 className="text-md font-medium tracking-wider capitalize">
                  amount
                </h4>
              </label>
              <select
                id="amount"
                className="select select-secondary select-bordered select-md"
                value={amount}
                onChange={handleChange}
              >
                {generateAmountOptions(20)}
              </select>
            </div>
            <div className="w-4/12 ">
              <button
                type="button"
                className="btn w-full btn-secondary btn-md"
                onClick={addToCart}
              >
                Add to bag
              </button>
            </div>
          </div>
          {/* CART BTN */}
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
