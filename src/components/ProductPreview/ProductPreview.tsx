'use client';
import Image from 'next/image';
import {
    AiFillStar,
    AiOutlineMinus,
    AiOutlinePlus,
    AiOutlineStar,
} from 'react-icons/ai';
import { SlArrowRight } from 'react-icons/sl';
import PaddingContainer from '../PaddingContainer/PaddingContainer';
import { useState } from 'react';

interface IProduct {
    title: string;
    description: string;
    category: string;
    images: string[];
    price: number;
    properties: {};
    categoryWithParents: [];
}

export default function ProductPreview(props: { product: IProduct }) {
    const product = props.product;
    const categories = product.categoryWithParents;

    const [quantity, setQuantity] = useState(1);

    return (
        <PaddingContainer className="px-4">
            <div className="flex flex-col w-full gap-2">
                <div className="flex items-center px-4 gap-4">
                    {product.categoryWithParents &&
                        categories
                            .map((category: { name: string }, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4"
                                >
                                    {category.name}
                                    {index !== 0 && <SlArrowRight size={12} />}
                                </div>
                            ))
                            .reverse()}
                </div>
                <div className="grid grid-rows-2 grid-cols-none md:grid-rows-none md:grid-cols-2 gap-8">
                    {/* IMAGES */}
                    <div className="flex flex-col gap-4">
                        <div className="relative bg-gray-200 bg-opacity-50 rounded-2xl w-full min-w-[50%] aspect-square max-w-[600px] mx-auto">
                            <Image
                                src={product?.images[0]}
                                alt={product.title}
                                fill
                                style={{ objectFit: 'contain' }}
                                className="max-w-[80%] max-h-[80%] mx-auto my-auto"
                            />
                        </div>
                        <div className="flex gap-4">
                            {product.images.map((image, index) => (
                                <div
                                    key={index}
                                    className="relative bg-gray-200 bg-opacity-50 rounded-2xl min-w-[23%] aspect-square border border-gray-400"
                                >
                                    <Image
                                        src={image}
                                        alt={product.title}
                                        fill
                                        style={{ objectFit: 'contain' }}
                                        className="max-w-[80%] max-h-[80%] mx-auto my-auto"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grow flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            {/* TITLE */}
                            <h1 className="font-bold text-3xl">
                                {product.title}
                            </h1>
                            {/* DESCRIPTION */}
                            <p className="text-sm">{product.description}</p>
                            {/* RATING */}
                            <div className="flex items-center gap-2">
                                <div className="flex text-green-700">
                                    <AiFillStar />
                                    <AiFillStar />
                                    <AiFillStar />
                                    <AiFillStar />
                                    <AiOutlineStar />
                                </div>
                                <p className="text-sm">(142)</p>
                            </div>
                        </div>
                        <div className="w-full border-t border-gray-300 my-4" />
                        {/* PRICE */}
                        <div className="font-semibold text-2xl">
                            ${product.price}.00
                        </div>
                        <div className="w-full border-t border-gray-300 my-4" />
                        {product.properties && (
                            <div>
                                {product.properties &&
                                    Object.keys(product.properties).map(
                                        (key: string) => (
                                            <div key={key}>
                                                <div className="font-semibold text-2xl">
                                                    {key}
                                                </div>
                                                <button className="border-gray-300 border rounded px-4 py-2">
                                                    {product.properties[key]}
                                                </button>
                                            </div>
                                        ),
                                    )}
                                <div className="w-full border-t border-gray-300 my-4 mt-8" />
                            </div>
                        )}
                        {/* QUANTITY */}
                        <div className="flex items-center text-center gap-2 lg:gap-4 bg-green-300 self-start text-lg lg:text-2xl text-gray-700 rounded-full">
                            <button
                                className="p-3 m-1 rounded-full hover:bg-gray-500 hover:bg-opacity-10 transition-all"
                                onClick={() => {
                                    setQuantity(() => {
                                        if (quantity == 1) return 1;
                                        return quantity - 1;
                                    });
                                }}
                            >
                                <AiOutlineMinus />
                            </button>
                            {/* <span>{product.inventory}</span> */}
                            <span>{quantity}</span>
                            <button
                                className="p-3 m-1 rounded-full hover:bg-gray-500 hover:bg-opacity-10 transition-all"
                                onClick={() => {
                                    setQuantity(() => {
                                        if (quantity == 10) return 10;
                                        return quantity + 1;
                                    });
                                }}
                            >
                                <AiOutlinePlus />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </PaddingContainer>
    );
}
