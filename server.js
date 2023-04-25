import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import userRouter from './router/userRouter.js';
import cors from 'cors';
import productRouter from './router/productRouter.js';
import orderRouter from './router/orderRouter.js';
import uploadRouter from './router/uploadRouter.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	cors({
		origin: ['https://localhost:3000', 'https://xaar.herokuapp.com'],
		credentials: true,
	})
);


//|| 'mongodb://localhost/xaar'
mongoose.connect(process.env.DATABASE, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true,
});
app.use('/api/uploads', uploadRouter);
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
