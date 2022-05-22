import axios from 'axios';
export const createOrderAction = (order) => async (dispatch, getState) => {
	dispatch({ type: 'CREATE_ORDER_REQUEST' });
	try {
		const {
			login: { userInfo },
		} = getState();

		const { data } = await axios.post(`/order/create`, order, {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		});
		dispatch({ type: 'CREATE_ORDER_SUCCESS', payload: data });
		dispatch({ type: 'CART_RESET', payload: [] });
		localStorage.removeItem('cartItems');
	} catch (error) {
		dispatch({
			type: 'CREATE_ORDER_FAIL',
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

export const getMyOrdersAction = () => async (dispatch, getState) => {
	dispatch({ type: 'GET_MY_ORDERS_REQUEST' });
	const {
		login: { userInfo },
	} = getState();
	try {
		const { data } = await axios.get(`/order/my/get/all`, {
			headers: { Authorization: `Bearer ${userInfo.token}` },
		});
		console.log(data);
		dispatch({ type: 'GET_MY_ORDERS_SUCCESS', payload: data });
	} catch (error) {
		dispatch({
			type: 'GET_MY_ORDERS_FAIL',
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
//Admin (get,update orders)
export const getOrdersAdminAction = () => async (dispatch, getState) => {
	dispatch({ type: 'GET_ORDERS_ADMIN_REQUEST' });
	const {
		login: { userInfo },
	} = getState();
	try {
		const { data } = await axios.get(`/order/get/all/admin`, {
			headers: { Authorization: `Bearer ${userInfo.token}` },
		});
		dispatch({ type: 'GET_ORDERS_ADMIN_SUCCESS', payload: data });
	} catch (error) {
		dispatch({
			type: 'GET_ORDERS_ADMIN_FAIL',
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
export const updateOrderAction =
	(orderId, deliveryStatus) => async (dispatch, getState) => {
		dispatch({ type: 'UPDATE_ORDER_REQUEST' });
		const {
			login: { userInfo },
		} = getState();
		try {
			const { data } = await axios.put(
				`/order/update`,
				{ orderId, deliveryStatus },
				{
					headers: { Authorization: `Bearer ${userInfo.token}` },
				}
			);
			dispatch({ type: 'UPDATE_ORDER_SUCCESS' });
			dispatch({
				type: 'ALERT_MESSAGE_SUCCESS',
				payload: data.message,
			});
		} catch (error) {
			dispatch({
				type: 'UPDATE_ORDER_FAIL',
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
