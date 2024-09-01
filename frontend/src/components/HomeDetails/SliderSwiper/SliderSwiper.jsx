// import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import "../../../assets/styles/Slider.scss";

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';


const SliderSwiper = () => {

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><Link className='w-full select-none'><img src="src/assets/images/slider_img_2.jpg" alt="" /></Link></SwiperSlide>
        <SwiperSlide><Link className='w-full select-none'><img src="src/assets/images/slider_img_1.jpg" alt="" /></Link></SwiperSlide>
        <SwiperSlide><Link className='w-full select-none'><img src="src/assets/images/slider_img_3.jpg" alt="" /></Link></SwiperSlide>
        <SwiperSlide><Link className='w-full select-none'><img src="src/assets/images/slider_img_4.jpg" alt="" /></Link></SwiperSlide>
        <SwiperSlide><Link className='w-full select-none'><img src="src/assets/images/slider_img_5.jpg" alt="" /></Link></SwiperSlide>
      </Swiper>
    </>
  );
};

export default SliderSwiper;
