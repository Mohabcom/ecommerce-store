import PaddingContainer from '../../../components/PaddingContainer/PaddingContainer';
import Reveal from '../../../components/Reveal/Reveal';
import { categories } from '../../../data/categories';
import Image from 'next/image';

export default function TopCategories() {
    return (
        <section>
            <PaddingContainer className="p-8 flex flex-col 2xl:gap-[3vh]">
                <h2 className="text-2xl lg:text-[3vh] font-bold mb-4">
                    Shop Our Top Categories
                </h2>

                <div className="flex flex-wrap gap-4 items-center justify-center md:px-4">
                    {categories.map((category, index) => {
                        return (
                            <Reveal
                                key={category.name}
                                className="w-1/3 sm:w-1/4 lg:w-1/12 grow overflow-hidden"
                                delay={index / 20}
                            >
                                <div className="bg-gray-200 rounded-lg min-h-[250px] sm:min-h-[300px] 2xl:h-[30vh] 2xl:min-h-[300px] overflow-hidden hover:cursor-pointer select-none">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        className="z-10 rounded-lg object-cover object-center max-h-full"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <div className="h-full absolute flex flex-col w-full mt-4 lg:mt-[2vh] text-white">
                                        <h3 className="font-bold text-center text-xl xl:text-[3vh] z-50 flex-1">
                                            {category.name}
                                        </h3>
                                    </div>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </PaddingContainer>
        </section>
    );
}
