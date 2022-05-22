export const productsReducer = (state = { products: [] }, action) => {
	switch (action.type) {
		case 'PRODUCT_CREATE_REQUEST':
			return { ...state, loading: true };
		case 'PRODUCT_CREATE_SUCCESS':
			return {
				...state,
				loading: false,
				success: true,
				products: [...state.products, action.payload.product],
			};
		case 'PRODUCT_CREATE_FAIL':
			return { loading: false, error: action.payload };

		case 'PRODUCT_UPDATE_REQUEST':
			return { ...state, loading: true };
		case 'PRODUCT_UPDATE_SUCCESS':
			return { ...state, loading: false, success: true };
		case 'PRODUCT_UPDATE_FAIL':
			return { loading: false, error: action.payload };

		case 'PRODUCT_DELETE_REQUEST':
			return { ...state, loading: true };
		case 'PRODUCT_DELETE_SUCCESS':
			const deletedProductId = action.payload;
			return {
				...state,
				loading: false,
				success: true,
				products: state.products.filter(
					(product) => product._id != deletedProductId
				),
			};
		case 'PRODUCT_DELETE_FAIL':
			return { loading: false, error: action.payload };

		case 'GET_PRODUCTS_REQUEST':
			return { ...state, loading: true };
		case 'GET_PRODUCTS_SUCCESS':
			return { ...state, loading: false, products: action.payload };
		case 'GET_PRODUCTS_FAIL':
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const productReducer = (state = {}, action) => {
	switch (action.type) {
		case 'GET_PRODUCT_REQUEST':
			return { loading: true };
		case 'GET_PRODUCT_SUCCESS':
			return { loading: false, product: action.payload };
		case 'GET_PRODUCT_FAIL':
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
