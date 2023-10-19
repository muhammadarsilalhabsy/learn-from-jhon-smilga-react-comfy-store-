import { useDispatch } from "react-redux";
import { formatPriceUSD, generateAmountOptions } from "../utils";
import { editItem, removeItem } from "../features/cart/cartSlice";

const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const removeItemFromTheCart = () => {
    dispatch(removeItem({ cartID }));
  };
  const handleAmount = (e) => {
    dispatch(editItem({ cartID, amount: parseInt(e.target.value) }));
  };
  const { cartID, title, company, productColor, image, price, amount } =
    cartItem;

  return (
    <article
      key={cartID}
      className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0"
    >
      {/* IMAGE */}
      <img
        src={image}
        alt={title}
        className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg object-cover"
      />
      {/* INFO */}
      <div className="sm:ml-16 sm:w-48 capitalize">
        {/* TITLE */}
        <h3 className="font-medium">{title}</h3>
        {/* COMPANY */}
        <h4 className="mt-2 text-sm text-neutral-content">{company}</h4>
        {/* COLOR */}
        <p className="mt-4 text-sm  items-center flex gap-x-2">
          color:
          <span
            className="badge badge-sm"
            style={{ backgroundColor: productColor }}
          ></span>
        </p>
      </div>
      <div className="sm:ml-12">
        {/* AMOUNT */}
        <div className="form-control max-w-xs">
          <label htmlFor="amount" className="label p-0">
            <span className="label-text">Amount</span>
          </label>
          <select
            name="amount"
            id="amount"
            className="mt-2 select select-primary select-bordered select-xs"
            value={amount}
            onChange={handleAmount}
          >
            {generateAmountOptions(amount + 5)}
          </select>
        </div>
        {/* REMOVE */}
        <button
          onClick={removeItemFromTheCart}
          type="button"
          className="link link-primary link-hover text-sm"
        >
          remove
        </button>
      </div>

      {/* PRICE */}
      <p className="font-medium sm:ml-auto">{formatPriceUSD(price)}</p>
    </article>
  );
};

export default CartItem;
