/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetReviewQuery } from "@/redux/features/Review/reviewManagementApi";
import { Carousel } from "antd";
import { Star } from "lucide-react";
import Loader from "./Loader";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";

interface ReviewProps {
  showTitle?: boolean;
}

const Review = ({ showTitle = true }: ReviewProps) => {
  const { data: reviews, isLoading } = useGetReviewQuery(undefined);

  if (isLoading) return <Loader />;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="max-w-screen-xl mx-auto mb-14 px-4 relative">
      {showTitle && (
        <h2 className="lg:text-3xl md:text-xl font-bold text-center mb-12 text-red-500">
          What Our Customers Say
        </h2>
      )}

      <Carousel {...settings} className="px-4">
        {reviews?.data?.map(
          (review: {
            _id: Key | null | undefined;
            image: string | undefined;
            name:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined;
            model:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined;
            rating: number;
            reviewText:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined;
            createdAt: string | number | Date;
          }) => (
            <div key={review._id} className="px-4">
              <div className="bg-white rounded-xl shadow-lg p-6 h-[250px] transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={review.image}
                    alt={`${review.name}'s profile`}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-100"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {review.name}
                    </h3>
                    <p className="text-sm text-gray-500">{review.model}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {[...Array(5)].map((_, index) => (
                        <Star
                          key={index}
                          className={`w-4 h-4 ${
                            index < review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-4">
                  {review.reviewText}
                </p>

                <div className="text-right">
                  <p className="text-sm text-gray-400">
                    {new Date(review.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
          )
        )}
      </Carousel>
    </div>
  );
};

export default Review;
