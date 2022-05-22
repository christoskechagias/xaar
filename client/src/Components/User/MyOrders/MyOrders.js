import React, { useEffect, useState, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrdersAction } from '../../../Redux/Actions/OrderActions.js';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CircularProgress from '@mui/material/CircularProgress';
import './MyOrders.css';

function createData(
	_id,
	createdAt,
	isPaid,
	deliveryStatus,
	totalPrice,
	shippingAddress,
	orderItems
) {
	return {
		_id,
		createdAt,
		isPaid,
		deliveryStatus,
		totalPrice,
		shippingAddress,
		orderItems,
	};
}

export default function MyOrders() {
	const rows = [];
	const dispatch = useDispatch();
	const [typeOfSort, setTypeOfSort] = useState('newest');
	const { loading, orders } = useSelector((state) => state.myOrders);

	useEffect(() => {
		dispatch(getMyOrdersAction());
	}, [dispatch]);

	return (
		<div className="ordersList">
			{loading ? (
				<div className="loading">
					<CircularProgress size={50} style={{ color: '#c38874' }} />
				</div>
			) : (
				<Fragment>
					{orders?.map((order) => {
						const {
							_id,
							createdAt,
							isPaid,
							deliveryStatus,
							totalPrice,
							shippingAddress,
							orderItems,
						} = order;
						rows.push(
							createData(
								_id,
								createdAt,
								isPaid,
								deliveryStatus,
								totalPrice,
								shippingAddress,
								orderItems
							)
						);
					})}
					<TableContainer className="ordersList__tableContainer">
						<Table>
							<TableHead className="ordersList__tableHead">
								<TableRow>
									<TableCell>
										<select
											className="ordersList__sorting"
											value={typeOfSort}
											onChange={(e) => setTypeOfSort(e.target.value)}
										>
											<option value="newest">Newest Orders</option>
											<option value="deliveryStatus">
												Delivary Status is FALSE
											</option>
										</select>
									</TableCell>
									<TableCell align="center">Order Id</TableCell>
									<TableCell align="center">Created At</TableCell>
									<TableCell align="center">Is Paid</TableCell>
									<TableCell align="center">Delivery Status</TableCell>
									<TableCell align="center">Total Price</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows
									.sort((a, b) => {
										if (typeOfSort == 'newest') {
											if (
												new Date(a.createdAt).getTime() <
												new Date(b.createdAt).getTime()
											) {
												return 1;
											} else {
												return -1;
											}
										} else if (typeOfSort === 'deliveryStatus') {
											if (a.deliveryStatus == false) {
												return -1;
											} else {
												return 1;
											}
										}
									})
									.map((row) => (
										<Row key={row._id} row={row} />
									))}
							</TableBody>
						</Table>
					</TableContainer>
				</Fragment>
			)}
		</div>
	);
}

function Row(props) {
	const { row } = props;
	const { isPaid, totalPrice, createdAt, shippingAddress, deliveryStatus } =
		row;
	const [open, setOpen] = useState(false);

	return (
		<Fragment>
			<TableRow>
				<TableCell>
					<IconButton size="small" onClick={() => setOpen(!open)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell>{row._id}</TableCell>
				<TableCell align="center">
					{new Date(createdAt).getDate()}/{new Date(createdAt).getMonth() + 1}/
					{new Date(createdAt).getFullYear()}
				</TableCell>
				<TableCell align="center">{String(isPaid).toUpperCase()}</TableCell>
				<TableCell align="center">
					{String(deliveryStatus).toUpperCase()}
				</TableCell>
				<TableCell align="center">{totalPrice.toFixed(2)} €</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
					<Collapse in={open}>
						<Typography>Customer Information</Typography>
						<Table size="small">
							<TableHead>
								<TableRow>
									<TableCell align="center">First Name</TableCell>
									<TableCell align="center">Last Name</TableCell>
									<TableCell align="center">Email</TableCell>
									<TableCell align="center">Address</TableCell>
									<TableCell align="center">Postal Code</TableCell>
									<TableCell align="center">City</TableCell>
									<TableCell align="center">Country</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									<TableCell align="center">
										{shippingAddress.firstName}
									</TableCell>
									<TableCell align="center">
										{shippingAddress.lastName}
									</TableCell>
									<TableCell align="center">{shippingAddress.email}</TableCell>
									<TableCell align="center">
										{shippingAddress.address}
									</TableCell>
									<TableCell align="center">
										{shippingAddress.postalCode}
									</TableCell>
									<TableCell align="center">{shippingAddress.city}</TableCell>
									<TableCell align="center">
										{shippingAddress.country}
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
						<br />
						<Typography>Products</Typography>
						<Table size="small">
							<TableHead>
								<TableRow>
									<TableCell align="center">Id</TableCell>
									<TableCell align="center">Image</TableCell>
									<TableCell align="center">Name</TableCell>
									<TableCell align="center">Price</TableCell>
									<TableCell align="center">Quantity</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{row.orderItems.map((order) => {
									const { _id, mainImage, name, price, quantity } = order;
									return (
										<TableRow key={_id}>
											<TableCell align="center">{_id}</TableCell>
											<TableCell align="center">
												<img
													style={{ objectFit: 'contain', width: '50px' }}
													src={mainImage}
												/>
											</TableCell>
											<TableCell align="center">{name}</TableCell>
											<TableCell align="center">{price} €</TableCell>
											<TableCell align="center">
												{quantity}
												{quantity > 1 ? ' pics' : ' pic'}
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</Collapse>
				</TableCell>
			</TableRow>
		</Fragment>
	);
}
