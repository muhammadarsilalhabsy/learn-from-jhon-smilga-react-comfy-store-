import { Link } from "react-router-dom";
import hero1 from "../assets/hero1.webp";
import hero2 from "../assets/hero2.webp";
import hero3 from "../assets/hero3.webp";
import hero4 from "../assets/hero4.webp";

const carouselImageList = [hero1, hero2, hero3, hero4];
const Hero = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-24 items-center">
      <div>
        <h1 className="font-bold text-4xl sm:text-6xl tracking-tight max-w-2xl">
          We are changing the way people shop
        </h1>
        <p className="mt-8 leading-8 max-w-xl text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis,
          inventore ratione deserunt iure aliquam qui cum dicta porro fuga eum
          molestias repellendus exercitationem vero. Consectetur inventore
          mollitia culpa id provident?
        </p>
        <div className="mt-10">
          <Link to="/products" className="btn btn-primary">
            Our Products
          </Link>
        </div>
      </div>
      <div className="hidden h-[28rem] lg:carousel carousel-center p-4 space-x-4 bg-neutral rounded-box">
        {carouselImageList.map((image) => {
          return (
            <div key={image} className="carousel-item">
              <img
                src={image}
                className="object-cover rounded-box h-full w-80"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Hero;
