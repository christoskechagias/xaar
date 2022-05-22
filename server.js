import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './router/userRouter.js';
import cors from 'cors';
import productRouter from './router/productRouter.js';
import orderRouter from './router/orderRouter.js';
import path from 'path';
import uploadRouter from './router/uploadRouter.js';
const app = express();
const __dirname = path.resolve(path.dirname(''));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	cors({
		origin: ['http://localhost:3000', 'https://xaar.herokuapp.com'],
		credentials: true,
	})
);

const whitelist = [
	'http://localhost:3000',
	'http://localhost:5000',
	'https://xaar.herokuapp.com',
];
const corsOptions = {
	origin: function (origin, callback) {
		console.log('** Origin of request ' + origin);
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			console.log('Origin acceptable');
			callback(null, true);
		} else {
			console.log('Origin rejected');
			callback(new Error('Not allowed by CORS'));
		}
	},
};
//|| 'mongodb://localhost/xaar'
app.use(cors(corsOptions));
mongoose.connect(process.env.DATABASE, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});
app.use('/api/uploads', uploadRouter);
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);

if (process.env.NODE_ENV === 'production') {
	// Serve any static files
	app.use(express.static(path.join(__dirname, 'client/build')));
	// Handle React routing, return all requests to React app
	app.get('*', function (req, res) {
		res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
	});
}
const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
