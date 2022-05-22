import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import './AddProductModal.css';
import { useEffect } from 'react';

function AddProductModal({
	openModal,
	closeModal,
	addFormData,
	handleAddFormChange,
	handleAddFormSubmit,
}) {
	const handleAddClick = (e) => {
		setOpen(false);
		closeModal(false);
		handleAddFormSubmit(e);
	};
	const [open, setOpen] = useState(false);
	const handleClose = () => {
		closeModal(false);
		setOpen(false);
	};

	useEffect(() => {
		setOpen(openModal);
	}, [openModal]);
	return (
		<Modal open={open} onClose={handleClose}>
			<form onSubmit={handleAddClick}>
				<table className="addProductModal__table">
					<thead>
						<tr>
							<th colspan="2">
								<h2>Add a new Product</h2>
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<label>Name</label>
							</td>
							<td>
								<input
									id="customInput1"
									required
									type="text"
									name="name"
									placeholder="Enter a name..."
									value={addFormData.name}
									onChange={handleAddFormChange}
								/>
							</td>
						</tr>
						<tr>
							<td>
								<label>Main Image</label>
							</td>
							<td>
								<input
									id="customInput1"
									type="text"
									name="mainImage"
									placeholder="Enter the Url for main image..."
									value={addFormData.mainImage}
									onChange={handleAddFormChange}
								/>
							</td>
						</tr>

						<tr>
							<td>
								<label>Alternatives Images</label>
							</td>
							<td>
								<div
									style={{ display: 'flex', flexDirection: 'column', gap: 5 }}
								>
									<input
										id="customInput1"
										type="text"
										name="alternativeImage0"
										placeholder="Enter the Url for 1th alternative image..."
										value={addFormData.alternativeImage0}
										onChange={handleAddFormChange}
									/>
									<input
										id="customInput1"
										type="text"
										name="alternativeImage1"
										placeholder="Enter the Url for 2th alternative image..."
										value={addFormData.alternativeImage1}
										onChange={handleAddFormChange}
									/>
									<input
										id="customInput1"
										type="text"
										name="alternativeImage2"
										placeholder="Enter the Url for 3th alternative image..."
										value={addFormData.alternativeImage2}
										onChange={handleAddFormChange}
									/>
									<input
										id="customInput1"
										type="text"
										name="alternativeImage3"
										placeholder="Enter the Url for 4th alternative image..."
										value={addFormData.alternativeImage3}
										onChange={handleAddFormChange}
									/>
								</div>
							</td>
						</tr>
						<tr>
							<td>
								<label>Price</label>
							</td>
							<td>
								<input
									id="customInput1"
									type="text"
									name="price"
									value={addFormData.price}
									placeholder="Enter an price..."
									onChange={handleAddFormChange}
								/>
							</td>
						</tr>
						<tr>
							<td>
								<label>Quantity</label>
							</td>
							<td>
								<input
									id="customInput1"
									required
									type="text"
									name="quantity"
									value={addFormData.quantity}
									placeholder="Enter a phone quantity..."
									onChange={handleAddFormChange}
								/>
							</td>
						</tr>
						<tr>
							<td colspan="2">
								<button
									style={{ padding: '10px', width: '100px' }}
									id="customButton1"
									type="submit"
								>
									Add
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</form>
		</Modal>
	);
}

export default AddProductModal;
