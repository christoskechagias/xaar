import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import User from '../model/userModel.js';
import { generateToken, isAuth, isAdmin } from '../utils.js';
const userRouter = express.Router();

userRouter.post(
	'/register',
	expressAsyncHandler(async (req, res) => {
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			const user = new User({
				name: req.body.name,
				email: req.body.email,
				password: bcrypt.hashSync(req.body.password, 8),
			});
			const createdUser = await user.save();
			res.send({
				_id: createdUser._id,
				token: generateToken(createdUser),
			});
		} else {
			res.status(404).send({ message: 'This email already exists' });
		}
	})
);

userRouter.post(
	'/login',
	expressAsyncHandler(async (req, res) => {
		const user = await User.findOne({
			email: req.body.email,
		});
		if (user) {
			if (bcrypt.compareSync(req.body.password, user.password)) {
				res.status(202).send({
					_id: user._id,
					token: generateToken(user),
					message: 'Login successful',
				});
				return;
			}
		}
		res.status(404).send({ message: 'Invalid email or password' });
	})
);

//User (Get, Update, Delete)
userRouter.get(
	'/get',
	isAuth,
	expressAsyncHandler(async (req, res) => {
		const user = await User.findById({ _id: req.user._id });
		if (user) {
			res.send(user);
		} else {
			res.status(404).send({ message: 'User Not Found' });
		}
	})
);
userRouter.put(
	'/name/update',
	isAuth,
	expressAsyncHandler(async (req, res) => {
		const user = await User.findById(req.user._id);
		if (user) {
			user.name = req.body.newName;
			await user.save();
			res.status(202).send({ user: user, message: 'Name Changed' });
		} else {
			res.status(404).send({ message: 'Name Not Changed' });
		}
	})
);
userRouter.put(
	'/password/update',
	isAuth,
	expressAsyncHandler(async (req, res) => {
		const user = await User.findById(req.user._id);
		if (user) {
			user.password = bcrypt.hashSync(req.body.password, 8);
			await user.save();
			res.status(202).send({ message: 'Password Changed' });
		} else {
			res.status(404).send({ message: 'Password Not Changed' });
		}
	})
);
userRouter.delete(
	'/delete',
	isAuth,
	expressAsyncHandler(async (req, res) => {
		await User.findOneAndDelete({ _id: req.user._id }, function (err, user) {
			if (user) {
				res.status(202).send({ message: 'User Deleted' });
			} else {
				res.status(404).send({ message: 'User Not Deleted' });
			}
		});
	})
);
//Admin (getUsers)
userRouter.get(
	'/get/all',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const users = await User.find({});
		if (users) {
			res.status(202).send(users);
		} else {
			res.status(404).send({ message: 'No users' });
		}
	})
);

export default userRouter;
