import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Footer.css';

function Footer() {
	return (
		<div className="footer">
			<div className="footer__links">
				<NavLink
					activeStyle={{ opacity: '0.6', textDecoration: 'underline' }}
					to="/shipping-and-payments"
				>
					Shipping & Payments
				</NavLink>
				<NavLink
					activeStyle={{ opacity: '0.6', textDecoration: 'underline' }}
					to="/returns"
				>
					Returns
				</NavLink>
				<NavLink
					activeStyle={{ opacity: '0.6', textDecoration: 'underline' }}
					to="/privacy"
				>
					Privacy Policy
				</NavLink>
			</div>

			<div className="footer__socialMedia">
				<a>
					<img src="https://static.wixstatic.com/media/0fdef751204647a3bbd7eaa2827ed4f9.png/v1/fill/w_24,h_24,al_c,q_85,usm_0.66_1.00_0.01/0fdef751204647a3bbd7eaa2827ed4f9.webp" />
				</a>
				<a>
					<img src="https://static.wixstatic.com/media/01c3aff52f2a4dffa526d7a9843d46ea.png/v1/fill/w_24,h_24,al_c,q_85,usm_0.66_1.00_0.01/01c3aff52f2a4dffa526d7a9843d46ea.webp" />
				</a>
			</div>
			<div className="footer__copyrights">
				<span>
					© 2022 XAAR The Brand | All rights reserved woman fashion bags.
				</span>
			</div>
		</div>
	);
}

export default Footer;
