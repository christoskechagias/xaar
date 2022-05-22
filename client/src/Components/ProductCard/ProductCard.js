import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({
	productId,
	productName,
	productQuantity,
	productPrice,
	productImages,
	status,
}) {
	const [hoverImage, setHoverImage] = useState();
	return (
		<div className="productCard">
			<Link to={`/product/${productId}`} key={productId}>
				{productQuantity > 0 ? (
					<>
						{status == 2 ? (
							<span className="newArrivalLabel">New Arrival</span>
						) : (
							status == 1 && <span className="onSaleLabel">On Sale</span>
						)}
					</>
				) : (
					<span className="outOfStockLabel">Out Of Stock</span>
				)}
				<div className="productCard__images">
					<img
						onMouseOver={() => setHoverImage(productImages.alternatives[1])}
						onMouseOut={() => setHoverImage()}
						src={hoverImage ? hoverImage : productImages.main}
					/>
				</div>
				<div className="productCard__nameAndPrice">
					<p className="productCard__name">{productName}</p>
					<p className="productCard__price">{productPrice}€</p>
				</div>
			</Link>
		</div>
	);
}

export default ProductCard;
