import { NextResponse } from 'next/server';
import { Category } from '../../../../models/Category';

export const GET = async (request) => {
    const id = request.url.split('/categories/')[1];
    try {
        let categories = [];
        let category = await Category.findOne({ _id: id });
        categories.push(category);

        while (category.parent) {
            const newCategory = await Category.findOne({
                _id: category.parent._id,
            });
            category = newCategory;
            categories.push(newCategory);

            if (!category.parent) {
                break;
            }
        }

        return new NextResponse(JSON.stringify(categories), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
    }
};

export const DELETE = async (request) => {
    const id = request.url.split('/categories/')[1];
    try {
        await Category.findOneAndDelete({
            _id: id,
        });
        return new NextResponse(JSON.stringify({ status: 'success' }), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
    }
};
