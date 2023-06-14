import PaddingContainer from '@/components/PaddingContainer/PaddingContainer';
import Image from 'next/image';
import firstimg from '../../../../public/discounts/sofa.png';
import secondimg from '../../../../public/discounts/book.png';
import thirdimg from '../../../../public/discounts/shirt.png';
import fourthimg from '../../../../public/discounts/bag.png';

const discountsData = [
    {
        amount: 100,
        desc: 'Explore Our Furniture & Home Furnishing Range',
        image: firstimg,
        bgColor: 'bg-orange-100',
        textColor: 'text-yellow-600',
    },
    {
        amount: 29,
        desc: 'Explore Our Furniture & Home Furnishing Range',
        image: secondimg,
        bgColor: 'bg-red-100',
        textColor: 'text-red-600',
    },
    {
        amount: 67,
        desc: 'Explore Our Furniture & Home Furnishing Range',
        image: thirdimg,
        bgColor: 'bg-indigo-100',
        textColor: 'text-indigo-600',
    },
    {
        amount: 59,
        desc: 'Explore Our Furniture & Home Furnishing Range',
        image: fourthimg,
        bgColor: 'bg-green-100',
        textColor: 'text-green-600',
    },
];

export default function Discounts() {
    return (
        <section>
            <PaddingContainer className="p-8">
                <h2 className="text-2xl font-bold mb-4">Get Up To 70% Off</h2>

                <div className="flex flex-wrap gap-4 items-center justify-center md:px-4">
                    {discountsData.map((discount, index) => {
                        return (
                            <div
                                key={index}
                                className={`w-1/3 md:w-1/4 lg:w-1/5 grow rounded-lg flex flex-col items-center justify-center overflow-hidden ${discount.bgColor}`}
                            >
                                <div className="w-full h-full grow p-8">
                                    <h3 className="font-bold text-xl text text-gray-800">
                                        Save
                                    </h3>
                                    <p
                                        className={`mb-4 text-4xl font-bold ${discount.textColor}`}
                                    >
                                        ${discount.amount}
                                    </p>
                                    <span className="">{discount.desc}</span>
                                </div>
                                <div className="w-full h-full grow bg-red-200">
                                    <Image
                                        src={discount.image}
                                        alt={discount.amount}
                                        className="w-full h-full object-cover object-center"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </PaddingContainer>
        </section>
    );
}
