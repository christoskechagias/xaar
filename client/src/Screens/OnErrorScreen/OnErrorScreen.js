import React from 'react';
import './OnErrorScreen.css';
function ErrorScreen() {
	return (
		<div className="onErrorScreen">
			<img
				src={
					'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/OOjs_UI_icon_close-ltr-destructive.svg/768px-OOjs_UI_icon_close-ltr-destructive.svg.png'
				}
			/>
			<p>Sorry, Something went wrong!</p>
			<a href="/">Continue Shopping</a>
		</div>
	);
}

export default ErrorScreen;
