import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const PictureSlider = ({ images }) => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="md:mx-auto p-3 mx-5 max-w-screen-md">
      <Slider {...settings}>
        {images.map((item, index) => (
          <div
            key={index}
            className="flex justify-center items-center bg-white w-full h-full"
          >
            <img src={import.meta.env.VITE_BASE_URL + item} alt="" />
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default PictureSlider;
