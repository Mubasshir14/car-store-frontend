import { Carousel } from "antd";
import img1 from "../assets/6.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";

const Banner = () => {
  return (
    <div className="-mt-28">
      <Carousel autoplay autoplaySpeed={1500} dots>
        <div>
          <img
            src={img1}
            alt="Image 1"
            className="h-[60vh] md:h-[600px] w-full"
          />
        </div>
        <div>
          <img
            src={img2}
            alt="Image 2"
            className="h-[40vh] md:h-[600px] w-full"
          />
        </div>
        <div>
          <img
            src={img3}
            alt="Image 3"
            className="h-[40vh] md:h-[600px] w-full"
          />
        </div>
        <div>
          <img
            src={img4}
            alt="Image 4"
            className="h-[40vh] md:h-[600px] w-full"
          />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
