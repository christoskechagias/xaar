import React from 'react';
import img1 from '../../assets/1.png';
import img2 from '../../assets/img2.jpg';
import img3 from '../../assets/img3.jpg';
import img4 from '../../assets/img4.jpg';
import img5 from '../../assets/img5.jpg';
import img6 from '../../assets/img6.jpg';
import img7 from '../../assets/img7.jpg';
import './HomeScreen.css';

function Home() {
	return (
		<div className="home">
			<div className="home__top">
				<img src={img1} />
				<a href="/bags">
					<b>New Collection</b>
				</a>
			</div>
			<div className="home__middle">
				<div className="home__bestSellers">
					<img src={img2} />
					<a className="home__bestSellersLink" href="/bags">
						<b>Best Sellers</b>
					</a>
				</div>

				<div className="home__newArrivals">
					<img src={img3} />
					<a className="home__newArrivalsLink" href="/bags">
						<b>New Arrivals</b>
					</a>
				</div>
			</div>
			<div className="home__latestArrivalsText">
				<b>LATEST ARRIVALS</b>
			</div>
			<div className="home__bottom">
				<img src={img4} />
				<img src={img5} />
				<img src={img6} />
				<img src={img7} />
			</div>
		</div>
	);
}

export default Home;
