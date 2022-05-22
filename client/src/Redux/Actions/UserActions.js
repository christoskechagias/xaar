import axios from 'axios';
export const registerAction = (name, email, password) => async (dispatch) => {
	dispatch({ type: 'USER_REGISTER_REQUEST' });
	try {
		const { data } = await axios.post(`/user/register`, {
			name,
			email,
			password,
		});
		dispatch({ type: 'USER_REGISTER_SUCCESS', payload: data });
		dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: 'USER_REGISTER_FAIL',
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

export const loginAction = (email, password) => async (dispatch) => {
	dispatch({ type: 'USER_LOGIN_REQUEST' });
	try {
		const { data } = await axios.post(`/user/login`, {
			email,
			password,
		});
		dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
		localStorage.setItem('userInfo', JSON.stringify(data));
	} catch (error) {
		dispatch({
			type: 'USER_LOGIN_FAIL',
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

export const logout = () => async (dispatch) => {
	localStorage.removeItem('userInfo');
	localStorage.removeItem('cartItems');
	localStorage.removeItem('shippingAddress');
	dispatch({ type: 'USER_LOGOUT' });
	document.location.href = '/login';
};

//get-update-delete User
export const getUserAction = () => async (dispatch, getState) => {
	dispatch({ type: 'GET_USER_REQUEST' });
	const {
		login: { userInfo },
	} = getState();
	try {
		const { data } = await axios.get(`/user/get`, {
			headers: { Authorization: `Bearer ${userInfo?.token}` },
		});
		dispatch({ type: 'GET_USER_SUCCESS', payload: data });
	} catch (error) {
		dispatch({
			type: 'GET_USER_FAIL',
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

export const updateUserNameAction = (name) => async (dispatch, getState) => {
	dispatch({ type: 'UPDATE_USER_NAME_REQUEST' });
	const {
		login: { userInfo },
	} = getState();
	try {
		const { data } = await axios.put(`/user/name/update`, name, {
			headers: { Authorization: `Bearer ${userInfo.token}` },
		});
		dispatch({ type: 'UPDATE_USER_NAME_SUCCESS', payload: data.user });
		dispatch({
			type: 'ALERT_MESSAGE_SUCCESS',
			payload: data.message,
		});
	} catch (error) {
		dispatch({
			type: 'UPDATE_USER_NAME_FAIL',
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

export const updateUserPasswordAction =
	(password) => async (dispatch, getState) => {
		dispatch({ type: 'UPDATE_USER_PASSWORD_REQUEST' });
		const {
			login: { userInfo },
		} = getState();
		try {
			const { data } = await axios.put(
				`/user/password/update`,
				password,
				{
					headers: { Authorization: `Bearer ${userInfo.token}` },
				}
			);
			dispatch({ type: 'UPDATE_USER_PASSWORD_SUCCESS', payload: data });
			dispatch({
				type: 'ALERT_MESSAGE_SUCCESS',
				payload: data.message,
			});
		} catch (error) {
			dispatch({
				type: 'UPDATE_USER_PASSWORD_FAIL',
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
export const deleteUserAction = () => async (dispatch, getState) => {
	dispatch({ type: 'DELETE_USER_REQUEST' });
	const {
		login: { userInfo },
	} = getState();
	try {
		const { data } = await axios.delete(`/user/delete`, {
			headers: { Authorization: `Bearer ${userInfo.token}` },
		});
		dispatch({ type: 'DELETE_USER_SUCCESS' });
		dispatch({
			type: 'ALERT_MESSAGE_SUCCESS',
			payload: data.message,
		});
		localStorage.removeItem('userInfo');
		localStorage.removeItem('cartItems');
		localStorage.removeItem('shippingAddress');
	} catch (error) {
		dispatch({
			type: 'DELETE_USER_FAIL',
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

//Admin Actions(getUserList)
export const getUsersListAction = () => async (dispatch, getState) => {
	dispatch({ type: 'GET_USERS_REQUEST' });
	try {
		const {
			login: { userInfo },
		} = getState();
		const { data } = await axios.get(`/user/get/all`, {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		});
		dispatch({ type: 'GET_USERS_SUCCESS', payload: data });
	} catch (error) {
		dispatch({
			type: 'GET_USERS_FAIL',
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
