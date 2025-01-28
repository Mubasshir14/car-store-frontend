
import Footer from "@/pages/Footer";
import Header from "@/pages/Header";
import { Outlet, useLocation } from "react-router-dom";

const MainLayout = () => {
  const location = useLocation();
const isProductsPage = location?.pathname?.includes('/all-products');


  return (
    <div className="bg-[#F2F5FB]">
      {!isProductsPage && <Header />}
      <Outlet />
      <Footer/>
    </div>
  );
};

export default MainLayout;