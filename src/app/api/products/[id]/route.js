import connect from '@/lib/mongoose';
import { Product } from '@/models/Product';
import { NextResponse } from 'next/server';

export const GET = async (req, res) => {
    await connect();

    const id = req.url.split('/products/')[1];
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
