import React, { useState, Fragment } from 'react';
import './ProductsList.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	createProductAction,
	deleteProductAction,
	updateProductAction,
	getProductsAction,
} from '../../../Redux/Actions/ProductActions.js';
import AddProductModal from './AddProductModal/AddProductModal';
import CircularProgress from '@mui/material/CircularProgress';

const ProductsList = () => {
	const { products, loading } = useSelector((state) => state.products);
	const dispatch = useDispatch();
	const [productsList, setProductsList] = useState([]);
	const [modal, setModal] = useState(false);
	const [editFormData, setEditFormData] = useState({
		name: '',
		mainImage: '',
		alternativeImage0: '',
		alternativeImage1: '',
		alternativeImage2: '',
		alternativeImage3: '',
		description: '',
		status: '',
		price: '',
		quantity: '',
	});
	const [addFormData, setAddFormData] = useState({
		name: '',
		mainImage: '',
		alternativeImage0: '',
		alternativeImage1: '',
		alternativeImage2: '',
		alternativeImage3: '',
		description: '',
		status: '',
		price: '',
		quantity: '',
	});
	const [editproductId, setEditproductId] = useState(null);

	useEffect(() => {
		dispatch(getProductsAction());
	}, [dispatch]);

	useEffect(() => {
		if (products) {
			setProductsList(products);
		}
	}, [products]);

	const handleEditFormChange = (event) => {
		event.preventDefault();
		const fieldName = event.target.getAttribute('name');
		const fieldValue = event.target.value;
		const newFormData = { ...editFormData };
		newFormData[fieldName] = fieldValue;
		setEditFormData(newFormData);
	};

	const handleEditFormSubmit = (event) => {
		event.preventDefault();
		const editedproduct = {
			_id: editproductId,
			name: editFormData.name,
			images: {
				main: editFormData.mainImage,
				alternatives: [
					editFormData.alternativeImage0,
					editFormData.alternativeImage1,
					editFormData.alternativeImage2,
					editFormData.alternativeImage3,
				],
			},
			status: editFormData.status,
			description: editFormData.description,
			quantity: editFormData.quantity,
			price: editFormData.price,
		};
		dispatch(updateProductAction(editedproduct));

		const newproductsList = [...productsList];
		const index = productsList.findIndex(
			(product) => product._id === editproductId
		);
		newproductsList[index] = editedproduct;
		setProductsList(newproductsList);
		setEditproductId(null);
	};

	const handleEditClick = (event, product) => {
		event.preventDefault();
		setEditproductId(product._id);
		setEditFormData({
			_id: product._id,
			name: product.name,
			mainImage: product.images.main,
			alternativeImage0: product.images.alternatives[0],
			alternativeImage1: product.images.alternatives[1],
			alternativeImage2: product.images.alternatives[2],
			alternativeImage3: product.images.alternatives[3],
			status: product.status,
			description: product.description,
			price: product.price,
			quantity: product.quantity,
		});
	};

	const handleCancelClick = () => {
		setEditproductId(null);
	};

	const handleDeleteClick = (productId) => {
		if (window.confirm('Are you sure to delete?')) {
			dispatch(deleteProductAction(productId));
			const newproductsList = [...productsList];
			const index = productsList.findIndex(
				(product) => product._id === productId
			);
			newproductsList.splice(index, 1);
			setProductsList(newproductsList);
		}
	};
	const handleAddFormSubmit = (event) => {
		event.preventDefault();
		const newproduct = {
			name: addFormData.name,
			images: {
				main: addFormData.mainImage,
				alternatives: [
					addFormData.alternativeImage0,
					addFormData.alternativeImage1,
					addFormData.alternativeImage2,
					addFormData.alternativeImage3,
				],
			},
			status: addFormData.status,
			description: addFormData.description,
			quantity: addFormData.quantity,
			price: addFormData.price,
		};
		dispatch(createProductAction(newproduct));
	};

	const handleAddFormChange = (event) => {
		event.preventDefault();
		const fieldName = event.target.getAttribute('name');
		const fieldValue = event.target.value;
		const newFormData = { ...addFormData };
		newFormData[fieldName] = fieldValue;
		setAddFormData(newFormData);
	};

	return (
		<div className="productsList">
			{loading ? (
				<div className="loading">
					<CircularProgress size={50} style={{ color: '#c38874' }} />
				</div>
			) : (
				<Fragment>
					<button
						id="customButton1"
						onClick={() => setModal(!modal)}
						style={{ width: '150px', padding: '10px' }}
					>
						Add a Product
					</button>

					<AddProductModal
						openModal={modal}
						handleAddFormChange={handleAddFormChange}
						addFormData={addFormData}
						handleAddFormSubmit={handleAddFormSubmit}
						closeModal={() => setModal(!modal)}
					/>

					<form onSubmit={handleEditFormSubmit}>
						<table className="productsList_table">
							<thead>
								<tr>
									<th>Name</th>
									<th>Main Image</th>
									<th>Alternative Images(max 4)</th>
									<th>Price</th>
									<th>Quantity</th>
									<th>Description</th>
									<th>Status</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>
								{productsList?.map((product) => {
									const { _id } = product;
									return (
										<Fragment>
											{editproductId === _id ? (
												<EditableRow
													editFormData={editFormData}
													handleEditFormChange={handleEditFormChange}
													handleCancelClick={handleCancelClick}
												/>
											) : (
												<ReadOnlyRow
													product={product}
													handleEditClick={handleEditClick}
													handleDeleteClick={handleDeleteClick}
												/>
											)}
										</Fragment>
									);
								})}
							</tbody>
						</table>
					</form>
				</Fragment>
			)}
		</div>
	);
};
export default ProductsList;

