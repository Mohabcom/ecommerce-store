import PaddingContainer from '@/components/PaddingContainer/PaddingContainer';
import Reveal from '@/components/Reveal/Reveal';
import { brands } from '@/data/brands';
import Image from 'next/image';

export default function ChooseBrand() {
    return (
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
                                <div className="bg-gray-200 rounded-lg p-4 flex gap-2 items-center border border-transparent hover:border-gray-700 transition-all">
                                    <div className="h-full">
                                        <Image
                                            src={brand.image}
                                            alt={brand.name}
                                            className="max-h-full"
                                        />
                                    </div>
                                    <div className="flex-1 grow">
                                        <h3 className="font-bold">
                                            {brand.name}
                                        </h3>
                                        <p>
                                            Delivery within{' '}
                                            {brand.deliveryTimeInHours} hours
                                        </p>
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
