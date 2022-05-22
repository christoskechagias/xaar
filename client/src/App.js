import React, { useEffect } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Components/Header/Header.js';
import Footer from './Components/Footer/Footer';
import LoginScreen from './Screens/LoginScreen/LoginScreen.js';
import RegisterScreen from './Screens/RegisterScreen/RegisterScreen';
import HomeScreen from './Screens/HomeScreen/HomeScreen';
import ProductsListScreen from './Screens/ProductsListScreen/ProductsListScreen.js';
import ProductScreen from './Screens/ProductScreen/ProductScreen.js';
import CartScreen from './Screens/CartScreen/CartScreen.js';
import PlaceOrderScreen from './Screens/PlaceOrderScreen/PlaceOrderScreen';
import ShippingScreen from './Screens/ShippingScreen/ShippingScreen';
import AboutUsScreen from './Screens/AboutUsScreen/AboutUsScreen';
import PrivacyScreen from './Screens/PrivacyScreen/PrivacyScreen.js';
import Page404Screen from './Screens/Page404Screen/Page404Screen';
import ReturnsScreen from './Screens/ReturnsScreen/ReturnsScreen.js';
import ShippingAndPaymentsScreen from './Screens/ShippingAndPaymentsScreen/ShippingAndPaymentsScreen.js';
import AccountScreen from './Screens/AccountScreen/AccountScreen';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute.js';
import OnApprove from './Screens/OnApproveScreen/OnApproveScreen.js';
import OnError from './Screens/OnErrorScreen/OnErrorScreen.js';
import { getUserAction } from './Redux/Actions/UserActions';
import AlertMessage from './Components/AlertMessage/AlertMessage.js';
function App() {
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.login);

	useEffect(() => {
		if (userInfo) {
			dispatch(getUserAction());
		}
	}, [dispatch, userInfo]);

	return (
		<BrowserRouter>
			<div className="app">
				<header>
					<Header />
					<AlertMessage />
				</header>
				<main className="main">
					<Switch>
						<Route path="/product/:id" component={ProductScreen} />
						<Route path="/cart/:id?" component={CartScreen} />
						<Route path="/approve" component={OnApprove} />
						<Route path="/error" component={OnError} />

						<Route path="/returns" component={ReturnsScreen} />
						<Route path="/privacy" component={PrivacyScreen} />
						<Route
							path="/shipping-and-payments"
							component={ShippingAndPaymentsScreen}
						/>

						<Route path="/about-us" component={AboutUsScreen} />
						<Route path="/bags" component={ProductsListScreen} />

						<Route exact path="/register" component={RegisterScreen} />
						<Route exact path="/login" component={LoginScreen} />

						<PrivateRoute path="/account/:path" component={AccountScreen} />
						<PrivateRoute path="/shipping" component={ShippingScreen} />
						<PrivateRoute path="/placeorder" component={PlaceOrderScreen} />

						<Route exact path="/" component={HomeScreen} />
						<Route exact path="*" component={Page404Screen} />
					</Switch>
				</main>
				<footer>
					<Footer />
				</footer>
			</div>
		</BrowserRouter>
	);
}

export default App;
