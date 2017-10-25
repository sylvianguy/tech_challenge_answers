import React from 'react';

import DisplayInfo from './DisplayInfo';

const Modal = ({ 
	stores,
	getStores,
	city,
	sent,
	selectStore, 
	id, 
	chosenAlch, 
	inventoryCount,
	closeModal
}) => {
	return (
		<div className="modal">
			
			<form onSubmit={(e) => getStores(e)}>
				<i onClick={closeModal} className="fa fa-times"></i>
				<figure>
					<img src={chosenAlch.image_thumb_url} alt=""/>
				</figure>
				<div className="modal__bottom">
					<label htmlFor="">Enter your postal code to find stores near you!</label>
					<input onChange={(e) => city(e)} type="text" placeholder="e.g L6T1M8" />
					<input type="submit"/>
					<DisplayInfo display={sent === true}>
						<label htmlFor="" className="labelWrapper">
							<select defaultValue="default" onChange={(e) => selectStore(e)} name="" id="">
								<option value="default">Choose a Location</option>
								{stores.map((store) => {
									return <option key={store.id} value={store.id}>{store.address_line_1}</option>
								})}
							</select>
							<i className="fa fa-caret-down"></i>
						</label>
					</DisplayInfo>
					<DisplayInfo display={inventoryCount}>
						<h4>There are {inventoryCount} items in stock for this location!</h4>
					</DisplayInfo>
				</div>
			</form>
		</div>	
	)
}

export default Modal;