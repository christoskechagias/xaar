import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

export default function AdminRoute({ component: Component, ...rest }) {
	const { user, loading } = useSelector((state) => state.user);
	return (
		<Route
			{...rest}
			render={(props) =>
				!loading &&
				(user.isAdmin ? (
					<Component {...props}></Component>
				) : (
					<Redirect to="/login" />
				))
			}
		></Route>
	);
}
