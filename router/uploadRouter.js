import multer from 'multer';
import express from 'express';

const uploadRouter = express.Router();

const storage = multer.diskStorage({
	destination(req, file, cb) {
		cb(null, './client/build/uploads');
	},
	filename(req, file, cb) {
		cb(null, Date.now() + file.originalname); 
	},
});

const upload = multer({ storage });

uploadRouter.post(
	'/productImage',
	upload.single('productImage'),
	(req, res, next) => {
		res.send(`/uploads/${req.file.filename}`);
	}
);
uploadRouter.post(
	'/productGallery',
	upload.array('productGallery', 2),
	(req, res, next) => {
		let reqFiles = [];
		for (let i = 0; i < req.files.length; i++) {
			reqFiles[i] = `/uploads/${req.files[i].filename}`;
		}
		res.send(reqFiles);  
	}
);
export default uploadRouter;
