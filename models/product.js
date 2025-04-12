import mongoose from "mongoose";

const productSchema = mongoose.Schema(
    {
        productID: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        altName: [
            { type: String }
            
        ],
        description: {
            type: String,
            required: true
        },
        img: [
            { type: String }
        ],
        lablledPrice: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        isAvailable: {
            type: Boolean,
            
        },
    }
);

const Product = mongoose.model("product", productSchema)

export default Product;