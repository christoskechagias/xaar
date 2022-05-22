import React from 'react';
import './ShippingAndPaymentsScreen.css';
function ShippingAndPaymentsScreen() {
	return (
		<div className="shippingAndPayments">
			<span className="shippingAndPayments__title">Shipping & Payments</span>
			<span className="shippingAndPayments__text">
				The following <b>shipping methods</b> are available for your orders: ​
				<br />
				<br />
				<b>
					<u>Greece</u>
				</b>
				<br /> Via ELTA COURIER Expected delivery time is 2 to 4 working
				days,depending on the location. ​ <br />
				<br />
				<b>
					<u>Worldwide</u>
				</b>
				<br />
				Via Hellenic Post Mail Expected delivery time is 5 to 15 working days
				depending on the location.
				<br />
				<br />
				​Custom clearance,extreme weather conditions ,strikes,and any case of
				force majeure might affect the transport and delivery of your order. In
				case that your order is delayed for any reason, you may contact us, so
				that we can inform you about the exact delivery time. XAAR is not
				responsible for duties or tariffs imposed by the destination country
				customs.
				<br />
				<br /> <br />
				The following <b>payment options</b> are available to make your
				purchases: <br />
				<br />​<b>- Paypal: </b>​Pay safe via your account.
				<br /> <br />
				<b>- Credit card:</b> The redemption option of ordering by credit OR
				debit or prepaid card, will be completed in a completely safe and
				controlled environment to ensure the confidentiality of the data of the
				transaction. The credit card details are not stored in any way by the
				systems of XAAR The Brand.
			</span>
		</div>
	);
}

export default ShippingAndPaymentsScreen;
