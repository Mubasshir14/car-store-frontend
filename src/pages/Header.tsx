import { FaFacebook, FaPinterest, FaTwitter, FaVimeo } from "react-icons/fa";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <div className="sticky top-0 z-50 ">
      {/* Top Bar */}
      <div className="bg-red-600 text-white py-2 md:block hidden">
        <div className="container mx-auto flex items-center justify-between text-sm">
          {/* Contact Info */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <span>Hot Line: +1800 123 456 789</span>
            </div>
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>Mail Us: your_protect@mail.com</span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-300">
              <FaTwitter className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FaFacebook className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FaVimeo className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-gray-300">
              <FaPinterest className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <Navbar />
    </div>
  );
};

export default Header;