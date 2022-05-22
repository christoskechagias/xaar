export const cartReducer = (state = { cartItems: [] }, action) => {
	switch (action.type) {
		case 'ADD_TO_CART':
			const item = action.payload;
			const existItem = state.cartItems.find((x) => x.id === item.id);
			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map((x) =>
						x.id === existItem.id ? item : x
					),
				};
			} else {
				return {
					...state,
					loading: false,
					cartItems: [...state.cartItems, item],
				};
			}
		case 'REMOVE_FROM_CART':
			return {
				...state,
				loading: false,
				cartItems: state.cartItems.filter((x) => x.id !== action.payload),
			};
		case 'CART_SAVE_SHIPPING_ADDRESS':
			return { ...state, shippingAddress: action.payload };
		case 'CART_RESET':
			return { cartItems: [] };
		default:
			return state;
	}
};
