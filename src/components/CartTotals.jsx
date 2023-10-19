import { useSelector } from "react-redux";
import { formatPriceUSD } from "../utils";

const CartTotals = () => {
  const { cartTotal, shipping, tax, orderTotal } = useSelector(
    (state) => state.cartState
  );
  return (
    <div className="card bg-base-200">
      <div className="card-body">
        {/* SUBTOTAL */}
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Subtotal</span>
          <span className="font-medium">{formatPriceUSD(cartTotal)}</span>
        </p>
        {/* SHIPPING */}
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Shipping</span>
          <span className="font-medium">{formatPriceUSD(shipping)}</span>
        </p>
        {/* TAX */}
        <p className="flex justify-between text-xs border-b border-base-300 pb-2">
          <span>Tax</span>
          <span className="font-medium">{formatPriceUSD(tax)}</span>
        </p>
        {/* ORDER TOTAL */}
        <p className="flex justify-between text-sm mt-4 pb-2">
          <span>Order total</span>
          <span className="font-medium">{formatPriceUSD(orderTotal)}</span>
        </p>
      </div>
    </div>
  );
};

export default CartTotals;
