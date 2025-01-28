
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const carBrands = [
  {
    name: "Toyota",
    logo: "https://i.ibb.co.com/KjWhyZh/images.jpg",
  },
  {
    name: "Ford",
    logo: "https://i.ibb.co.com/J3ndsRJ/ford-logo-png-seeklogo-56584.png",
  },
  {
    name: "BMW",
    logo: "https://i.ibb.co.com/tsGTSrG/bmw-transparent-bmw-free-free-png.webp",
  },
  {
    name: "Mercedes",
    logo: "https://i.ibb.co.com/TwjWmmk/web-136350849.webp",
  },
  {
    name: "Audi",
    logo: "https://i.ibb.co.com/0tVG639/A231415-web-2880.jpg",
  },
];

const Category = () => {
  return (
    <div id='brand' className="max-w-screen-2xl mx-auto my-10 px-4">
      <h2 className="text-2xl uppercase text-center font-bold text-red-600 mb-6">
        Find Your Car by Brand
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {carBrands.map((brand) => (
          <Link to='/all-products'
            key={brand.name}
            className={`
              bg-white
              rounded-xl 
              shadow-md 
              overflow-hidden 
              transform 
              transition-all 
              duration-300 
              hover:-translate-y-1 
              hover:border hover:border-red-500
              hover:shadow-lg 
              group
              relative
            `}
          >
            <div className="relative">
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="w-full h-36 object-contain p-2 transition-transform duration-300 group-hover:scale-105"
              />
              <button
                className="
                  absolute 
                  -bottom-3 
                  left-1/2 
                  -translate-x-1/2 
                  bg-red-600 
                  text-white 
                  p-2 
                  rounded-full 
                  opacity-0 
                  group-hover:opacity-100 
                  transition-all 
                  duration-300 
                  hover:bg-red-700
                  flex 
                  items-center 
                  justify-center
                  z-10
                "
              >
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="text-center py-2">
              <p className="font-semibold text-base text-gray-800">
                {brand.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Category;
