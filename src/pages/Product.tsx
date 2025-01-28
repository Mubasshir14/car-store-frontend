/* eslint-disable @typescript-eslint/no-unused-vars */
import { Key, useState } from "react";
import { Loader } from "lucide-react";
import ProductCard from "./ProductCard";
import { TProducts } from "@/types/TProducts";
import { useGetAllProductsQuery } from "@/redux/features/Admin/productManagement.api";
import { Link } from "react-router-dom";

const Product = () => {
  const { data: response, isLoading } = useGetAllProductsQuery(undefined);

  const [visibleCount, setVisibleCount] = useState(6);
  const products = response?.data?.data || ([] as TProducts[]);

  if (isLoading)
    return (
      <div className="flex justify-center py-20">
        <Loader className="animate-spin" />
      </div>
    );

  // Show only the products up to the visible count
  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div id="product" className="max-w-screen-2xl mx-auto py-10">
      <h1 className="text-2xl uppercase text-center font-bold text-red-600 mb-6">
        CARS
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-4">
        {visibleProducts.map(
          (product: TProducts, i: Key | null | undefined) => (
            <ProductCard product={product} key={i} />
          )
        )}
      </div>
      <div className="flex items-center justify-center">
        <Link
          to="/all-products"
          className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
        >
          SHOW MORE
        </Link>
      </div>
      {/* {visibleCount < products.length && (
        <div className="text-center mt-6">
          <button
            onClick={() => setVisibleCount((prev) => prev + 6)}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
          >
            SHOW MORE
          </button>
        </div>
      )} */}
    </div>
  );
};

export default Product;
