import { Category } from '@/models/Category';
import connect from '@/lib/mongoose';
import { NextResponse } from 'next/server';

export const GET = async (request) => {
    await connect();

    // Get Categories
    try {
        const categories = await Category.find().populate('parent');
        return new NextResponse(JSON.stringify(categories), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
    }
};

export const POST = async (request) => {
    await connect();
    // Create New Category
    try {
        const { name, parentCategory, properties } = await request.json();
        let parent = null;
        if (parentCategory) parent = parentCategory;
        const categoryDoc = await Category.create({
            name,
            parent,
            properties,
        });
        return new NextResponse(JSON.stringify(categoryDoc), {
            status: 201,
        });
    } catch (error) {
        console.log(error);
    }
};
export const PUT = async (request) => {
    try {
        const { name, parentCategory, properties, _id } = await request.json();
        let parent = null;
        if (parentCategory) parent = parentCategory;
        const categoryDoc = await Category.findOneAndUpdate(
            { _id },
            {
                name,
                parent,
                properties,
            },
            { new: true },
        );
        return new NextResponse(JSON.stringify(categoryDoc), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
    }
};
