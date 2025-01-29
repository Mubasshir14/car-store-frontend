
import { Key, useState } from "react";
import ProductCard from "./ProductCard";
import { TProducts } from "@/types/TProducts";
import { useGetAllProductsQuery } from "@/redux/features/Admin/productManagement.api";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const Product = () => {
  const { data: response, isLoading } = useGetAllProductsQuery(undefined);
  const [visibleCount, setVisibleCount] = useState(6);
  console.log(setVisibleCount);
  const products = response?.data?.data || ([] as TProducts[]);
  if (isLoading) return <Loader />;
  const visibleProducts = products.slice(0, visibleCount);

  return (
    <div id="product" className="max-w-screen-xl mx-auto py-10">
      <h1 className="text-2xl uppercase text-center font-bold text-red-600 mb-6">
        CARS
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
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
    </div>
  );
};

export default Product;
