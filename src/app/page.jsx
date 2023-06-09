'use client';
import Image from 'next/image';
import mainBG from '../../public/main-bg.png';
import PaddingContainer from '@/components/PaddingContainer/PaddingContainer';
import { useEffect } from 'react';
import { categories } from '@/components/Navbar/Navbar';
import Reveal from '@/components/Reveal/Reveal';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

export default function Home() {
    return (
        <div className="flex flex-col gap-8">
            <main className="relative flex items-center justify-center select-none text-center md:text-left">
                <Image
                    alt="main-bg"
                    src={mainBG}
                    className=" w-screen h-[500px] sm:h-[600px] lg:h-[700px] object-cover object-left md:object-center"
                />
                <PaddingContainer className="h-full absolute flex items-center w-full p-8">
                    <div className="z-10 flex items-center w-full h-full">
                        <div className="flex flex-col items-center justify-center flex-1">
                            <h2 className="font-bold text-5xl mb-4">
                                Shopping And Department Store.
                            </h2>
                            <h2 className="text-lg">
                                Shopping is a bit of a relaxing hobby for me,
                                which is sometimes troubling for the bank
                                balance.
                            </h2>
                        </div>
                        <div className="z-10 flex-1 hidden md:block"></div>
                    </div>
                </PaddingContainer>
            </main>
            <section>
                <PaddingContainer className="p-8">
                    <h2 className="text-2xl font-bold mb-4">
                        Shop Our Top Categories
                    </h2>

                    <div className="flex flex-wrap gap-4 items-center justify-center md:px-4">
                        {categories.map((category) => {
                            return (
                                <Reveal
                                    key={category.name}
                                    className="w-1/3 md:w-1/4 lg:w-1/12 grow"
                                >
                                    <div className="bg-gray-200 rounded-lg p-4 min-h-[300px]">
                                        <h3 className="font-bold">
                                            {category.name}
                                        </h3>
                                        <p>
                                            {category.NumberOfItems} items found
                                        </p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </PaddingContainer>
            </section>
            <section>
                <PaddingContainer className="p-8">
                    <h2 className="text-2xl font-bold mb-4">
                        Today's Featured Deals
                    </h2>

                    <Swiper
                        className="w-full h-full mx-auto"
                        slidesPerView={1.2}
                        spaceBetween={30}
                        loop={true}
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
                        {categories.map((category) => {
                            return (
                                <SwiperSlide>
                                    <Reveal>
                                        <div className="flex flex-col gap-4 h-full">
                                            <div className="bg-gray-200 w-full aspect-square flex items-center justify-center">
                                                <Image
                                                    src=""
                                                    alt=""
                                                    height={20}
                                                    width={20}
                                                />
                                            </div>
                                            <h3 className="font-bold text-lg">
                                                {category.name}
                                            </h3>
                                            <p className="text-sm">
                                                {category.name} description
                                                lorem ipsum
                                            </p>
                                            <div className="flex items-center gap-2">
                                                <div className="flex">
                                                    <AiFillStar />
                                                    <AiFillStar />
                                                    <AiFillStar />
                                                    <AiFillStar />
                                                    <AiOutlineStar />
                                                </div>
                                                <p className="text-sm">(142)</p>
                                            </div>
                                            <button className="border-2 border-gray-700 font-bold rounded-full p-2 hover:bg-blue-400 transition-all">
                                                Add To Cart
                                            </button>
                                        </div>
                                    </Reveal>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </PaddingContainer>
            </section>
            <section>
                <PaddingContainer className="p-8">
                    <h2 className="text-2xl font-bold mb-4">Choose By Brand</h2>

                    <div className="flex flex-wrap gap-4 items-center justify-center md:px-4">
                        {categories.map((category) => {
                            return (
                                <Reveal
                                    key={category.name}
                                    className="w-1/3 md:w-1/4 lg:w-1/12 grow"
                                >
                                    <div className="bg-gray-200 rounded-lg p-4 min-h-[300px]">
                                        <h3 className="font-bold">
                                            {category.name}
                                        </h3>
                                        <p>
                                            {category.NumberOfItems} items found
                                        </p>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </PaddingContainer>
            </section>
        </div>
    );
}
