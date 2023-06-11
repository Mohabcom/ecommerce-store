import connect from '@/lib/mongoose';
import { Product } from '@/models/Product';
import { NextResponse } from 'next/server';

export const GET = async (req, res) => {
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

export const POST = async (req, res) => {
    await connect();
    // Create New Product
    try {
        const { title, category, description, price, images, properties } =
            req.body;

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

export const PUT = async (req, res) => {
    // Edit Product
    try {
        const { title, category, description, price, images, properties, _id } =
            req.body;
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
export const DELETE = async (req, res) => {
    if (req.query?.id) {
        try {
            await Product.findOneAndDelete({
                _id: req.query?.id,
            });
            return new NextResponse(JSON.stringify({ status: 'success' }), {
                status: 200,
            });
        } catch (error) {
            console.log(error);
        }
    }
};
