import axios from 'axios';
export const addToCartAction =
	(productId, quantity) => async (dispatch, getState) => {
		const { data } = await axios.get(`/product/${productId}/get`);
		dispatch({
			type: 'ADD_TO_CART',
			payload: {
				id: data._id,
				name: data.name,
				price: data.price,
				description: data.description,
				mainImage: data.images.main,
				quantity,
			},
		});
		localStorage.setItem(
			'cartItems',
			JSON.stringify(getState().cart.cartItems)
		);
	};

export const removeFromCartAction = (productId) => (dispatch, getState) => {
	dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
	localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddressAction = (data) => (dispatch) => {
	dispatch({ type: 'CART_SAVE_SHIPPING_ADDRESS', payload: data });
	localStorage.setItem('shippingAddress', JSON.stringify(data));
};
