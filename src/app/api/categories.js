import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/Category';
import { isAdminRequest } from './auth/[...nextauth]';

export default async function handler(req, res) {
    const { method } = req;
    await mongooseConnect();
    await isAdminRequest(req, res);
    // Get Categories
    if (method === 'GET') {
        try {
            const categories = await Category.find().populate('parent');
            res.status(200).json(categories);
        } catch (error) {
            console.log(error);
        }
    }
    // Create New Category
    if (method === 'POST') {
        try {
            const { name, parentCategory, properties } = req.body;
            let parent = null;
            if (parentCategory) parent = parentCategory;
            const categoryDoc = await Category.create({
                name,
                parent,
                properties,
            });
            res.status(200).json(categoryDoc);
        } catch (error) {
            console.log(error);
        }
    }
    // Edit Category
    if (method === 'PUT') {
        try {
            const { name, parentCategory, properties, _id } = req.body;
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
            res.status(200).json(categoryDoc);
        } catch (error) {
            console.log(error);
        }
    }
    // Delete Category
    if (method === 'DELETE') {
        if (req.query?.id) {
            try {
                await Category.findOneAndDelete({
                    _id: req.query?.id,
                });
                res.status(200).json({ status: 'success' });
            } catch (error) {
                console.log(error);
            }
        }
    }
    // res.status(200).json({ name: 'John Doe' });
}
