import React, { useEffect, useState, Fragment } from 'react';
import './RegisterScreen.css';
import { useDispatch, useSelector } from 'react-redux';
import { registerAction } from '../../Redux/Actions/UserActions';
import CircularProgress from '@mui/material/CircularProgress';

function RegisterScreen(props) {
	const dispatch = useDispatch();
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rePassword, setRePassword] = useState('');
	const { userInfo, loading } = useSelector((state) => state.register);

	const redirect = props.location.search
		? props.location.search.split('=')[1]
		: '/';

	const submitHandler = (e) => {
		e.preventDefault();
		if (password !== rePassword) {
			console.log('Password Not Match');
		} else {
			dispatch(registerAction(username, email, password));
		}
	};

	useEffect(() => {
		if (userInfo) {
			props.history.push(redirect);
		}
	}, [props.history, redirect, userInfo]);
	return (
		<div className="registerScreen">
			{loading ? (
				<div className="loading">
					<CircularProgress size={50} style={{ color: '#c38874' }} />
				</div>
			) : (
				<Fragment>
					<p className="registerScreen__title">Register</p>
					<p className="registerScreen__registerText">
						Already a member?<a href="/login"> Log In</a>
					</p>

					<form className="registerScreen__form" onSubmit={submitHandler}>
						<input
							style={{ padding: '13px' }}
							type="text"
							id="customInput1"
							placeholder="Enter username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<input
							style={{ padding: '13px' }}
							id="customInput1"
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							style={{ padding: '13px' }}
							id="customInput1"
							type="password"
							placeholder="Enter password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<input
							style={{ padding: '13px' }}
							id="customInput1"
							type="password"
							placeholder="Enter confirm password"
							value={rePassword}
							required
							onChange={(e) => setRePassword(e.target.value)}
						/>

						<button
							style={{ marginTop: '10px', padding: '13px' }}
							id="customButton1"
							type="submit"
						>
							Register
						</button>
					</form>
				</Fragment>
			)}
		</div>
	);
}

export default RegisterScreen;
