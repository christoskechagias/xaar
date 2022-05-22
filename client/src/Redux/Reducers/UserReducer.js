export const registerReducer = (state = {}, action) => {
	switch (action.type) {
		case 'USER_REGISTER_REQUEST':
			return { loading: true };
		case 'USER_REGISTER_SUCCESS':
			return { loading: false, userInfo: action.payload };
		case 'USER_REGISTER_FAIL':
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};

export const loginReducer = (state = {}, action) => {
	switch (action.type) {
		case 'USER_LOGIN_REQUEST':
			return { loading: true };
		case 'USER_LOGIN_SUCCESS':
			return { loading: false, success: true, userInfo: action.payload };
		case 'USER_LOGIN_FAIL':
			return { loading: false, error: action.payload };
		case 'USER_LOGOUT':
			return {};
		default:
			return state;
	}
};

//get-user
export const userReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case 'UPDATE_USER_NAME_REQUEST':
			return { ...state, loading: true };
		case 'UPDATE_USER_NAME_SUCCESS':
			return { ...state, loading: false, success: true, user: action.payload };
		case 'UPDATE_USER_NAME_FAIL':
			return { loading: false, error: action.payload };
		case 'UPDATE_USER_PASSWORD_REQUEST':
			return { loading: true };
		case 'UPDATE_USER_PASSWORD_SUCCESS':
			return { loading: false, success: true, user: action.payload };
		case 'UPDATE_USER_PASSWORD_FAIL':
			return { loading: false, error: action.payload };
		case 'GET_USER_REQUEST':
			return { ...state, loading: true };
		case 'GET_USER_SUCCESS':
			return { ...state, loading: false, user: action.payload };
		case 'GET_USER_FAIL':
			return { loading: false, error: action.payload };
		case 'DELETE_USER_REQUEST':
			return { loading: true };
		case 'DELETE_USER_SUCCESS':
			return { loading: false, successDelete: true };
		case 'DELETE_USER_FAIL':
			return { loading: false, error: true };
		default:
			return state;
	}
};

export const userListReducer = (state = {}, action) => {
	switch (action.type) {
		case 'GET_USERS_REQUEST':
			return { ...state, loading: true };
		case 'GET_USERS_SUCCESS':
			return { ...state, loading: false, users: action.payload };
		case 'GET_USERS_FAIL':
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
