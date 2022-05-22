import React, { useEffect, useState, Fragment } from 'react';
import './ProductScreen.css';
import { useDispatch, useSelector } from 'react-redux';
import { getProductAction } from '../../Redux/Actions/ProductActions.js';
import { addToCartAction } from '../../Redux/Actions/CartActions.js';
import CircularProgress from '@mui/material/CircularProgress';

function ProductScreen(props) {
	const productId = props.match.params.id;
	const dispatch = useDispatch();
	const { product, loading } = useSelector((state) => state.product);
	const [quantity, setQuantity] = useState(1);
	const [selectedImage, setSelectedImage] = useState(null);

	useEffect(() => {
		if (productId) {
			dispatch(getProductAction(productId));
		}
	}, [dispatch, productId]);

	useEffect(() => {
		if (product) {
			setSelectedImage(product.images.alternatives[0]);
		}
	}, [dispatch, product]);

	const addToCartHandler = () => {
		dispatch(addToCartAction(productId, quantity));
	};
	return (
		<div className="productScreen">
			{loading ? (
				<div className="loading">
					<CircularProgress size={50} style={{ color: '#c38874' }} />
				</div>
			) : (
				<Fragment>
					<div className="productScreen__imagesContainer">
						<img
							className="productScreen__mainImage"
							src={!selectedImage ? product?.images?.main : selectedImage}
						/>

						<div className="productScreen__alternativesImages">
							{product?.images?.alternatives.map((image, index) => {
								return (
									<img
										key={index}
										clas
										className={selectedImage == image && 'selected'}
										onClick={() => setSelectedImage(image)}
										src={image}
									/>
								);
							})}
						</div>
					</div>

					<div className="productScreen__detailsContainer">
						<p className="productScreen__name">{product?.name}</p>
						<p className="productScreen__price">{product?.price} €</p>
						<p className="productScreen__quantity">
							{product?.quantity > 0
								? `${product?.quantity} in stock`
								: 'Out of stock'}
						</p>

						<div
							id={product?.quantity == 0 && 'product__outOfStock'}
							className="productScreen__setQuantity"
						>
							<button
								disabled={quantity <= 1 || product?.quantity == 0}
								className="productScreen__quantityMinus"
								onClick={() => setQuantity(quantity - 1)}
							>
								-
							</button>
							<span>{quantity}</span>
							<button
								disabled={
									quantity >= product?.quantity || product?.quantity == 0
								}
								className="productScreen__quantityPlus"
								onClick={() => setQuantity(quantity + 1)}
							>
								+
							</button>
						</div>

						<button
							disabled={quantity == 0}
							onClick={addToCartHandler}
							className="productScreen__addToCart"
						>
							Add To Cart
						</button>
					</div>
				</Fragment>
			)}
		</div>
	);
}

export default ProductScreen;
