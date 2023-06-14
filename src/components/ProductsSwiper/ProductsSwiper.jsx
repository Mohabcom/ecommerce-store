'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from '../ProductCard/ProductCard';

export default function ProductsSwiper({ products }) {
    return (
        <Swiper
            className="w-full h-full mx-auto"
            slidesPerView={1.2}
            spaceBetween={30}
            grabCursor={true}
            breakpoints={{
                501: {
                    slidesPerView: 2.3,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3.3,
                    spaceBetween: 40,
                },
                1024: {
                    slidesPerView: 4.3,
                    spaceBetween: 50,
                },
            }}
        >
            {products.map((product, index) => {
                return (
                    <SwiperSlide key={index}>
                        <ProductCard product={product} index={index} />
                    </SwiperSlide>
                );
            })}
        </Swiper>
    );
}
