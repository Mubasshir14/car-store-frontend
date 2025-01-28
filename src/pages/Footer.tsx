import { FaFacebookF, FaTwitter, FaVimeoV, FaPinterestP } from "react-icons/fa";
import img1 from "../assets/mastercard.png";
import img2 from "../assets/googlepay.png";
import img3 from "../assets/visapng.png";
import img4 from "../assets/pay.png";
import img from "../assets/Carizon.png";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="max-w-screen-2xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          {/* <h4 className="text-xl font-bold mb-4">Quick Links</h4> */}
          <img src={img} alt="" />
          <ul className="space-y-2 text-justify">
            Where quality meets reliability, offering top-notch <br /> vehicles
            and exceptional service to elevate your <br /> driving experience.
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-bold mb-4">Important Links</h4>
          <ul className="space-y-2">
            <Link to="/terms-condition">
              <p className="hover:text-gray-300">Terms & Condition</p>
            </Link>
            <Link to="/privacy-policy">
              <p className="hover:text-gray-300">Privacy Policy</p>
            </Link>
            <Link to="/payment">
              <p className="hover:text-gray-300">Payment Policy</p>
            </Link>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-bold mb-4">Newsletter</h4>
          <div className="flex flex-col md:flex-row items-center mb-4">
            <input
              type="email"
              placeholder="Email"
              className="bg-gray-800 mb-4 placeholder:text-white/70 md:mb-0 w-full md:w-aut border-none flex-1 py-2 px-3 rounded-l-full focus:outline-none"
            />
            <button className="bg-red-500  hover:bg-red-600 text-white py-2 px-4 rounded-r-full">
              Subscribe
            </button>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-white hover:text-xl duration-1500">
              <FaFacebookF />
            </a>
            <a href="#" className="text-white hover:text-xl duration-1500">
              <FaTwitter />
            </a>
            <a href="#" className="text-white hover:text-xl duration-1500">
              <FaVimeoV />
            </a>
            <a href="#" className="text-white hover:text-xl duration-1500">
              <FaPinterestP />
            </a>
          </div>
          <div className="mt-8 flex flex-wrap">
            <img src={img1} alt="" />
            <img src={img2} alt="" />
            <img src={img3} alt="" />
            <img src={img4} alt="" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
