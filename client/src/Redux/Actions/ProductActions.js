import axios from 'axios';
export const getProductsAction = () => async (dispatch) => {
	dispatch({ type: 'GET_PRODUCTS_REQUEST' });
	try {
		const { data } = await axios.get(`/product/get/all`);
		dispatch({ type: 'GET_PRODUCTS_SUCCESS', payload: data });
	} catch (error) {
		dispatch({
			type: 'GET_PRODUCTS_FAIL',
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
		dispatch({
			type: 'ALERT_MESSAGE_ERROR',
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getProductAction = (productId) => async (dispatch) => {
	dispatch({
		type: 'GET_PRODUCT_REQUEST',
		payload: productId,
	});
	try {
		const { data } = await axios.get(`/product/${productId}/get`);
		dispatch({
			type: 'GET_PRODUCT_SUCCESS',
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: 'GET_PRODUCT_FAIL',
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
		dispatch({
			type: 'ALERT_MESSAGE_ERROR',
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
export const createProductAction =
	(newProduct) => async (dispatch, getState) => {
		dispatch({ type: 'PRODUCT_CREATE_REQUEST' });
		const {
			login: { userInfo },
		} = getState();
		try {
			const { data } = await axios.post(`/product/create`, newProduct, {
				headers: { Authorization: `Bearer ${userInfo.token}` },
			});
			dispatch({
				type: 'PRODUCT_CREATE_SUCCESS',
				payload: data,
			});
			dispatch({
				type: 'ALERT_MESSAGE_SUCCESS',
				payload: data.message,
			});
		} catch (error) {
			dispatch({
				type: 'PRODUCT_CREATE_FAIL',
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
			dispatch({
				type: 'ALERT_MESSAGE_ERROR',
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};

export const updateProductAction = (product) => async (dispatch, getState) => {
	dispatch({ type: ' PRODUCT_UPDATE_REQUEST' });
	const {
		login: { userInfo },
	} = getState();
	try {
		const { data } = await axios.put(`/product/update`, product, {
			headers: { Authorization: `Bearer ${userInfo.token}` },
		});
		dispatch({ type: 'PRODUCT_UPDATE_SUCCESS', payload: data });
		dispatch({
			type: 'ALERT_MESSAGE_SUCCESS',
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: 'PRODUCT_UPDATE_FAIL',
			error:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
		dispatch({
			type: 'ALERT_MESSAGE_ERROR',
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const deleteProductAction =
	(productId) => async (dispatch, getState) => {
		dispatch({ type: 'PRODUCT_DELETE_REQUEST' });
		const {
			login: { userInfo },
		} = getState();
		try {
			const { data } = await axios.delete(
				`/product/${productId}/delete`,
				{
					headers: { Authorization: `Bearer ${userInfo.token}` },
				}
			);
			dispatch({ type: 'PRODUCT_DELETE_SUCCESS', payload: productId });
			dispatch({
				type: 'ALERT_MESSAGE_SUCCESS',
				payload: data.message,
			});
		} catch (error) {
			dispatch({
				type: 'PRODUCT_DELETE_FAIL',
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
			dispatch({
				type: 'ALERT_MESSAGE_ERROR',
				payload:
					error.response && error.response.data.message
						? error.response.data.message
						: error.message,
			});
		}
	};
