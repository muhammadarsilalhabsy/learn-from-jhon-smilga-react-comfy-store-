import { useLoaderData, Link } from "react-router-dom";
import { formatPriceUSD } from "../utils";
const ProductsList = () => {
  const { products } = useLoaderData();
  // console.log(products);
  return (
    <div className="pt-12 grid gap-y-8">
      {products.map((product) => {
        const { title, price, image, company } = product.attributes;
        return (
          <Link
            key={product.id}
            to={`/products/${product.id}`}
            className="p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap shadow-lg hover:shadow-2xl group duration-300 "
          >
            <img
              src={image}
              alt={title}
              className="object-cover h-24 w-24  sm:h-32 sm:w-32 rounded-xl group-hover:scale-105 transition duration-300"
            />

            <div className="ml-0 sm:ml-16">
              <h2 className="capitalize font-medium text-lg">{title}</h2>
              <h4 className="capitalize text-md text-neutral-content">
                {company}
              </h4>
            </div>

            <p className="font-medium text-lg ml-0 sm:ml-auto">
              {formatPriceUSD(price)}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductsList;
