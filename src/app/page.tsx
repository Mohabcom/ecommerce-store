import Main from '../components/Home/Main/Main';
import TopCategories from '../components/Home/TopCategories/TopCategories';
import FeaturedDeals from '../components/Home/FeaturedDeals/FeaturedDeals';
import ChooseBrand from '../components/Home/ChooseBrand/ChooseBrand';
import Discounts from '../components/Home/Discounts/Discounts';
import WeeklyPopular from '../components/Home/WeeklyPopular/WeeklyPopular';
import ParallaxBanner from '../components/Home/ParallaxBanner/ParallaxBanner';
import MostSelling from '../components/Home/MostSelling/MostSelling';
import CashbackBanner from '../components/Home/CashbackBanner/CashbackBanner';
import HelpServices from '../components/Home/HelpServices/HelpServices';

export default function Home() {
    return (
        <div className="flex flex-col gap-8 lg:gap-[3vh]">
            <Main />
            <TopCategories />
            <FeaturedDeals />
            <ChooseBrand />
            <Discounts />
            <WeeklyPopular />
            <ParallaxBanner />
            <MostSelling />
            <CashbackBanner />
            <HelpServices />
        </div>
    );
}
