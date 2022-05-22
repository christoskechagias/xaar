import React, { useEffect, useState } from 'react';
import { input } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { saveShippingAddressAction } from '../../Redux/Actions/CartActions';
import './ShippingScreen.css';

function Shipping(props) {
	const dispatch = useDispatch();
	const { shippingAddress, cartItems } = useSelector((state) => state.cart);
	const { userInfo } = useSelector((state) => state.login);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [address, setAddress] = useState('');
	const [postalCode, setPostalCode] = useState('');
	const [city, setCity] = useState('');
	const [country, setCountry] = useState('');
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(
			saveShippingAddressAction({
				firstName,
				lastName,
				email,
				address,
				postalCode,
				city,
				country,
			})
		);
		props.history.replace('/placeorder');
	};

	useEffect(() => {
		if (shippingAddress) {
			setEmail(shippingAddress.email);
			setFirstName(shippingAddress.firstName);
			setLastName(shippingAddress.lastName);
			setAddress(shippingAddress.address);
			setPostalCode(shippingAddress.postalCode);
			setCity(shippingAddress.city);
			setCountry(shippingAddress.country);
		}
	}, [userInfo]);

	return (
		<form className="shippingScreen" onSubmit={submitHandler}>
			<div className="shippingScreen_input">
				<input
					id="customInput1"
					required
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					type="text"
					placeholder="First Name"
				/>

				<input
					id="customInput1"
					required
					value={lastName}
					onChange={(e) => setLastName(e.target.value)}
					type="text"
					placeholder="Last Name"
				/>

				<input
					id="customInput1"
					required
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
				/>

				<input
					id="customInput1"
					required
					value={address}
					onChange={(e) => setAddress(e.target.value)}
					type="text"
					placeholder="Address"
				/>

				<input
					id="customInput1"
					required
					value={postalCode}
					onChange={(e) => setPostalCode(e.target.value)}
					type="text"
					placeholder="Postal Cose"
				/>

				<input
					id="customInput1"
					required
					value={city}
					onChange={(e) => setCity(e.target.value)}
					type="text"
					placeholder="City"
				/>

				<input
					id="customInput1"
					required
					value={country}
					onChange={(e) => setCountry(e.target.value)}
					type="text"
					placeholder="Country"
				/>
			</div>

			<div className="shippingScreen__subTotal">
				<div className="shippingScreen__subTotalTitlePrice">
					<span className="shippingScreen__subTotalTitle">SubTotal</span>
					<span className="cart__subTotalPrice">
						{cartItems.reduce((a, c) => a + c.price * c.quantity, 0).toFixed(2)}
						€
					</span>
				</div>

				<button className="shippingScreen__continueButton" type="submit">
					Continue
				</button>
			</div>
		</form>
	);
}

export default Shipping;
