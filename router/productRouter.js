import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../model/productModel.js';
import { isAdmin, isAuth } from '../utils.js';
import data from '../data.js';
const productRouter = express.Router();
//Add products in database from data.js
productRouter.get(
	'/seed',
	expressAsyncHandler(async (req, res) => {
		await Product.deleteMany({});
		const products = data.products.map((product) => ({
			...product,
		}));
		const createdProducts = await Product.insertMany(products);
		if (createdProducts) {
			res.status(202).send({ createdProducts });
		} else {
			res.status(404).send({ message: 'Products Not Created' });
		}
	})
);

//Product(Get, Update, Delete)
productRouter.get(
	'/:id/get',
	expressAsyncHandler(async (req, res) => {
		const product = await Product.findById({ _id: req.params.id });
		if (product) {
			res.status(202).send(product);
		} else {
			res.status(404).send({ message: 'Product Not Found' });
		}
	})
);

productRouter.post(
	'/create',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const product = new Product({
			name: req.body.name,
			images: {
				main: req.body.images.main,
				alternatives: req.body.images.alternatives,
			},
			price: req.body.price,
			quantity: req.body.quantity,
			description: req.body.description,
			status: req.body.status,
		});
		const createdProduct = await product.save();
		if (createdProduct) {
			res
				.status(202)
				.send({ message: 'Product Created', product: createdProduct });
		} else {
			res.status(404).send({ message: 'Product Not Created' });
		}
	})
);

productRouter.put(
	'/update',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const product = await Product.findById(req.body._id);

		if (product) {
			product.name = req.body.name;
			product.price = req.body.price;
			product.quantity = req.body.quantity;
			product.images.main = req.body.images.main;
			product.images.alternatives = req.body.images.alternatives;
			product.description = req.body.description;
			product.status = req.body.status;
			const updatedProduct = await product.save();

			res
				.status(202)
				.send({ message: 'Product Updated', product: updatedProduct });
		} else {
			res.status(404).send({ message: 'Product Not Found' });
		}
	})
);

productRouter.delete(
	'/:id/delete',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const product = await Product.findById(req.params.id);
		if (product) {
			await product.remove();
			res.status(202).send({ message: 'Product Deleted' });
		} else {
			res.status(404).send({ message: 'Product Not Found' });
		}
	})
);
productRouter.get(
	'/get/all',
	expressAsyncHandler(async (req, res) => {
		const products = await Product.find({});
		if (products) {
			res.status(202).send(products);
		} else {
			res.status(404).send({ message: 'No products' });
		}
	})
);
export default productRouter;
