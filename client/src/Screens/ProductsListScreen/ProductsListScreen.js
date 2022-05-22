import React, { useEffect, useState, Fragment } from 'react';
import './ProductsListScreen.css';
import { getProductsAction } from '../../Redux/Actions/ProductActions';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../../Components/ProductCard/ProductCard';
import CircularProgress from '@mui/material/CircularProgress';

function ProductsListScreen() {
	const [typeOfSort, setTypeOfSort] = useState('newArrivals');
	const dispatch = useDispatch();
	const { products, loading } = useSelector((state) => state.products);
	useEffect(() => {
		dispatch(getProductsAction());
	}, [dispatch]);
	return (
		<Fragment>
			{loading ? (
				<div className="loading">
					<CircularProgress size={50} style={{ color: '#c38874' }} />
				</div>
			) : (
				<Fragment>
					<div className="productListScreen_headerContainer">
						<p>BAGS</p>
						<img src="https://static.wixstatic.com/media/db576e_abb994ac459148eb8dfa0fd0852462a7~mv2.jpg/v1/fill/w_1031,h_500,al_c,q_85,usm_0.66_1.00_0.01/db576e_abb994ac459148eb8dfa0fd0852462a7~mv2.webp" />
					</div>
					<div className="productListScreen_sortingOptions">
						<select
							value={typeOfSort}
							onChange={(e) => setTypeOfSort(e.target.value)}
						>
							<option value="onSale">On Sale</option>
							<option value="newArrivals">New Arrivals</option>
							<option value="lowestPrice">Price: Low to High</option>
							<option value="highestPrice">Price: High to Low</option>
						</select>
					</div>

					<div className="productListScreen_products">
						{products
							?.sort((a, b) =>
								typeOfSort === 'lowestPrice'
									? a.price > b.price
										? 1
										: -1
									: typeOfSort === 'highestPrice'
									? a.price < b.price
										? 1
										: -1
									: typeOfSort === 'newArrivals'
									? a.newArrival < b.newArrival
										? 1
										: -1
									: a.onSale < b.onSale
									? 1
									: -1
							)
							.map((product) => {
								const { _id, name, price, quantity, images, status } = product;
								return (
									<div className="productListScreen_product" key={_id}>
										<ProductCard
											productId={_id}
											productName={name}
											productQuantity={quantity}
											productPrice={price}
											productImages={images}
											status={status}
										/>
									</div>
								);
							})}
					</div>
				</Fragment>
			)}
		</Fragment>
	);
}

export default ProductsListScreen;
