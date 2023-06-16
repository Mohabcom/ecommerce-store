import connect from '../../../lib/mongoose';
import { Category } from '../../../models/Category';
import { Product } from '../../../models/Product';
import { NextResponse } from 'next/server';
import { createCategoryWithParents } from '../../../utils/createCategoryWithParents';

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

        // create categoryWithParents
        let categoryWithParents = await createCategoryWithParents(category);
        //

        let updatedCategory = null;
        if (category) updatedCategory = category;
        const productDoc = await Product.create({
            title,
            description,
            price,
            images,
            properties,
            category: updatedCategory,
            categoryWithParents,
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
        const oldProduct = await Product.findOne({ _id });
        let newCategoryWithParents;
        if (oldProduct.category == category) {
            newCategoryWithParents = await createCategoryWithParents(category);
        }
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
                categoryWithParents: newCategoryWithParents,
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
