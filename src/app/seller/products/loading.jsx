// 'use client';
import Link from 'next/link';

async function getData() {
    const res = await fetch('http://localhost:3000/api/products', {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

export default async function SellerProducts() {
    return (
        <>
            <Link
                href={'/seller/products/new'}
                className="bg-gray-500-700 px-4 py-2 rounded text-white"
            >
                Add New Product
            </Link>
            <table className="basic mt-4">
                <thead>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                </thead>
                <tbody className="flex items-center justify-center w-full">
                    <p>LOADING........</p>
                </tbody>
            </table>
        </>
    );
}
