import React from 'react';
import { ajax } from 'jquery';

import DisplayInfo from './DisplayInfo';
import Modal from './Modal';
import DisplayBooze from './DisplayBooze';
import lcboService from '../services/lcboService';

class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			alcohol: [],
			modal: false,
			city: '',
			stores: [],
			product_id: '',
			sent: false,
			inventory: {}
		}

		this.handleChange = this.handleChange.bind(this);
		this.getAlcohol = this.getAlcohol.bind(this);
		this.toggleModal = this.toggleModal.bind(this);
		this.getCity = this.getCity.bind(this);
		this.getStores = this.getStores.bind(this);
		this.selectStore = this.selectStore.bind(this);
		this.closeModal = this.closeModal.bind(this)
	}
	toggleModal(e, alch) {
		this.setState({
			modal: true,
			chosenAlch: alch,
			product_id: alch.id
		})
	}
	closeModal() {
		this.setState({
			modal: false,
			stores: [],
			inventory: {},
			product_id: '',
			sent: false
		})
	}
	getAlcohol(type) {
		lcboService.getProducts({
			q: type
		})
		.then((data) => {
			this.setState({
				alcohol: data.result
			})
		});

	}
	selectStore(e) {

		const store_id = e.target.value;
		const product_id = this.state.product_id

		lcboService.getInventories({
			store_id,
			product_id
		})
		.then((data) => {
			this.setState({
				inventory: data.store
			})
		});
	}
	getStores(e) {
		e.preventDefault();

		lcboService.getStores({
			geo: this.state.city
		})
		.then((data) => {
			this.setState({
				stores: data.result,
				sent: true
			})

		});
	}

	getCity(e) {
		this.setState({
			city: e.target.value
		})
	}

	handleChange(e) {
		this.getAlcohol(e.target.value);
	}

	render() {
      return (
        <div className="wrapper">
        <p>Choose from Wines or Beers</p>
        <label className="labelWrapper" htmlFor="">
			<select defaultValue="default" onChange={this.handleChange} name="" id="">
				<option value="default">Choose Your Poison</option>
				<option value="default" value="wine">Wine</option>
				<option value="beer">Beer</option>
			</select>
			<i className="fa fa-caret-down" aria-hidden="true"></i>
		</label>
			<section className="cardContainer">
				{this.state.alcohol.map((item) => {
					return (
						<DisplayBooze 
							key={item.id}
							alch={item}
							toggleModal={this.toggleModal}
						/>
					)
				})}
			</section>
			<DisplayInfo display={this.state.modal}>
				<Modal 
					city={this.getCity} 
					getStores={this.getStores} 
					selectStore={this.selectStore}
					sent={this.state.sent}
					stores={this.state.stores}
					chosenAlch={this.state.chosenAlch}
					inventoryCount={this.state.inventory.inventory_count}
					closeModal={this.closeModal}
				/>
			</DisplayInfo>
        </div>
      )
	}

}

export default Home;