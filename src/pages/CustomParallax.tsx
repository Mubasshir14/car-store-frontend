import { Parallax as ReactParallax } from "react-parallax"; // Rename imported Parallax
import img from "../assets/25_frd_bros_64848_badl_sasq_ruby.avif";
import customer from "../assets/9708965.png";
import red from "../assets/red.png";
import award from "../assets/award.png";
import showroom from "../assets/showroom.png";


const CustomParallax = () => {
  // Renamed component
  return (
    <div className="md:mt-14 lg:mt-14 bg-gray-100 shadow-lg rounded-lg overflow-hidden">
      <ReactParallax bgImage={img} strength={500}>
        {" "}
        {/* Use renamed import */}
        <div className="md:h-[500px] bg-slate-500 bg-opacity-40 flex items-center justify-center p-5">
          <div className="max-w-screen-xl w-full mx-auto flex md:flex-row flex-col justify-around gap-6">
            {/* faculty */}
            <div className="flex flex-col items-center font-poppin flex-grow-0">
              <div className="border-2 border-white font-poppin rounded-full p-4">
               <img src={red} className="w-[120px]" alt="" />
              </div>
              <h1 className="text-2xl font-extrabold text-white">1200</h1>
              <h1 className="text-xl font-bold font-poppin text-white">
                IN STOCK
              </h1>
            </div>
            {/* students */}
            <div className="flex flex-col items-center flex-grow-0">
              <div className="border-2 border-white font-poppin rounded-full p-4">
                <img src={customer} className="w-[120px]" alt="" />
              </div>
              <h1 className="text-2xl font-extrabold text-white">200K</h1>
              <h1 className="text-xl font-bold font-poppin text-white">
                SATISFIED CUSTOMERS
              </h1>
            </div>
            {/* female */}
            <div className="flex flex-col items-center font-poppin flex-grow-0">
              <div className="border-2 border-white rounded-full p-4">
              <img src={award} className="w-[120px]" alt="" />
              </div>
              <h1 className="text-2xl font-extrabold text-white">200+</h1>
              <h1 className="text-xl uppercase font-bold font-poppin text-white text-center">
               Award Achievement <br /> 
              </h1>
            </div>
            {/* graduated */}
            <div className="flex flex-col items-center flex-grow-0">
              <div className="border-2 border-white font-poppin rounded-full p-4">
              <img src={showroom} className="w-[120px]" alt="" />
              </div>
              <h1 className="text-2xl font-extrabold text-white">30</h1>
              <h1 className="text-xl uppercase font-bold font-poppin text-white text-center">
                Showrooms <br /> 
              </h1>
            </div>
          </div>
        </div>
      </ReactParallax>
    </div>
  );
};

export default CustomParallax; // Export renamed component
