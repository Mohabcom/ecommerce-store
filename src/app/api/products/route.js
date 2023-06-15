import connect from '../../../lib/mongoose';
import { Product } from '../../../models/Product';
import { NextResponse } from 'next/server';

export const GET = async (request) => {
    await connect();

    // Get All Products
    try {
        const products = await Product.find();
        return new NextResponse(JSON.stringify(products), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
    }
};

export const POST = async (request) => {
    await connect();
    // Create New Product
    try {
        const { title, category, description, price, images, properties } =
            await request.json();
        console.log({
            title,
            category,
            description,
            price,
            images,
            properties,
        });

        let updatedCategory = null;
        if (category) updatedCategory = category;
        const productDoc = await Product.create({
            title,
            category: updatedCategory,
            description,
            price,
            images,
            properties,
        });
        return new NextResponse(JSON.stringify(productDoc), {
            status: 201,
        });
    } catch (error) {
        console.log(error);
    }
};

export const PUT = async (request) => {
    await connect();
    // Edit Product
    try {
        const { title, category, description, price, images, properties, _id } =
            await request.json();
        let updatedCategory = null;
        if (category) updatedCategory = category;
        const product = await Product.findOneAndUpdate(
            {
                _id,
            },
            {
                title,
                category: updatedCategory,
                description,
                price,
                images,
                properties,
            },
            { new: true },
        );
        return new NextResponse(JSON.stringify(product), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
    }
};
