'use client';
import Image from 'next/image';
import PaddingContainer from '@/components/PaddingContainer/PaddingContainer';
import { categories } from '@/components/Navbar/Navbar';
import Reveal from '@/components/Reveal/Reveal';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Main from '@/components/Home/Main/Main';
import TopCategories from '@/components/Home/TopCategories/TopCategories';
import FeaturedDeals from '@/components/Home/FeaturedDeals/FeaturedDeals';
import ChooseBrand from '@/components/Home/ChooseBrand/ChooseBrand';
import Discounts from '@/components/Home/Discounts/Discounts';
import WeeklyPopular from '@/components/Home/WeeklyPopular/WeeklyPopular';
import ParallaxBanner from '@/components/Home/ParallaxBanner/ParallaxBanner';
import MostSelling from '@/components/Home/MostSelling/MostSelling';

export default function Home() {
    return (
        <div className="flex flex-col gap-8">
            <Main />
            <TopCategories />
            <FeaturedDeals />
            <ChooseBrand />
            <Discounts />
            <WeeklyPopular />
            <ParallaxBanner />
            <MostSelling />
        </div>
    );
}
