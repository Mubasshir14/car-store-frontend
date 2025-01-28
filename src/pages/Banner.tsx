import { Carousel } from "antd";
import img1 from "../assets/ferrari-458-city-4k-nr.jpg";
import img2 from "../assets/car_red_sports_car_142598_3840x2160.jpg";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";
import img5 from "../assets/carizon1.png";

const Banner = () => {
  return (
    <div className="max-w-screen-2xl mx-auto rounded-2xl">
      <Carousel autoplay autoplaySpeed={1500} dots>
        <div>
          <img
            src={img1}
            alt="Image 1"
            className="h-[60vh] md:h-[600px] w-full rounded-2xl"
          />
        </div>
        <div>
          <img
            src={img2}
            alt="Image 2"
            className="h-[60vh] md:h-[600px] w-full rounded-2xl"
          />
        </div>
        <div>
          <img
            src={img3}
            alt="Image 3"
            className="h-[60vh] md:h-[600px] w-full rounded-2xl"
          />
        </div>
        <div>
          <img
            src={img4}
            alt="Image 4"
            className="h-[60vh] md:h-[600px] w-full rounded-2xl"
          />
        </div>
        <div>
          <img
            src={img5}
            alt="Image 4"
            className="h-[60vh] md:h-[600px] w-full rounded-2xl"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
