import PaddingContainer from '@/components/PaddingContainer/PaddingContainer';
import Reveal from '@/components/Reveal/Reveal';
import { categories } from '@/data/categories';
import Image from 'next/image';

export default function TopCategories() {
    return (
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
                                className="w-1/3 md:w-1/4 lg:w-1/12 grow overflow-hidden"
                                delay={index / 20}
                            >
                                <div className="bg-gray-200 rounded-lg min-h-[300px] overflow-hidden hover:cursor-pointer select-none">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        className="z-10 rounded-lg object-cover object-center max-h-full"
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                    <div className="h-full absolute flex flex-col w-full mt-4 text-white">
                                        <h3 className="font-bold text-center text-xl z-50 flex-1">
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
