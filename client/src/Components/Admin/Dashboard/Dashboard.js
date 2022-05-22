import React, { useEffect, Fragment } from 'react';
import './Dashboard.css';
import { useDispatch, useSelector } from 'react-redux';
import ApexChart from '../../Charts/ApexChart';
import { getOrdersAdminAction } from '../../../Redux/Actions/OrderActions.js';
import CircularProgress from '@mui/material/CircularProgress';

function Dashboard() {
	const dispatch = useDispatch();
	const { loading, orders } = useSelector((state) => state.ordersAdmin);
	const date = [];
	const salesPerDay = [];
	const totalOrdersPerDay = [];
	let dateMap = [];
	var result = [];

	useEffect(() => {
		dispatch(getOrdersAdminAction());
	}, [dispatch]);

	const getDateFormat = (date) => {
		return (
			new Date(date).getDate() +
			'/' +
			(new Date(date).getMonth() + 1) +
			'/' +
			new Date(date).getFullYear()
		);
	};
	return (
		<div className="dashboard">
			{loading ? (
				<div className="loading">
					<CircularProgress size={50} style={{ color: '#c38874' }} />
				</div>
			) : (
				<Fragment>
					<div className="dashboard__salesPerDayChart">
						<ApexChart
							id="netSales"
							name="€"
							title="Sales Per Day"
							x={date}
							y={salesPerDay}
						/>
					</div>
					<div className="dashboard__ordersPerDayChart">
						<ApexChart
							id="orders"
							title="Orders Per Day"
							x={date}
							y={totalOrdersPerDay}
							name="Orders"
						/>
					</div>
					{orders?.forEach((order) => {
						let tempDate = getDateFormat(order.paidAt);
						<div>
							{dateMap.push({
								date: tempDate,
								value: parseInt(order.totalPrice.toFixed(2)),
								index: 1,
							})}
						</div>;
					})}

					{dateMap?.forEach(function (obj, key) {
						var id = obj.date;
						if (!this[id]) result.push((this[id] = obj));
						else {
							this[id].value += obj.value;
							this[id].index += 1;
						}
					}, Object.create(null))}
					{result?.forEach((obj) => {
						date.push(obj.date);
						salesPerDay.push(obj.value);
						totalOrdersPerDay.push(parseInt(obj.index));
					})}
				</Fragment>
			)}
		</div>
	);
}

export default Dashboard;
