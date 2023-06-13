import connect from '@/lib/mongoose';
import { Product } from '@/models/Product';
import axios from 'axios';
import { NextResponse } from 'next/server';

export const GET = async (request) => {
    await connect();

    const id = request.url.split('/products/')[1];
    // Get One Product
    try {
        const product = await Product.findOne({ _id: id });
        return new NextResponse(JSON.stringify(product), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
    }
};
export const DELETE = async (request) => {
    await connect();

    const id = request.url.split('/products/')[1];

    try {
        await Product.findOneAndDelete({
            _id: id,
        });
        return new NextResponse(JSON.stringify({ status: 'success' }), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
    }
};
