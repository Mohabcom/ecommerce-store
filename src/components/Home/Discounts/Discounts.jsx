import PaddingContainer from '@/components/PaddingContainer/PaddingContainer';
import Image from 'next/image';

export default function Discounts() {
    return (
        <section>
            <PaddingContainer className="p-8">
                <h2 className="text-2xl font-bold mb-4">Get Up To 70% Off</h2>

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
    );
}
