import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SliderOneImg from '../../assets/images/banner-1.jpg'
import SliderOneImg1 from '../../assets/images/banner-2.jpg'


const Hero = () => {
  return (
    <div>
        <section className='section-1'>
            <Swiper
                spaceBetween={0}
                slidesPerView={1}          
                breakpoints={{
                    1024: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                    }
                    }}
                >               
                <SwiperSlide>
                    <div className="content" style={{ backgroundImage: `url(${SliderOneImg})` }}>                        
                    </div>                   
                </SwiperSlide>
                <SwiperSlide>
                    <div className="content" style={{ backgroundImage: `url(${SliderOneImg1})` }}>                        
                    </div>
                </SwiperSlide>                
            </Swiper>
        </section>
    </div>
  )
}

export default Hero