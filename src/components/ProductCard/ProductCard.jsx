import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Reveal from '../Reveal/Reveal';
import Image from 'next/image';

export default function ProductCard({ product, index }) {
    const truncateText = (text) => {
        if (text.length > 55) {
            return text.replace(/^(.{55}[^\s]*).*/, '$1') + '...';
        } else {
            return text;
        }
    };
    return (
        <Reveal delay={index / 20}>
            <div className="flex flex-col gap-4 h-full">
                <div className="bg-slate-200 bg-opacity-50 rounded-lg w-full aspect-square relative">
                    <Image
                        src={product.images[0]}
                        alt={product.title}
                        layout="fill"
                        objectFit="contain"
                        className="max-w-[70%] max-h-[70%] mx-auto my-auto"
                    />
                </div>
                <div className="flex justify-between">
                    <h3 className="font-bold text-lg">{product.title}</h3>
                    <h3 className="font-bold text-sm flex items-start ml-4">
                        $<span className="text-lg">{product.price}</span>
                        .00
                    </h3>
                </div>
                <p className="text-sm">{truncateText(product.description)}</p>
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
    );
}
