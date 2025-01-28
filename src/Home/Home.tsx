import Banner from "@/pages/Banner";
import CarFAQ from "@/pages/CarFAQ";
import Category from "@/pages/Category";
import CustomParallax from "@/pages/CustomParallax";
import Featured from "@/pages/Featured";
import NewsSection from "@/pages/NewsSection";
import Product from "@/pages/Product";
import Review from "@/pages/Review";
import Trusted from "@/pages/Trusted";

const Home = () => {
  return (
    <div>
      <Banner />
      <Category />
      <Featured />
      <div className="my-4">
        <Trusted />
      </div>

      <Product />
      <CarFAQ />
      <CustomParallax />
      <NewsSection />
      <Review />
    </div>
  );
};

export default Home;
