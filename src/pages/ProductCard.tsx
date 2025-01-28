/* eslint-disable @typescript-eslint/no-unused-vars */
import { BsFuelPump } from "react-icons/bs";
import { FaArrowCircleRight, FaEye, FaTachometerAlt } from "react-icons/fa";
import { GiGearStickPattern } from "react-icons/gi";
import { TProducts } from "@/types/TProducts";
import { Link } from "react-router-dom";

const ProductCard = ({ product }: { product: TProducts }) => {
  const {
    image,
    carName,
    category,
    brand,
    model,
    fuelType,
    price,
    milage,
    _id,
  } = product as TProducts;
  const randomNumber = Math.floor(Math.random() * 50) + 1;
  return (
    <div className="card uppercase shadow-lg rounded-lg border border-gray-200 bg-white">
      {/* Image with Hover Effect */}
      <figure className="relative group">
        <img
          src={image}
          alt={carName || "Product"}
          className="w-full h-52 object-cover rounded-t-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
        <span className="absolute top-2 right-2 px-4 py-1 text-white bg-red-500 uppercase font-bold rounded-lg text-sm">
          {category}
        </span>
      </figure>

      {/* Card Content */}
      <div className="p-5">
        {/* Title and Price */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold text-red-500">{carName}</h2>
          <h2 className="text-lg font-bold text-red-500">${price}</h2>
        </div>

        {/* Brand and Model */}
        <div className="flex justify-between items-center text-sm text-gray-900 mb-3">
          <p>Brand: {brand || "Unknown"}</p>
          <p>Model: {model || "Unknown"}</p>
        </div>

        <hr className="my-3" />

        {/* Features Section */}
        <div className="flex justify-between items-center text-sm text-gray-900 mb-3 ">
          {/* Fuel Type */}
          <div className="flex flex-col pl-2">
            <div className="flex items-center gap-2 text-gray-900">
              <BsFuelPump className="text-sm" />
              <span>Fuel </span>
            </div>
            <p className="font-medium mt-1 text-sm text-end">{fuelType || "PETROL"}</p>
          </div>
          {/* Mileage */}
          <div className="flex flex-col pl-2 border-l border-gray-300">
            <div className="flex items-center gap-2 text-gray-900">
              <FaTachometerAlt className="text-sm" />
              <span>Mileage</span>
            </div>
            <p className="font-medium mt-1 text-sm text-end">{milage || "92 MPG"}</p>
          </div>
          {/* Transmission */}
          <div className="flex flex-col pl-2 border-l border-gray-300">
            <div className="flex items-center gap-2 text-gray-900">
              <GiGearStickPattern className="text-xs" />
              <span>Transmission</span>
            </div>
            <p className="font-medium mt-1 text-sm text-end">AUTO</p>
          </div>
        </div>

        <hr className="my-3" />

        {/* Actions */}
        <div className="flex justify-between items-center">
          <Link to={`/car/${product._id}`} className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-lg hover:bg-red-600 transition duration-200 uppercase">
            View Details <FaArrowCircleRight />
          </Link>
          <button
           
            className="btn px-4 py-2 flex items-center text-sm font-bold  border-gray-300 hover:bg-gray-200 rounded-lg"
          >
            {randomNumber}
            <FaEye className="text-sm font-bold"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
