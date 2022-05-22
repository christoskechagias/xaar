import React from 'react';
import './Page404Screen.css';
function Page404Screen() {
	return (
		<div className="page404">
			<span className="page404__oops">Oops!</span>
			<span className="page404__pageNotFound">404 - PAGE NOT FOUND</span>
			<a href="/">Take Me Home</a>
		</div>
	);
}

export default Page404Screen;
