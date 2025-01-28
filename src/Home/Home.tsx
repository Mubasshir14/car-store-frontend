import Banner from "@/pages/Banner";
import CarFAQ from "@/pages/CarFAQ";
import Category from "@/pages/Category";
import CustomParallax from "@/pages/CustomParallax";
import NewsSection from "@/pages/NewsSection";
import Product from "@/pages/Product";
import Review from "@/pages/Review";
import Trusted from "@/pages/Trusted";

const Home = () => {
  return (
    <div>
      <Banner />
      <Category />
      <Product />
      <Trusted />
      <CarFAQ />
      <CustomParallax />
      <NewsSection />
      <Review/>
    </div>
  );
};

export default Home;
