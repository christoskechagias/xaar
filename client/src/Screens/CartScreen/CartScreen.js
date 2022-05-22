import React, { Fragment } from 'react';
import './CartScreen.css';
import { useSelector, useDispatch } from 'react-redux';
import ClearIcon from '@material-ui/icons/Clear';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from 'react-router-dom';
import {
	addToCartAction,
	removeFromCartAction,
} from '../../Redux/Actions/CartActions.js';

function Cart(props) {
	const dispatch = useDispatch();
	const { cartItems, loading } = useSelector((state) => state.cart);
	const removeFromCartHandler = (id) => {
		dispatch(removeFromCartAction(id));
	};

	return (
		<>
			{cartItems.length === 0 ? (
				<div className="cart__empty">
					<span>Cart is empty</span>
					<Link to="/">Continue Shopping</Link>
				</div>
			) : (
				<Fragment>
					{loading ? (
						<div className="loading">
							<CircularProgress size={50} style={{ color: '#c38874' }} />
						</div>
					) : (
						<Fragment>
							<div className="cart">
								<div className="cart__myCart">
									<div className="cart__header">
										<parent>My Cart</parent>
										<Link to="/bags">Continue Shopping</Link>
									</div>
									{cartItems.map((item, id) => (
										<div key={id} className="cart__item">
											<div className="cart__itemImageNamePrice">
												<a
													href={`product/${item.id}`}
													className="cart__itemName"
												>
													<img src={item.mainImage} />
												</a>

												<div className="cart__itemDetails">
													<a
														href={`product/${item.id}`}
														className="cart__itemName"
													>
														{item.name}
													</a>
													<span className="cart__itemPrice">{item.price}€</span>
													<div className="cart__setQuantity">
														<button
															disabled={item.quantity <= 1}
															className="cart__quantityMinus"
															onClick={() =>
																dispatch(
																	addToCartAction(
																		item.id,
																		Number(item.quantity - 1)
																	)
																)
															}
														>
															-
														</button>
														<span>{item.quantity}</span>
														<button
															disabled={item.quantity >= 10}
															className="cart__quantityPlus"
															onClick={() =>
																dispatch(
																	addToCartAction(
																		item.id,
																		Number(item.quantity + 1)
																	)
																)
															}
														>
															+
														</button>
													</div>
												</div>
											</div>
											<div className="cart__itemPriceAndClearIcon">
												{(item.quantity * item.price).toFixed(2)}€
												<div
													onClick={() => removeFromCartHandler(item.id)}
													className="cart__clearIcon"
												>
													<ClearIcon />
												</div>
											</div>
										</div>
									))}
								</div>
								<div className="cart__subTotal">
									<div className="cart__subTotalTitleprice">
										<span className="cart__subTotalTitle">SubTotal</span>
										<span className="cart__subTotalPrice">
											{cartItems
												.reduce((a, c) => a + c.price * c.quantity, 0)
												.toFixed(2)}
											€
										</span>
									</div>

									<button
										className="cart__continueButton"
										onClick={() =>
											props.history.push('/login?redirect=shipping')
										}
									>
										Continue
									</button>
								</div>
							</div>
						</Fragment>
					)}
				</Fragment>
			)}
		</>
	);
}

export default Cart;
