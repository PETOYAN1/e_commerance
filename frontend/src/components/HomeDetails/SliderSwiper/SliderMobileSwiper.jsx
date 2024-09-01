import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../../../assets/styles/SliderMobile.scss";
import { EffectCoverflow, Pagination } from "swiper/modules";
import ImageModal from "../../ImageMagnifier/ImageModal";
import { useState } from "react";

export default function SliderMobileSwiper({ imgUrl }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleOpenModal() {
    setIsModalOpen(!isModalOpen);
  }

  return (
    <>
      <div>
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={true}
          modules={[EffectCoverflow, Pagination]}
          className="mySwiper"
        >
          {imgUrl?.map((image) => (
            <SwiperSlide onClick={handleOpenModal} key={image.id}>
              <img src={image?.url} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {isModalOpen && (
        <ImageModal images={imgUrl}
        onClose={() => setIsModalOpen(false)}/>
      )}
    </>
  );
}
