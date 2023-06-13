import { mongoose } from 'mongoose';

const { Schema, model, models } = require('mongoose');

const ProductSchema = new Schema({
    title: { type: String },
    category: { type: mongoose.Types.ObjectId, ref: 'Category' },
    description: { type: String },
    price: { type: Number },
    images: { type: [String] },
    properties: { type: Object },
    draft: { type: Boolean, default: true },
});

export const Product = models.Product || model('Product', ProductSchema);
