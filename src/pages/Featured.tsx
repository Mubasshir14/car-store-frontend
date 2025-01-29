
import { useGetAllProductsQuery } from "@/redux/features/Admin/productManagement.api";
import { useState } from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { TProducts } from "@/types/TProducts";
import { Key } from "react";
import { FaArrowCircleRight } from "react-icons/fa";
import { BsFuelPump } from "react-icons/bs";
import { FaTachometerAlt } from "react-icons/fa";
import { GiGearStickPattern } from "react-icons/gi";
import { FaEye } from "react-icons/fa";

const Featured = () => {
  const { data: response, isLoading } = useGetAllProductsQuery(undefined);
  const [visibleCount, setVisibleCount] = useState(6);
  console.log(setVisibleCount);
  const products =
    response?.data?.data?.filter((product: TProducts) => product.featured) ||
    ([] as TProducts[]);

  if (isLoading) return <Loader />;

  const visibleProducts = products.slice(0, visibleCount);
  const randomNumber = Math.floor(Math.random() * 50) + 1;

  return (
    <div className="max-w-screen-xl mx-auto py-10">
      <h1 className="text-2xl uppercase text-center font-bold text-red-600 mb-6">
        Featured CARS
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
        {visibleProducts.map(
          (product: TProducts, i: Key | null | undefined) => (
            <div
              key={i}
              className="card  lg:w-full   shadow-lg rounded-lg border border-gray-200 bg-white"
            >
              <figure className="relative group">
                <img
                  src={product.image}
                  alt={product.carName || "Product"}
                  className="w-full h-52 object-cover rounded-t-lg transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
                {/* Featured Label */}
                <span className="absolute top-2 left-2 px-4 py-1 text-white bg-red-500 uppercase font-bold rounded-lg text-sm">
                  FEATURED
                </span>
                <span className="absolute top-2 right-2 px-4 py-1 text-white bg-red-500 uppercase font-bold rounded-lg text-sm">
                  {product.category}
                </span>
              </figure>

              {/* Card Content */}
              <div className="p-5 uppercase">
                {/* Title and Price */}
                <div className="flex justify-between items-center mb-3">
                  <h2 className="text-lg font-semibold text-red-500">
                    {product.carName}
                  </h2>
                  <h2 className="text-lg font-bold text-red-500">
                    ${product.price}
                  </h2>
                </div>

                {/* Brand and Model */}
                <div className="flex justify-between items-center text-sm text-gray-900 mb-3">
                  <p>Brand: {product.brand || "Unknown"}</p>
                  <p>Model: {product.model || "Unknown"}</p>
                </div>

                <hr className="my-3" />

                {/* Features Section */}
                <div className="flex justify-between items-center text-sm text-gray-900 mb-3">
                  {/* Fuel Type */}
                  <div className="flex flex-col pl-2">
                    <div className="flex items-center gap-2 text-gray-900">
                      <BsFuelPump className="text-xs" />
                      <span>Fuel</span>
                    </div>
                    <p className=" mt-1 text-xs text-end">
                      {product.fuelType || "Petrol"}
                    </p>
                  </div>
                  {/* Mileage */}
                  <div className="flex flex-col pl-2 border-l border-gray-300">
                    <div className="flex items-center gap-2 text-gray-900">
                      <FaTachometerAlt className="text-xs" />
                      <span>Mileage</span>
                    </div>
                    <p className=" mt-1 text-xs text-end">
                      {product.mileage || "92 MPG"}
                    </p>
                  </div>
                  {/* Transmission */}
                  <div className="flex flex-col pl-2 border-l border-gray-300">
                    <div className="flex items-center gap-2 text-gray-900">
                      <GiGearStickPattern className="text-xs" />
                      <span>Transmission</span>
                    </div>
                    <p className=" mt-1 text-sm text-end">Auto</p>
                  </div>
                </div>

                <hr className="my-3" />

                {/* Actions */}
                <div className="flex justify-between items-center">
                  <Link
                    to={`/car/${product._id}`}
                    className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-sm font-bold rounded-lg hover:bg-red-600 transition duration-200 uppercase"
                  >
                    View Details <FaArrowCircleRight />
                  </Link>
                  <button className="btn px-4 py-2 flex items-center text-sm font-bold border-gray-300 hover:bg-gray-200 rounded-lg">
                    {randomNumber}
                    <FaEye className="text-sm font-bold" />
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
      <div className="flex items-center justify-center mt-4">
        <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all">
          LOAD MORE
        </button>
      </div>
    </div>
  );
};

export default Featured;
