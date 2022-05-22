import React, { useState, useEffect, Fragment } from 'react';
import './LoginScreen.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../Redux/Actions/UserActions.js';
import CircularProgress from '@mui/material/CircularProgress';

function LoginScreen(props) {
	const dispatch = useDispatch();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const { userInfo, loading } = useSelector((state) => state.login);
	const { user } = useSelector((state) => state.user);

	const redirect = props.location.search
		? props.location.search.split('=')[1]
		: '/';

	useEffect(() => {
		if (userInfo) {
			if (user) {
				props.history.push(redirect);
			}
		}
	}, [userInfo, user, redirect]);

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(loginAction(email, password));
	};

	return (
		<div className="loginScreen">
			{loading ? (
				<div className="loading">
					<CircularProgress size={50} style={{ color: '#c38874' }} />
				</div>
			) : (
				<Fragment>
					<p className="loginScreen__title">Log In</p>
					<p className="loginScreen__registerText">
						New to this site?<a href="/register"> Register</a>
					</p>

					<form className="loginScreen__form" onSubmit={submitHandler}>
						<input
							style={{ padding: '13px' }}
							id="customInput1"
							type="text"
							placeholder="Enter email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							id="customInput1"
							style={{ padding: '13px' }}
							type="password"
							placeholder="Enter password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						<button
							style={{ padding: '13px', marginTop: '25px' }}
							id="customButton1"
							type="submit"
						>
							Log In
						</button>
					</form>
				</Fragment>
			)}
		</div>
	);
}

export default LoginScreen;
