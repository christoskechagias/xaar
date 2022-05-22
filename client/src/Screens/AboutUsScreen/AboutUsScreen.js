import React from 'react';
import './AboutUsScreen.css';
function AboutUsScreen() {
	return (
		<div className="aboutUsScreen">
			<div className="aboutUsScreen__firstRowContainer">
				<p className="aboutUsScreen__firstRowTitle">
					Accessible, Effortless, Empowering
					<br />
				</p>
				<p>
					<br />
					XAAR The Brand a trendsetting online store, offering our first-rate
					products at affordable prices and
					<br /> exceptional customer service to shoppers from the comfort of
					their own homes.
					<br /> The line is simple, stylish and versatile, perfectly
					complimenting any mood or outfit.
				</p>
			</div>
			<div className="aboutUsScreen__secondRowContainer">
				<img
					className="aboutUsScreen__rowImage"
					src="https://static.wixstatic.com/media/db576e_60a4924b4b384a8b9afcd2ec68e8ac6d~mv2.jpg/v1/fill/w_792,h_495,al_c,q_85,usm_0.66_1.00_0.01/db576e_60a4924b4b384a8b9afcd2ec68e8ac6d~mv2.webp"
				/>
				<p className="aboutUsScreen__rowText">
					<span>Made for Each Woman</span>
					<br />
					<br />
					XAAR with its modern minimalist aesthetic has
					<br /> become synonymous with fashion, and we
					<br /> ensure a continuous variety of fantastic
					<br /> bags that fit any budget.
				</p>
			</div>
			<div className="aboutUsScreen__thirdRowContainer">
				<p className="aboutUsScreen__rowText">
					<span>Vegan Leather Bags</span>
					<br />
					<br />
					Sustainability is in XAAR's DNA.
					<br /> We use 100% eco-friendly,
					<br /> animal free materials.
				</p>
				<img
					className="aboutUsScreen__rowImage"
					src="https://static.wixstatic.com/media/db576e_6b95d63db7ef4661b32dc657240dcbb8~mv2.jpg/v1/fill/w_792,h_477,al_t,q_85,usm_0.66_1.00_0.01/db576e_6b95d63db7ef4661b32dc657240dcbb8~mv2.webp"
				/>
			</div>
		</div>
	);
}

export default AboutUsScreen;
