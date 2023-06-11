// 'use client';
import SellerLayout from '@/components/seller/SellerLayout/SellerLayout';
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
        <SellerLayout>
            <Link
                href={'/seller/products/new'}
                className="bg-green-700 px-4 py-2 rounded text-white"
            >
                Add New Product
            </Link>
            <table className="basic mt-4">
                <thead>
                    <tr>
                        <td>Product Name</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    <p>LOADING........</p>
                </tbody>
            </table>
        </SellerLayout>
    );
}