export const EditableRow = ({
	editFormData,
	handleEditFormChange,
	handleCancelClick,
}) => {
	return (
		<tr>
			<td>
				<input
					id="customInput1"
					type="text"
					placeholder="Enter a name..."
					name="name"
					value={editFormData.name}
					onChange={handleEditFormChange}
				></input>
			</td>
			<td>
				<input
					id="customInput1"
					style={{ width: '90%' }}
					type="text"
					placeholder="Enter the Url for main image..."
					name="mainImage"
					value={editFormData.mainImage}
					onChange={handleEditFormChange}
				/>
			</td>
			<td>
				<input
					id="customInput1"
					type="text"
					style={{ width: '90%' }}
					placeholder="Enter the Url for alternatives image..."
					name="alternativeImage0"
					value={editFormData.alternativeImage0}
					onChange={handleEditFormChange}
				/>
				<input
					style={{ width: '90%' }}
					id="customInput1"
					type="text"
					placeholder="Enter the Url for alternatives image..."
					name="alternativeImage1"
					value={editFormData.alternativeImage1}
					onChange={handleEditFormChange}
				/>
				<input
					style={{ width: '90%' }}
					id="customInput1"
					type="text"
					placeholder="Enter the Url for alternatives image..."
					name="alternativeImage2"
					value={editFormData.alternativeImage2}
					onChange={handleEditFormChange}
				/>
				<input
					style={{ width: '90%' }}
					id="customInput1"
					type="text"
					placeholder="Enter the Url for alternatives image..."
					name="alternativeImage3"
					value={editFormData.alternativeImage3}
					onChange={handleEditFormChange}
				/>
			</td>

			<td>
				<input
					id="customInput1"
					style={{ width: '90%' }}
					className="editableRow__price"
					type="text"
					placeholder="Enter an price..."
					name="price"
					value={editFormData.price}
					onChange={handleEditFormChange}
				></input>
			</td>
			<td>
				<input
					style={{ width: '90%' }}
					id="customInput1"
					className="editableRow__quantity"
					type="text"
					placeholder="Enter a quantity..."
					name="quantity"
					value={editFormData.quantity}
					onChange={handleEditFormChange}
				></input>
			</td>
			<td>
				<textarea
					style={{ resize: 'vertical', width: '90%', height: '100px' }}
					id="customInput1"
					type="text"
					placeholder="Enter a description..."
					name="description"
					value={editFormData.description}
					onChange={handleEditFormChange}
				></textarea>
			</td>
			<td>
				<select
					style={{ width: '90%' }}
					name="status"
					value={editFormData.status}
					onChange={handleEditFormChange}
				>
					<option value="0">Out of Stock</option>
					<option value="1">On Sale</option>
					<option value="2">New Arrival</option>
				</select>
			</td>
			<td>
				<div className="editableRow__buttons">
					<button style={{ padding: '5px' }} id="customButton1" type="submit">
						Save
					</button>
					<button
						style={{ padding: '5px' }}
						id="customButton2"
						onClick={handleCancelClick}
					>
						Cancel
					</button>
				</div>
			</td>
		</tr>
	);
};
export const ReadOnlyRow = ({
	product,
	handleEditClick,
	handleDeleteClick,
}) => {
	return (
		<tr>
			<td>{product.name}</td>
			<td>
				<img
					style={{ objectFit: 'contain', width: '50px' }}
					src={product.images?.main}
				/>
			</td>
			<td>
				{product.images?.alternatives.map((image, index) => (
					<img
						key={index}
						style={{ objectFit: 'contain', width: '50px', marginRight: '10px' }}
						src={image}
					/>
				))}
			</td>
			<td>{product.price} €</td>
			<td>{product.quantity} pics</td>
			<td>{product.description}</td>
			<td>
				{product.status == 0
					? 'Out of Stock'
					: product.status == 1
					? 'On Sale'
					: 'New Arrival'}
			</td>

			<td>
				<div className="readOnlyRow__buttons">
					<button
						id="customButton1"
						type="button"
						onClick={(event) => handleEditClick(event, product)}
						style={{ padding: '5px' }}
					>
						Edit
					</button>

					<button
						id="customButton2"
						type="button"
						onClick={() => handleDeleteClick(product._id)}
						style={{ padding: '5px' }}
					>
						Delete
					</button>
				</div>
			</td>
		</tr>
	);
};
