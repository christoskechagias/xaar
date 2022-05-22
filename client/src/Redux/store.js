import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import {
	loginReducer,
	registerReducer,
	userReducer,
	userListReducer,
} from './Reducers/UserReducer.js';
import { productsReducer, productReducer } from './Reducers/ProductReducer.js';
import { cartReducer } from './Reducers/CartReducers.js';
import {
	myOrdersReducer,
	updateOrderReducer,
	ordersAdminReducer,
	createOrderReducer,
} from './Reducers/OrderReducer.js';
import { alertMessageReducer } from './Reducers/AlertMessageReducers';
const initialState = {
	login: {
		userInfo:
			localStorage.getItem('userInfo') &&
			JSON.parse(localStorage.getItem('userInfo')),
	},

	cart: {
		cartItems: localStorage.getItem('cartItems')
			? JSON.parse(localStorage.getItem('cartItems'))
			: [],
		shippingAddress: localStorage.getItem('shippingAddress')
			? JSON.parse(localStorage.getItem('shippingAddress'))
			: [],
	},
};

const reducer = combineReducers({
	alertMessage: alertMessageReducer,

	register: registerReducer,
	login: loginReducer,
	user: userReducer,
	userList: userListReducer,

	cart: cartReducer,

	products: productsReducer,
	product: productReducer,

	createOrder: createOrderReducer,
	myOrders: myOrdersReducer,
	updateOrder: updateOrderReducer,
	ordersAdmin: ordersAdminReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
	reducer,
	initialState,
	composeEnhancer(applyMiddleware(thunk))
);

export default store;
