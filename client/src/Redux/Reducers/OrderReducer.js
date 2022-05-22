export const createOrderReducer = (state = {}, action) => {
	switch (action.type) {
		case 'CREATE_ORDER_REQUEST':
			return { loading: true };
		case 'CREATE_ORDER_SUCCESS':
			return {
				loading: false,
				success: true,
				order: action.payload.order,
			};
		case 'CREATE_ORDER_FAIL':
			return { loading: false, error: true };
		case 'CREATE_ORDER_RESET':
			return {};
		default:
			return state;
	}
};
export const myOrdersReducer = (state = {}, action) => {
	switch (action.type) {
		case 'GET_MY_ORDERS_REQUEST':
			return { loading: true };
		case 'GET_MY_ORDERS_SUCCESS':
			return { loading: false, orders: action.payload };
		case 'GET_MY_ORDERS_FAIL':
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
//ADMIN (getAllOrders,UpdateOrder)
export const updateOrderReducer = (state = {}, action) => {
	switch (action.type) {
		case 'UPDATE_ORDER_REQUEST':
			return { loading: true };
		case 'UPDATE_ORDER_SUCCESS':
			return { loading: false, success: true };
		case 'UPDATE_ORDER_FAIL':
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
export const ordersAdminReducer = (state = {}, action) => {
	switch (action.type) {
		case 'GET_ORDERS_ADMIN_REQUEST':
			return { loading: true };
		case 'GET_ORDERS_ADMIN_SUCCESS':
			return { loading: false, orders: action.payload };
		case 'GET_ORDERS_ADMIN_FAIL':
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
