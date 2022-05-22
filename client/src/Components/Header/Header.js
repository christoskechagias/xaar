import React, { useState } from 'react';
import './Header.css';
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Avatar } from '@mui/material';
import { GiHamburgerMenu } from 'react-icons/gi';
import SidebarMenu from '../SidebarMenu/SidebarMenu';

function Header() {
	const { user } = useSelector((state) => state.user);
	const { cartItems } = useSelector((state) => state.cart);
	const [sidebarMenu, setSidebarMenu] = useState(false);
	return (
		<div className="header">
			<p className="header__freeShippingText">
				FREE SHIPPING TO GREECE OVER 50€
			</p>

			<div className="header__menu">
				<div className="header__leftSide">
					<NavLink to="/">
						<p className="header__logo">XAAR</p>
					</NavLink>
				</div>
				<div className="header__rightSide">
					<div className="header__links">
						<NavLink
							activeStyle={{ opacity: '0.6', textDecoration: 'underline' }}
							to="/bags"
						>
							Bags
						</NavLink>

						<NavLink
							activeStyle={{ opacity: '0.6', textDecoration: 'underline' }}
							to="/about-us"
						>
							About Us
						</NavLink>
						<NavLink
							activeStyle={{ opacity: '0.6', textDecoration: 'underline' }}
							to="/cart"
						>
							<img
								src="https://img.icons8.com/ios/452/shopping-bag--v1.png"
								className="shoppingCartIcon"
							/>
							<span className="badge">{cartItems?.length}</span>
						</NavLink>
						{user?.isAdmin == false ? (
							<NavLink className="header__avatar" to="/account/profile">
								<Avatar
									style={{
										backgroundColor: '#b87f6c',
										color: 'black',
										width: '35px',
										height: '35px',
									}}
								>
									{user?.name[0]}
								</Avatar>
							</NavLink>
						) : user?.isAdmin == true ? (
							<NavLink className="header__avatar" to="/account/dashboard">
								<Avatar
									style={{
										backgroundColor: '#b87f6c',
										color: 'black',
										width: '35px',
										height: '35px',
									}}
								>
									{user?.name[0]}
								</Avatar>
							</NavLink>
						) : (
							<Link to="/login">
								<span>Login</span>
							</Link>
						)}
						<div className="header__sidebarButton">
							<GiHamburgerMenu onClick={() => setSidebarMenu(!sidebarMenu)} />
						</div>
					</div>
				</div>
			</div>

			{sidebarMenu && (
				<div className="header__sidebarMenu">
					<SidebarMenu />
				</div>
			)}
		</div>
	);
}

export default Header;
