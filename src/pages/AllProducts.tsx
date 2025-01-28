import { Key, useState } from "react";
import ProductCard from "./ProductCard";
import { useGetAllProductsQuery } from "@/redux/features/Admin/productManagement.api";
import { TProducts } from "@/types/TProducts";
import Navbar from "./Navbar";
import Loader from "./Loader";

const AllProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState();

  const { data: response, isLoading } = useGetAllProductsQuery({
    searchTerm,
    minPrice,
    maxPrice,
    sort,
    page,
    limit,
  });

  const pageNumbers = Array.from(
    { length: response?.data?.meta?.totalPage },
    (_, index) => index
  );

  const products = response?.data?.data || [];

  if (isLoading) return <Loader />;

  const handleFilterApply = () => setPage(1);

  return (
    <div>
      <Navbar />
      <div className="max-w-screen-2xl mx-auto px-4 py-6 lg:py-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Responsive Sidebar */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden sticky top-4">
              {/* Header */}
              <div className="bg-gradient-to-r from-red-600 to-red-700 px-4 lg:px-6 py-4">
                <h2 className="text-xl font-bold text-white">Filter Options</h2>
              </div>

              {/* Filter Content */}
              <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
                {/* Search */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Search Cars
                  </label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Enter keywords..."
                    className="w-full px-3 lg:px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Price Range */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Price Range
                  </label>
                  <div className="flex gap-2 lg:gap-3">
                    <div className="flex-1">
                      <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="Min"
                        className="w-full px-3 lg:px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="Max"
                        className="w-full px-3 lg:px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Sort */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Sort By
                  </label>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="w-full px-3 lg:px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all appearance-none bg-white"
                  >
                    <option value="">Default</option>
                    <option value="price">Price: Low to High</option>
                    <option value="-price">Price: High to Low</option>
                    <option value="year">Year: New to Old</option>
                    <option value="-year">Year: Old to New</option>
                  </select>
                </div>

                {/* Apply Button */}
                <button
                  onClick={handleFilterApply}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 lg:py-3 rounded-lg font-semibold transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="flex-1">
            <h1 className="text-2xl lg:text-3xl text-center font-bold text-gray-800 mb-6 lg:mb-8">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-700">
                ALL CARS
              </span>
            </h1>

            {/* Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 lg:gap-3">
              {products.map((product: TProducts, i: Key | null | undefined) => (
                <ProductCard product={product} key={i} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap justify-center gap-2 mt-6 lg:mt-8">
              {pageNumbers.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 lg:px-4 py-2 rounded-lg transition-all duration-200 ${
                    page === i + 1
                      ? "bg-red-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
