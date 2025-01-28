import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Trusted = () => {
  const categories = [
    {
      name: "Sedan",
      image:
        "https://i.ibb.co.com/rZZ4k0F/Pngtree-white-volkswagen-sedan-simulation-illustration-4484876.png",
    },
    {
      name: "Cuv",
      image:
        "https://i.ibb.co.com/SR7MjBK/Pngtree-small-suv-car-png-14599175.png",
    },
    { name: "Cabriolet", image: "https://i.ibb.co.com/hCtJc8W/pngegg.png" },
    { name: "Pickup", image: "https://i.ibb.co.com/xqhvBH6/pngegg-1.png" },
    { name: "Supercar", image: "https://i.ibb.co.com/1TchgkM/pngegg-2.png" },
    { name: "Suv", image: "https://i.ibb.co.com/5GzJPyV/pngegg-3.png" },
  ];

  return (
    <div className="bg-black text-white py-14 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Section */}
        <div className="space-y-4">
          <p className="text-red-500 uppercase text-xl tracking-wider font-semibold">
            Trusted Car Dealer Service
          </p>

          <p className="text-white text-justify uppercase">
            For 15 years, we are raising the standard of used car retailing with
            one of the most innovative and reliable used vehicles.
          </p>
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg uppercase shadow-md transition">
           <Link to='/all-products'>View All</Link>
          </button>
        </div>

        {/* Right Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 ">
          {categories.map((category) => (
            <div
              key={category.name}
              className="relative group flex flex-col items-center bg-white text-black rounded-lg  shadow-md p-4 hover:border-2 hover:border-red-500 transition duration-1000"
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.name}
                className="h-40 w-full mb-2"
              />

              {/* Category Name */}
              <p className="font-semibold uppercase">{category.name}</p>

              {/* Arrow Icon */}
              <div className="absolute top-1/2 right-2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition">
                <FaArrowAltCircleRight className="text-2xl text-red-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trusted;
