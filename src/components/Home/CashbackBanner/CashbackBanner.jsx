import PaddingContainer from '@/components/PaddingContainer/PaddingContainer';
import Image from 'next/image';
import creditCard from '../../../../public/credit.png';

export default function CashbackBanner() {
    return (
        <main className="relative flex items-center justify-center select-none text-center md:text-left">
            <div className=" w-screen h-[350px] bg-orange-200" />
            <PaddingContainer className="h-full absolute flex items-center w-full p-8">
                <div className="z-10 flex items-center justify-center w-full h-full text-gray-800">
                    <div className="flex flex-col flex-1">
                        <h2 className="font-bold text-5xl mb-4">
                            Get 5% Cash Back
                        </h2>
                        <h2 className="text-lg">
                            Get 5% Cash Back when you make a purchase.
                        </h2>
                        <div className='mt-4'>
                            <button className="border-2 border-gray-700 text-gray-700 font-bold rounded-full px-6 p-2 hover:bg-green-800 hover:text-white hover:border-green-800 transition-all">
                                Learn More
                            </button>
                        </div>
                    </div>
                    <div className="z-10 flex-1 hidden md:block relative h-full">
                        <Image
                            src={creditCard}
                            fill
                            style={{ objectFit: 'contain' }}
                        />
                    </div>
                </div>
            </PaddingContainer>
        </main>
    );
}
