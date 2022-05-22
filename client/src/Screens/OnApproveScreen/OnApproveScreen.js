import React from 'react';
import approve from '../../assets/Approve.png';
import './OnApproveScreen.css';
import { Link } from 'react-router-dom';
function OnApproveScreen() {
	return (
		<div className="onApproveScreen">
			<img src={approve} />
			<p>Thank you for your purchase!</p>
			<Link to="/">Continue Shopping</Link>
		</div>
	);
}

export default OnApproveScreen;
