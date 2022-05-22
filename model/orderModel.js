import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
	{
		orderItems: [
			{
				name: { type: String, required: true },
				quantity: { type: Number, required: true },
				mainImage: { type: String, required: false },
				price: { type: Number, required: true },
			},
		],
		shippingAddress: {
			firstName: { type: String, required: true },
			lastName: { type: String, required: true },
			email: { type: String, required: true },
			address: { type: String, required: true },
			postalCode: { type: String, required: true },
			city: { type: String, required: true },
			country: { type: String, required: true },
		},
		itemsPrice: { type: Number, required: true },
		shippingPrice: { type: Number, required: true },
		taxPrice: { type: Number, required: true },
		totalPrice: { type: Number, required: true },
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		isPaid: { type: Boolean, default: false },
		paidAt: { type: Date },
		deliveryStatus: { type: Boolean, default: false },
	},
	{
		timestamps: true,
	}
);
const Order = mongoose.model('Order', orderSchema);
export default Order;
