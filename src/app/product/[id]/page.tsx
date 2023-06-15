// 'use client';
// import React, { useState } from 'react';
import getProducts from '../../../utils/getProducts';
import PaddingContainer from '../../../components/PaddingContainer/PaddingContainer';
import Image from 'next/image';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { SlArrowRight } from 'react-icons/sl';
import getCategories from '../../../utils/getCategories';

type Props = {
    params: {
        id: string;
    };
};

export default async function page(props: Props) {
    const { id } = props.params;
    const product = await getProducts(id);
    const categories = await getCategories(product.category);
    // categories.reverse()
    const images: string[] = product.images;
    // console.log(Object.keys(product.properties));

    // const [bigImage, setBigImage] = useState();
    return (
        <div>
            <PaddingContainer className="px-4">
                <div className="flex flex-col w-full gap-2">
                    <div className="flex items-center px-4 gap-4">
                        {product.category &&
                            categories
                                .reverse()
                                .map(
                                    (
                                        category: { name: string },
                                        index: number,
                                    ) => (
                                        <div className="flex items-center gap-4">
                                            {category.name}
                                            {index !==
                                                categories.length - 1 && (
                                                <SlArrowRight size={12} />
                                            )}
                                        </div>
                                    ),
                                )}
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
                                {images.map((image) => (
                                    <div className="relative bg-gray-200 bg-opacity-50 rounded-2xl min-w-[23%] aspect-square border border-gray-400">
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
                            <div>
                                {product.properties &&
                                    Object.keys(product.properties).map(
                                        (key: string) => (
                                            <div>
                                                <div className="font-semibold text-2xl">
                                                    {key}
                                                </div>
                                                <button className="border-gray-300 border rounded px-4 py-2">
                                                    {product.properties[key]}
                                                </button>
                                            </div>
                                        ),
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </PaddingContainer>
        </div>
    );
}
