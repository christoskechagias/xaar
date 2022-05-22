import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersListAction } from '../../../Redux/Actions/UserActions.js';
import './UsersList.css';
import CircularProgress from '@mui/material/CircularProgress';

function UsersList() {
	const dispatch = useDispatch();
	const { loading, error, users } = useSelector((state) => state.userList);
	const [contacts, setContacts] = useState([]);

	useEffect(() => {
		dispatch(getUsersListAction());
	}, [dispatch]);

	useEffect(() => {
		if (users) {
			setContacts(users);
		}
	}, [users]);

	return (
		<Fragment>
			{loading ? (
				<div className="loading">
					<CircularProgress size={50} style={{ color: '#c38874' }} />
				</div>
			) : (
				<div className="usersList">
					<table className="usersList__table">
						<thead>
							<tr>
								<th>Id</th>
								<th>Name</th>
								<th>Email</th>
							</tr>
						</thead>
						<tbody>
							{contacts?.map((contact) => {
								return (
									<Fragment>
										<ReadUserRow contact={contact} />
									</Fragment>
								);
							})}
						</tbody>
					</table>
				</div>
			)}
		</Fragment>
	);
}

export default UsersList;

const ReadUserRow = ({ contact }) => {
	return (
		<tr>
			<td>{contact._id}</td>
			<td>{contact.name}</td>
			<td>{contact.email}</td>
		</tr>
	);
};
