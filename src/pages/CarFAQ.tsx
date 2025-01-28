import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const CarFAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What car models are available for test drives?",
      answer:
        "We offer a variety of models for test drives, including the latest electric and hybrid cars.",
    },
    {
      question: "Do you provide financing options for car purchases?",
      answer:
        "Yes, we offer several financing options tailored to your needs, including low-interest loans and leasing.",
    },
    {
      question: "Is insurance included with the car purchase?",
      answer:
        "Insurance is not included by default, but we can help you find the best insurance plan for your new car.",
    },
    {
      question: "How do I schedule a service appointment for my car?",
      answer:
        "You can easily schedule an appointment online or by calling our service department directly.",
    },
    {
      question: "What is the warranty on the cars you sell?",
      answer:
        "All new cars come with a 3-year or 36,000-mile warranty, whichever comes first. We also offer extended warranties.",
    },
    {
      question: "Can I trade in my old car?",
      answer:
        "Yes, we offer trade-in services, and we can provide you with an estimated value for your car.",
    },
    {
      question: "Do you offer maintenance packages?",
      answer:
        "Yes, we offer various maintenance packages that cover routine services such as oil changes, tire rotations, and brake checks.",
    },
    {
      question: "What are your business hours?",
      answer:
        "Our dealership is open Monday to Saturday from 9 AM to 6 PM, and we are closed on Sundays.",
    },
  ];

  return (
    <div className="max-w-screen-2xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Side: Image Gallery */}
        <div className="relative hidden md:flex flex-col justify-center items-center space-y-6 p-6">
          <div className="w-full relative">
            <img
              src="https://i.ibb.co/WzHXgSy/pexels-photo-170811.jpg"
              alt="Luxury Car"
              className="w-full rounded-xl shadow-lg transform transition hover:scale-105 duration-300 ease-in-out"
            />
            <div className="absolute bottom-4 left-4 bg-white/80 rounded-full px-4 py-2 text-sm font-semibold text-gray-800">
              Premium Models
            </div>
          </div>
          <div className="w-full md:flex space-x-4 hidden">
            <img
              src="https://i.ibb.co/WzHXgSy/pexels-photo-170811.jpg"
              alt="Car Interior"
              className="w-1/2 rounded-lg shadow-md transform transition hover:scale-105 duration-300 ease-in-out"
            />
            <img
              src="https://i.ibb.co/WzHXgSy/pexels-photo-170811.jpg"
              alt="Car Detail"
              className="w-1/2 rounded-lg shadow-md transform transition hover:scale-105 duration-300 ease-in-out"
            />
          </div>
        </div>

        {/* Right Side: FAQ Section */}
        <div className="space-y-4 p-6">
          <h2 className="lg:text-3xl md:text-2xl text-xl font-bold text-red-500 uppercase tracking-wider  mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="block lg:hidden space-y-2 p-2">
            {faqs.slice(0, 5).map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-md"
              >
                <button
                  onClick={() =>
                    setActiveIndex(activeIndex === index ? null : index)
                  }
                  className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-blue-50 transition duration-200"
                >
                  <span className="text-left font-semibold text-gray-700">
                    {faq.question}
                  </span>
                  {activeIndex === index ? (
                    <ChevronUp className="text-blue-600" />
                  ) : (
                    <ChevronDown className="text-gray-500" />
                  )}
                </button>
                {activeIndex === index && (
                  <div className="p-4 bg-white text-gray-600 text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="lg:block hidden space-y-4 p-6">
            {faqs.slice(0, 8).map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-md"
              >
                <button
                  onClick={() =>
                    setActiveIndex(activeIndex === index ? null : index)
                  }
                  className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-blue-50 transition duration-200"
                >
                  <span className="text-left font-semibold text-gray-700">
                    {faq.question}
                  </span>
                  {activeIndex === index ? (
                    <ChevronUp className="text-blue-600" />
                  ) : (
                    <ChevronDown className="text-gray-500" />
                  )}
                </button>
                {activeIndex === index && (
                  <div className="p-4 bg-white text-gray-600 text-sm">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarFAQ;
