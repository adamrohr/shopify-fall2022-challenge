import React from 'react';
import Warehouses from './warehouses.jsx';

class Inventory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inventory: {}
        }
        this.handleInventoryAddition = this.handleInventoryAddition.bind(this);
        this.handleInventoryRemoval = this.handleInventoryRemoval.bind(this);
        this.handleRemoveAll = this.handleRemoveAll.bind(this);
        this.handleEditName = this.handleEditName.bind(this);
        this.handleOverrideQuantity = this.handleOverrideQuantity.bind(this);
        this.updateInventory = this.updateInventory.bind(this);
    }

    updateInventory() {
        fetch("/api/v1/inventory/list/")
        .then((response) => {
            if(!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then((data) => {
            this.setState({
                inventory: data
            });
        })
    }

    handleInventoryAddition(e) {
        e.preventDefault();

        const item = e.target[0].value == "" ? " " : e.target[0].value;
        const quantity = e.target[1].value == "" ? -1 : e.target[1].value;

        fetch(`/api/v1/inventory/add/${item}/${quantity}`)
        .then((response) => {
            if(!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then((data) => {
            this.setState({
                inventory: data
            });
        })
        .catch((error) => console.log(error))
    }

    handleRemoveAll(e) {
        e.preventDefault();

        const item = e.target[0].value == "" ? " " : e.target[0].value;

        fetch(`/api/v1/inventory/remove/${item}/`)
        .then((response) => {
            if(!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then((data) => {
            console.log(data);
            this.setState({
                inventory: data
            });
        })
        .catch((error) => console.log(error))
    }

    handleInventoryRemoval(e) {
        e.preventDefault();

        const item = e.target[0].value == "" ? " " : e.target[0].value;
        const quantity = e.target[1].value == "" ? -1 : e.target[1].value;

        fetch(`/api/v1/inventory/remove/${item}/${quantity}`)
        .then((response) => {
            if(!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then((data) => {
            console.log(data);
            this.setState({
                inventory: data
            });
        })
        .catch((error) => console.log(error))
    }

    handleEditName(e){
        e.preventDefault();

        const original = e.target[0].value == "" ? " " : e.target[0].value;
        const newItem = e.target[1].value == "" ? " " : e.target[1].value;

        fetch(`/api/v1/inventory/edit/${original}/${newItem}/`)
        .then((response) => {
            if(!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then((data) => {
            console.log(data);
            this.setState({
                inventory: data
            });
        })
        .catch((error) => console.log(error))
    }

    handleOverrideQuantity(e) {
        e.preventDefault();

        const item = e.target[0].value == "" ? " " : e.target[0].value;
        const quantity = e.target[1].value == "" ? -1 : e.target[1].value;

        fetch(`/api/v1/inventory/override/${item}/${quantity}/`)
        .then((response) => {
            if(!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then((data) => {
            console.log(data);
            this.setState({
                inventory: data
            });
        })
        .catch((error) => console.log(error))
    }

    render() {
        const {inventory} = this.state;
        console.log(inventory);

        return(
            <>
            <div id="inventory-input">
                <h3>Add Items:</h3>
                <form onSubmit={this.handleInventoryAddition}>
                    <input id="item" type="text" placeholder="Inventory Item" />
                    <input id="quantity" type="number" placeholder="Quantity"/>
                    <input type="submit" value="Add Items"/>
                </form>
            </div>
            <div id="inventory-remove">
                <h3>Remove Items:</h3>
                <label htmlFor="remove-all">Remove all items of inserted key: </label>
                <form id="remove-all" onSubmit={this.handleRemoveAll}>
                    <input id="item" type="text" placeholder="Inventory Item" />
                    <input type="submit" value="Remove Items"/>
                </form>
                <label htmlFor="remove-select">Remove selected number of items for key: </label>
                <form id="remove-select" onSubmit={this.handleInventoryRemoval}>
                    <input id="item" type="text" placeholder="Inventory Item" />
                    <input id="quantity" type="number" placeholder="Quantity"/>
                    <input type="submit" value="Remove Items"/>
                </form>
            </div>
            <div id="inventory-edit-name">
                <h3>Edit Existing Item Name:</h3>
                <form onSubmit={this.handleEditName}>
                    <input id="original" type="text" placeholder="Original Item Name" />
                    <input id="new" type="text" placeholder="New Item Name"/>
                    <input type="submit" value="Edit Item"/>
                </form>
            </div>
            <div id="inventory-edit-quantity">
                <h3>Override Existing Item Quantity:</h3>
                <form onSubmit={this.handleOverrideQuantity}>
                    <input id="item" type="text" placeholder="Inventory Item" />
                    <input id="quantity" type="number" placeholder="New Quantity"/>
                    <input type="submit" value="Override Quantity"/>
                </form>
            </div>
            <div id="inventory-list">
                <h2>Unallocated Inventory:</h2>
                {Object.keys(inventory).length !== 0 ? Object.keys(inventory).map(key => (
                    <li>
                        <label>{key}: {inventory[key]}</label>
                    </li>
                )) : <label>No Items Yet!</label>}
            </div>
            <Warehouses updateInventory={this.updateInventory}/>
            </>
        );
    }
}

export default Inventory;