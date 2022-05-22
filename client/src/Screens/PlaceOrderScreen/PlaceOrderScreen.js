import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createOrderAction } from '../../Redux/Actions/OrderActions.js';
import './PlaceOrderScreen.css';

function PlaceOrder(props) {
	const dispatch = useDispatch();
	const { success } = useSelector((state) => state.createOrder);
	const cart = useSelector((state) => state.cart);
	const { cartItems, shippingAddress } = cart;
	const paypalRef = useRef();
	const toPrice = (num) => Number(num.toFixed(2));
	cart.itemsPrice = toPrice(
		cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
	);
	cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
	cart.shippingPrice = cart.itemsPrice > 50 ? toPrice(0) : toPrice(10);
	cart.totalPrice = cart.itemsPrice + cart.shippingPrice;
	const shippingFields = [
		{
			name: 'First name',
			value: shippingAddress?.firstName,
		},
		{
			name: 'Last name',
			value: shippingAddress.lastName,
		},
		{
			name: 'Address',
			value: shippingAddress?.address,
		},
		{
			name: 'Postal Code',
			value: shippingAddress?.postalCode,
		},
		{
			name: 'City',
			value: shippingAddress?.city,
		},
		{
			name: 'Country',
			value: shippingAddress?.country,
		},
	];
	useEffect(() => {
		window.paypal
			.Buttons({
				createOrder: (data, actions, err) => {
					return actions.order.create({
						application_context: { shipping_preference: 'NO_SHIPPING' },
						intent: 'CAPTURE',
						purchase_units: [
							{
								amount: {
									value: cartItems.reduce(
										(a, c) => a + c.price * c.quantity,
										0
									),
								},
							},
						],
					});
				},
				onApprove: async (data, actions) => {
					await actions.order.capture().then((res) => res);
					dispatch(createOrderAction({ ...cart, orderItems: cart?.cartItems }));
				},
				onError: (err) => {
					props.history.replace('/error');
				},
			})
			.render(paypalRef.current);
	}, []);

	useEffect(() => {
		if (success) {
			dispatch({ type: 'CREATE_ORDER_RESET' });
			props.history.push('/approve');
		}
	}, [dispatch, success]);

	return (
		<div className="placeOrderScreen">
			<div className="placeOrderScreen__leftSide">
				<div className="placeOrderScreen__customerInfoContainer">
					{shippingFields?.map((field, index) => {
						const { name, value } = field;
						return (
							<div key={index}>
								<p>{name}:</p>
								<p>{value}</p>
							</div>
						);
					})}
				</div>
				<div className="placeOrderScreen__cart">
					{cartItems?.map((item) => {
						const { id, name, mainImage, price, quantity } = item;
						return (
							<div key={id} className="placeOrderScreen__item">
								<img src={mainImage} />
								<p>
									{name}
									<br />
									<span>{price}€</span>
								</p>
								<p className="placeOrderScreen__itemQuantity">x{quantity}</p>
							</div>
						);
					})}
				</div>
			</div>
			<div className="placeOrderScreen__rightSide">
				<div className="placeOrderScreen__yourOrder">
					<p className="placeOrderScreen__yourOrderTitle">YOUR ORDER</p>
					<div className="placeOrderScreen__order">
						<p>
							Order Value ({cartItems?.reduce((a, c) => a + c.quantity, 0)}{' '}
							items)
						</p>
						<p>
							{cartItems
								?.reduce((a, c) => a + c.price * c.quantity, 0)
								.toFixed(2)}
							€
						</p>
					</div>
					<div className="placeOrderScreen__delivery">
						<p>Delivery Value</p>
						<p>
							{cart.shippingPrice === 0 ? 'FREE' : `${cart.shippingPrice}€`}
						</p>
					</div>
					<div className="placeOrderScreen__total">
						<p>Total </p>
						<p>{cart?.totalPrice.toFixed(2)}€</p>
					</div>
				</div>
				<div className="placeOrderScreen__paymentMethod">
					{cartItems?.length > 0 && <div ref={paypalRef} />}
				</div>
			</div>
		</div>
	);
}

export default PlaceOrder;
