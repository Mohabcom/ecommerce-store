import { NextResponse } from 'next/server';

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
