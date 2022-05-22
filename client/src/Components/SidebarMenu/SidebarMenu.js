import React from 'react';
import { NavLink } from 'react-router-dom';
import './SidebarMenu.css';
import { logout } from '../../Redux/Actions/UserActions.js';
import { useDispatch, useSelector } from 'react-redux';

function SidebarMenu() {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state.user);
	const logoutHandler = () => {
		dispatch(logout());
	};
	return (
		<div className="sidebarMenu">
			{user?.isAdmin == true ? (
				<>
					<NavLink
						activeStyle={{ opacity: '0.6' }}
						id="customButton1"
						to="/account/dashboard"
					>
						Dashboard
					</NavLink>

					<NavLink
						activeStyle={{ opacity: '0.6' }}
						id="customButton1"
						to="/account/users-list"
					>
						Users List
					</NavLink>
					<NavLink
						activeStyle={{ opacity: '0.6' }}
						id="customButton1"
						to="/account/products-list"
					>
						Products List
					</NavLink>
					<NavLink
						activeStyle={{ opacity: '0.6' }}
						id="customButton1"
						to="/account/orders-list"
					>
						Orders List
					</NavLink>
					<NavLink
						id="customButton1"
						activeStyle={{ opacity: '0.6' }}
						to="/account/profile"
					>
						Profile
					</NavLink>
				</>
			) : (
				<>
					<NavLink
						id="customButton1"
						activeStyle={{ opacity: '0.6' }}
						to="/account/profile"
					>
						Profile
					</NavLink>
					<NavLink
						activeStyle={{ opacity: '0.6' }}
						id="customButton1"
						to="/account/my-orders"
					>
						My Orders
					</NavLink>
				</>
			)}

			<button
				id="customButton2"
				activeStyle={{ opacity: '0.6' }}
				onClick={logoutHandler}
				to="/account/#logout"
			>
				Logout
			</button>
		</div>
	);
}

export default SidebarMenu;
