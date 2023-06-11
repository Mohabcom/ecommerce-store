'use client';
import Image from 'next/image';
import mainBG from '../../public/main-bg.png';
import PaddingContainer from '@/components/PaddingContainer/PaddingContainer';
import { categories } from '@/components/Navbar/Navbar';
import Reveal from '@/components/Reveal/Reveal';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

export const brands = [
    {
        name: 'Staples',
        deliveryTimeInHours: 24,
    },
    {
        name: 'Sprouts',
        deliveryTimeInHours: 24,
    },
    {
        name: 'Grocery outlet',
        deliveryTimeInHours: 24,
    },
    {
        name: 'Mollie stones',
        deliveryTimeInHours: 24,
    },
    {
        name: 'Sports Basement',
        deliveryTimeInHours: 24,
    },
    {
        name: 'Container Store',
        deliveryTimeInHours: 24,
    },
    {
        name: 'Target',
        deliveryTimeInHours: 24,
    },
    {
        name: 'Bevmo!',
        deliveryTimeInHours: 24,
    },
];

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
                        {categories.map((category, index) => {
                            return (
                                <Reveal
                                    key={category.name}
                                    className="w-1/3 md:w-1/4 lg:w-1/12 grow"
                                    delay={index / 20}
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
                        // loop={true}
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
                        {categories.map((category, index) => {
                            return (
                                <SwiperSlide>
                                    <Reveal delay={index / 20}>
                                        <div className="flex flex-col gap-4 h-full">
                                            <div className="bg-gray-200 w-full aspect-square flex items-center justify-center">
                                                <Image
                                                    src=""
                                                    alt=""
                                                    height={20}
                                                    width={20}
                                                />
                                            </div>
                                            <div className="flex justify-between">
                                                <h3 className="font-bold text-lg">
                                                    {category.name}
                                                </h3>
                                                <h3 className="font-bold text-sm flex items-start">
                                                    $
                                                    <span className="text-lg">
                                                        {category.NumberOfItems}
                                                    </span>
                                                    .00
                                                </h3>
                                            </div>
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
                        {brands.map((brand, index) => {
                            return (
                                <Reveal
                                    key={brand.name}
                                    className="w-1/3 md:w-1/4 lg:w-1/5 grow"
                                    delay={index / 20}
                                >
                                    <div className="bg-gray-200 rounded-lg p-4 border border-transparent hover:border-gray-700 transition-all">
                                        <h3 className="font-bold">
                                            {brand.name}
                                        </h3>
                                        <p>
                                            Delivery within{' '}
                                            {brand.deliveryTimeInHours} hours
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
                        Get Up To 70% Off
                    </h2>

                    <div className="flex flex-wrap gap-4 items-center justify-center md:px-4">
                        {Array.from({ length: 4 }, (e, i) => i + 1).map(
                            (num, index) => {
                                return (
                                    <div
                                        key={num}
                                        className="w-1/3 md:w-1/4 lg:w-1/5 grow bg-gray-200 rounded-lg flex flex-col items-center justify-center overflow-hidden"
                                    >
                                        <div className="w-full h-full grow p-4">
                                            <h3 className="font-bold">{num}</h3>
                                            <p>
                                                Delivery within{' '}
                                                {num.deliveryTimeInHours} hours
                                            </p>
                                        </div>
                                        <div className="w-full h-full grow bg-red-200">
                                            <Image
                                                src={''}
                                                alt=""
                                                className="w-full h-full object-cover object-center"
                                            />
                                        </div>
                                    </div>
                                );
                            },
                        )}
                    </div>
                </PaddingContainer>
            </section>
            <section>
                <PaddingContainer className="p-8">
                    <h2 className="text-2xl font-bold mb-4">
                        Weekly Popular Products
                    </h2>

                    <Swiper
                        className="w-full h-full mx-auto"
                        slidesPerView={1.2}
                        spaceBetween={30}
                        // loop={true}
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
                        {categories.map((category, index) => {
                            return (
                                <SwiperSlide>
                                    <Reveal delay={index / 20}>
                                        <div className="flex flex-col gap-4 h-full">
                                            <div className="bg-gray-200 w-full aspect-square flex items-center justify-center">
                                                <Image
                                                    src=""
                                                    alt=""
                                                    height={20}
                                                    width={20}
                                                />
                                            </div>
                                            <div className="flex justify-between">
                                                <h3 className="font-bold text-lg">
                                                    {category.name}
                                                </h3>
                                                <h3 className="font-bold text-sm flex items-start">
                                                    $
                                                    <span className="text-lg">
                                                        {category.NumberOfItems}
                                                    </span>
                                                    .00
                                                </h3>
                                            </div>
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
            <section className="parallax flex items-center justify-center">
                <PaddingContainer className="select-none text-center md:text-left w-full h-full flex items-center justify-center text-white">
                    <div className="hidden md:block grow"></div>
                    <div className="hidden md:block grow"></div>
                    <div className="flex flex-col items-center justify-center flex-1 bg-green-700 p-8 lg:p-16 w-1/3 shrink mx-6 my-16">
                        <h2 className="font-bold text-5xl lg:text-6xl mb-4">
                            Get 5% Cash Back On $200
                        </h2>
                        <h2 className="text-lg mb-10">
                            Shopping is a bit of a relaxing hobby for me, which
                            is sometimes troubling for the bank balance.
                        </h2>
                        <button className="text-xl border-2 self-center lg:self-start border-white rounded-full px-5 py-3 hover:bg-green-900 transition-all">
                            Learn More
                        </button>
                    </div>
                </PaddingContainer>
            </section>
        </div>
    );
}
