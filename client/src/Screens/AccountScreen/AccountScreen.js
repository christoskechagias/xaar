import React from 'react';
import './AccountScreen.css';
import SidebarMenu from '../../Components/SidebarMenu/SidebarMenu';
import PrivateRoute from '../../Components/PrivateRoute/PrivateRoute';
import AdminRoute from '../../Components/AdminRoute/AdminRoute';
import ProfileSettings from '../../Components/ProfileSettings/ProfileSettings';
import Dashboard from '../../Components/Admin/Dashboard/Dashboard.js';
import UsersList from '../../Components/Admin/UsersList/UsersList.js';
import ProductsList from '../../Components/Admin/ProductsList/ProductsList.js';
import OrdersList from '../../Components/Admin/OrdersList/OrdersList';
import MyOrders from '../../Components/User/MyOrders/MyOrders';

const accountScreens = [
	{ id: 1, path: '/account/profile', component: ProfileSettings },
	{ id: 2, path: '/account/my-orders', component: MyOrders },
	{
		id: 2,
		type: 'admin',
		path: '/account/orders-list',
		component: OrdersList,
	},
	{ id: 3, type: 'admin', path: '/account/dashboard', component: Dashboard },
	{ id: 4, type: 'admin', path: '/account/users-list', component: UsersList },
	{
		id: 5,
		type: 'admin',
		path: '/account/products-list',
		component: ProductsList,
	},
];
function AccountScreen() {
	return (
		<div className="accountScreen">
			<div className="accountScreen__sidebar">
				<SidebarMenu />
			</div>
			<div>
				{accountScreens.map((screen) => {
					const { id, path, component, type } = screen;
					return (
						<div key={id}>
							{type == 'admin' ? (
								<AdminRoute exact path={path} component={component} />
							) : (
								<PrivateRoute exact path={path} component={component} />
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default AccountScreen;
