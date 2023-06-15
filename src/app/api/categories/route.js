import { Category } from '../../../models/Category';
import connect from '../../../lib/mongoose';
import { NextResponse } from 'next/server';

export const GET = async (request) => {
    await connect();

    // Get Categories
    try {
        const categories = await Category.find().populate('parent');
        const sortedCategories = categories.sort((a, b) => {
            // const nameA = a.name.toLowerCase();
            // const nameB = b.name.toLowerCase();
            //     if (nameA < nameB) return -1;
            //     if (nameA > nameB) return 1;
            const parentNameA = a.parent?.name.toLowerCase();
            const parentNameB = b.parent?.name.toLowerCase();
            if (a.parent & !b.parent) {
                return -1;
            }
            if (b.parent & !a.parent) {
                return 1;
            }
            if (parentNameA < parentNameB) {
                return -1;
            }
            if (parentNameA > parentNameB) {
                return 1;
            }
            return 0;
        });
        // console.log(sortedCategories);
        return new NextResponse(JSON.stringify(sortedCategories), {
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
