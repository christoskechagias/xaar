import React, { useState, useEffect, Fragment } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import './ProfileSettings.css';
import {
	updateUserPasswordAction,
	updateUserNameAction,
	deleteUserAction,
} from '../../Redux/Actions/UserActions';
import CircularProgress from '@mui/material/CircularProgress';

export default function ProfileSettings() {
	const dispatch = useDispatch();
	const { user, loading, successDelete } = useSelector((state) => state.user);
	const [expanded, setExpanded] = useState(false);
	const [newName, setNewName] = useState('');
	const [password, setPassword] = useState('');
	const [rePassword, setRePassword] = useState('');
	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	useEffect(() => {
		if (user) {
			setNewName(user.name);
		}
	}, [user]);

	const submitNameHandler = (event) => {
		event.preventDefault();
		dispatch(updateUserNameAction({ newName }));
	};
	const submitPasswordHandler = (event) => {
		event.preventDefault();
		if (password !== rePassword) {
			console.log('Password not match');
		} else {
			dispatch(updateUserPasswordAction({ password }));
		}
	};
	const deleteAccountHadler = () => {
		dispatch(deleteUserAction());
	};
	useEffect(() => {
		if (successDelete) {
			window.location.reload(false);
		}
	}, [successDelete]);
	return (
		<div className="profileSettings">
			{loading ? (
				<div className="loading">
					<CircularProgress size={50} style={{ color: '#c38874' }} />
				</div>
			) : (
				<Fragment>
					<Accordion
						className="profileSettings__accordition"
						expanded={expanded === 'panel1'}
						onChange={handleChange('panel1')}
					>
						<AccordionSummary
							className="profileSettings__accordionSummary"
							expandIcon={<ExpandMoreIcon />}
						>
							<Typography className="profileSettings__title">Name</Typography>
							<Typography className="profileSettings__extraTitle">
								Change your name
							</Typography>
						</AccordionSummary>
						<AccordionDetails style={{ backgroundColor: 'lightgray' }}>
							<form
								className="profileSettings__form"
								onSubmit={submitNameHandler}
							>
								<input
									id="customInput1"
									required
									value={newName}
									placeholder="Change your name"
									onChange={(e) => setNewName(e.target.value)}
								/>
								<button
									id="customButton1"
									className="userAccessData__formButton"
									type="submit"
								>
									Update
								</button>
							</form>
						</AccordionDetails>
					</Accordion>
					<Accordion
						className="profileSettings__accordition"
						expanded={expanded === 'panel2'}
						onChange={handleChange('panel2')}
					>
						<AccordionSummary
							className="profileSettings__accordionSummary"
							expandIcon={<ExpandMoreIcon />}
						>
							<Typography className="profileSettings__title">
								Password
							</Typography>
							<Typography className="profileSettings__extraTitle">
								Change your password
							</Typography>
						</AccordionSummary>
						<AccordionDetails style={{ backgroundColor: 'lightgray' }}>
							<form
								className="profileSettings__form"
								onSubmit={submitPasswordHandler}
							>
								<div>
									<input
										id="customInput1"
										className="customInput1"
										type="password"
										placeholder="Enter password"
										onChange={(e) => setPassword(e.target.value)}
									/>
									<input
										id="customInput1"
										type="password"
										placeholder="Enter confirm password"
										onChange={(e) => setRePassword(e.target.value)}
									/>
								</div>

								<button id="customButton1" type="submit">
									Update
								</button>
							</form>
						</AccordionDetails>
					</Accordion>
					<Accordion
						className="profileSettings__accordition"
						expanded={expanded === 'panel3'}
						onChange={handleChange('panel3')}
					>
						<AccordionSummary
							className="profileSettings__accordionSummary"
							expandIcon={<ExpandMoreIcon />}
						>
							<Typography className="profileSettings__title">Delete</Typography>
							<Typography className="profileSettings__extraTitle">
								Delete my account
							</Typography>
						</AccordionSummary>
						<AccordionDetails style={{ backgroundColor: 'lightgray' }}>
							<button
								style={{ padding: '10px', width: '100px' }}
								id="customButton2"
								onClick={deleteAccountHadler}
							>
								Delete
							</button>
						</AccordionDetails>
					</Accordion>
				</Fragment>
			)}
		</div>
	);
}
