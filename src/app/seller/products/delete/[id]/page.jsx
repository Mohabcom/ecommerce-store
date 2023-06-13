'use client';
import Spinner from '@/components/seller/Spinner/Spinner';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

async function getData(id) {
    const res = await fetch(`http://localhost:3000//api/products/${id}`, {
        // cache: 'no-store',
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

export default async function EditProduct({ params }) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { id } = params;
    const product = await getData(id);

    const deleteProduct = async () => {
        setIsLoading(true);
        for (const link of product.images) {
            await axios.delete(`/api/images/${link}`);
        }
        await axios.delete(`/api/products/${id}`);
        setIsLoading(false);
        router.push('/seller/products');
    };
    return (
        <>
            <h1 className="text-center">
                Do you really want to delete&nbsp;"{product?.title}" ?
            </h1>
            {!isLoading && (
                <div className="flex gap-2 justify-center">
                    <button
                        onClick={deleteProduct}
                        className="shadow-md bg-red-200 text-red-700 px-4 py-2 rounded-sm border border-gray-200"
                    >
                        Yes
                    </button>
                    <button
                        className="px-4 py-2 rounded-sm shadow-md bg-white text-gray-600 border border-gray-200"
                        onClick={() => router.push('/seller/products')}
                    >
                        No
                    </button>
                </div>
            )}
            {isLoading && (
                <div className="w-full h-24 p-2 flex items-center justify-center">
                    <Spinner />
                </div>
            )}
        </>
    );
}
