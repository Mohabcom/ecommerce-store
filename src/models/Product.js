import { mongoose } from 'mongoose';

const { Schema, model, models } = require('mongoose');

const ProductSchema = new Schema({
    title: { type: String },
    headline: { type: String },
    description: { type: String },
    price: { type: Number },
    images: { type: [String] },
    properties: { type: Object },
    draft: { type: Boolean, default: true },
    category: { type: mongoose.Types.ObjectId, ref: 'Category' },
    categoryWithParents: {
        type: [{ type: mongoose.Types.ObjectId, ref: 'Category' }],
    },
});

export const Product = models.Product || model('Product', ProductSchema);
