export const alertMessageReducer = (state = {}, action) => {
	switch (action.type) {
		case 'ALERT_MESSAGE_SUCCESS':
			return { success: true, message: action.payload };
		case 'ALERT_MESSAGE_ERROR':
			return { error: true, message: action.payload };
		case 'RESET_ALERT_MESSAGE':
			return {};
		default:
			return state;
	}
};
