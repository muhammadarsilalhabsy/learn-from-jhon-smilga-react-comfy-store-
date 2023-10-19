import { useLoaderData, Link } from "react-router-dom";
import { formatPriceUSD } from "../utils";
const ProductsGrid = () => {
  const { products } = useLoaderData();
  console.log(products);
  return (
    <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => {
        const { title, price, image } = product.attributes;
        return (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="card w-full shadow-lg hover:shadow-2xl transition duration-300 "
          >
            <figure className="px-4 pt-4">
              <img
                src={image}
                alt={title}
                className="object-cover h-64 md:h-48 w-full rounded-xl"
              />
            </figure>
            <div className="card-body text-center items-center ">
              <h2 className="card-title capitalize tracking-wider">{title}</h2>
              <span className="text-secondary">{formatPriceUSD(price)}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductsGrid;
