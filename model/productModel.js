import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
		images: {
			main: { type: String },
			alternatives: { type: Array },
		},
		price: { type: String, required: true },
		description: { type: String },
		quantity: { type: Number, required: true },
		status: { type: Number },
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model('Product', productSchema);
export default Product;
