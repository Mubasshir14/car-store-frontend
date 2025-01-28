/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAProductQuery } from "@/redux/features/Admin/productManagement.api";
import { ArrowLeft, Minus, Plus, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import Loader from "./Loader";
import { useAppSelector } from "@/redux/hook";
import { useCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetMeQuery } from "@/redux/features/Admin/userManagementApi";
import { useAddCartMutation } from "@/redux/features/Cart/cartApi";
import { toast } from "sonner";
import {
  useAddReviewMutation,
} from "@/redux/features/Review/reviewManagementApi";


const ProductDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [q, setQ] = useState(1);
  const [activeTab, setActiveTab] = useState("product-details");
  const { data: car, isLoading } = useGetAProductQuery(id,);
  const [addReview] = useAddReviewMutation(undefined);
  const user = useAppSelector(useCurrentUser);
  const [addCart] = useAddCartMutation();
  console.log(user);
  const { data: newUser } = useGetMeQuery({
    email: user?.email,
    role: user?.role,
  });

  if (isLoading) return <Loader />;

  const handleAddToCart = async () => {
    if (user) {
      const cartItem = {
        car: car?.data._id,
        name: car?.data?.carName,
        brand: car?.data?.brand,
        category: car?.data?.category,
        description: car?.data?.description,
        fuelType: car?.data?.fuelType,
        image: car?.data?.image,
        inStock: car?.data?.inStock,
        milage: car?.data?.milage,
        year: car?.data?.year,
        price: car?.data?.price,
        quantity: q,
        user: user?.email,
        userName: newUser?.data?.name,
        email: newUser?.data?.email,
        address: newUser?.data?.address,
        phone: newUser?.data?.phone,
        city: newUser?.data?.city,
      };
      console.log(cartItem);

      try {
        const response = await addCart(cartItem).unwrap();
        console.log("Cart item added successfully:", response);
        toast.success("Item added to cart successfully!");
      } catch (error) {
        console.error("Failed to add item to cart:", error);
        toast.error("Failed to add item to cart. Please try again.");
      }
    }
  };

  const handleQuantityChange = (type: any) => {
    setQ((prev) =>
      type === "increment" ? prev + 1 : prev > 1 ? prev - 1 : prev
    );
  };

  const submitReview = async (reviewText: string, rating: number) => {
    console.log("Review submitted:", reviewText, rating);
    const reviewData = {
      reviewText,
      rating,
      name: newUser?.data?.name,
      email: newUser?.data?.email,
      product: car?.data?._id,
      model: car?.data?.carName,
      image: car?.data?.image,
    };
    try {
      const response = await addReview(reviewData).unwrap();
      console.log(response);
      toast.success("Review submitted successfully!", {
        description: `Thank you, ${newUser?.data?.name}!`,
      });
    } catch (error) {
      toast.error("Failed to submit review. Please try again.");
    }
    closeModal();
  };

  return (
    <div className="max-w-screen-xl mx-auto my-10 p-3">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={car?.data?.image || "fallback-image.jpg"}
              alt={car?.data?.carName || "Product"}
              className="w-full h-96 md:h-[450px] xl:h-[500px] object-cover object-center"
            />
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <div>
            <span className="inline-block px-3 py-1 text-sm font-medium text-red-600 bg-red-600/10 rounded-full mb-2 font-poppin uppercase">
              {car?.data?.category}
            </span>
            <h1 className="lg:text-3xl text-xl font-bold text-gray-900 mb-2">
              {car?.data?.carName} ({car?.data?.year})
            </h1>
            <p className="text-gray-600 text-justify">
              {car?.data?.description}
            </p>
          </div>

          {/* Additional Details */}
          <div className="space-y-2">
            <p className="text-gray-700">
              <strong>Brand:</strong> {car?.data?.brand}
            </p>
            <p className="text-gray-700">
              <strong>Model:</strong> {car?.data?.model}
            </p>
            <p className="text-gray-700">
              <strong>Fuel Type:</strong> {car?.data?.fuelType}
            </p>
            <p className="text-gray-700">
              <strong>Milage:</strong> {car?.data?.milage}
            </p>
            <p
              className={`text-gray-700 ${
                `${car?.data?.inStock}` ? "text-green-600" : "text-red-600"
              }`}
            >
              <strong>Availability:</strong>{" "}
              {car?.data?.inStock ? "In Stock" : "Out of Stock"}
            </p>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-3xl font-bold text-gray-900">
              ${car?.data?.price}
            </span>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Quantity:</span>
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => handleQuantityChange("decrement")}
                disabled={q <= 1}
                className="h-10 w-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center">{q}</span>
              <button
                onClick={() => handleQuantityChange("increment")}
                className="h-10 w-10 flex items-center justify-center text-gray-600 hover:bg-gray-100"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={!car?.data?.inStock}
              className={`flex-1 py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                car?.data?.inStock
                  ? "bg-red-600 hover:bg-red-500 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>

            {/* <button
              onClick={handleAddToWishlist}
              className="px-6 py-3 border border-red-600 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors text-red-600"
            >
              <Heart className="w-4 h-4 text-red-600" />
              Add to Wishlist
            </button> */}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center mt-10">
        <Tabs>
          <TabList className="flex justify-center border-gray-300">
            <Tab
              onClick={() => setActiveTab("product-details")}
              className={`py-2 px-4 text-lg font-semibold cursor-pointer 
          ${
            activeTab === "product-details"
              ? "border-b-2  border-red-500 text-red-500 "
              : "hover:text-red-500 border-red-500"
          } 
          focus:outline-none`}
            >
              Car Details
            </Tab>
            <Tab
              onClick={() => setActiveTab("reviews")}
              className={`py-2 px-4 text-lg font-semibold cursor-pointer 
          ${
            activeTab === "reviews"
              ? "border-b-2   text-red-500 border-red-500"
              : "hover:text-red-500 border-red-500"
          } 
          focus:outline-none`}
            >
              Reviews
            </Tab>
            <Tab
              onClick={() => setActiveTab("faq")}
              className={`py-2 px-4 text-lg font-semibold cursor-pointer 
          ${
            activeTab === "faq"
              ? "border-b-2 text-red-500 border-red-500"
              : "hover:text-red-500 border-red-500"
          } 
          focus:outline-none`}
            >
              FAQ
            </Tab>
          </TabList>

          <TabPanel>
            <div className="my-6 text-justify">
              {/* product details */}
              {car?.data?.description}
            </div>
          </TabPanel>
          <TabPanel>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
            {/* <Review showTitle={false} /> */}
            </div>
            <div className="flex justify-end">
              <button
                onClick={openModal}
                className="border-2 border-black hover:border-red-500 hover:text-red-500 text-black px-4 py-2 rounded-lg mt-2"
              >
                Add a Review
              </button>
              {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-xl text-center text-red-500 font-semibold mb-4">
                      Add Your Review
                    </h2>
                    <textarea
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      placeholder="Write your review here..."
                      rows={4}
                      className="w-full p-2 border border-gray-300 rounded-md mb-4"
                    />
                    <div className="flex items-center mb-4">
                      <span className="mr-2">Rating:</span>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`cursor-pointer ${
                            star <= rating ? "text-yellow-500" : "text-gray-300"
                          }`}
                          onClick={() => setRating(star)}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={closeModal}
                        className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          submitReview(reviewText, rating);
                          closeModal();
                        }}
                        className="px-4 py-2 bg-red-600 text-white rounded-md"
                      >
                        Submit Review
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabPanel>
          <TabPanel>
            <section>
              <div className="container flex flex-col justify-center text-justify p-4 mx-auto md:p-8">
                <h2 className="mb-12 text-4xl font-bold leading-none text-center sm:text-5xl">
                  Frequently Asked Questions
                </h2>
                <div className="grid gap-10 md:gap-8 sm:p-3 md:grid-cols-2 lg:px-12 xl:px-32">
                  <div>
                    <h3 className="font-semibold">
                      What warranty do you offer for the car?
                    </h3>
                    <p className="mt-1 text-justify">
                      We provide a standard manufacturer’s warranty, which
                      covers major repairs and services for up to 3 years or
                      36,000 miles. Additional extended warranties are also
                      available for purchase.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      Can I schedule a test drive before purchasing?
                    </h3>
                    <p className="mt-1 text-justify">
                      Yes, you can schedule a test drive through our website or
                      by contacting our sales team. Please provide your
                      preferred date and time.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      What financing options are available?
                    </h3>
                    <p className="mt-1 text-justify">
                      We offer a variety of financing options, including
                      low-interest loans and leasing plans. Our finance team
                      will assist you in finding the best solution tailored to
                      your needs.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold">
                      How do I track my car delivery status?
                    </h3>
                    <p className="mt-1 text-justify">
                      Once your car is shipped, you will receive a tracking
                      number and updates via email. You can also contact our
                      support team for more details.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetails;
