import React from 'react';

class Warehouses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            warehouses: {}
        }
        this.handleCreateWarehouse = this.handleCreateWarehouse.bind(this);
        this.handleAddInventory = this.handleAddInventory.bind(this);
    }

    handleCreateWarehouse(e) {
        e.preventDefault();

        const name = e.target[0].value == "" ? " " : e.target[0].value;

        fetch(`/api/v1/warehouses/create/${name}/`)
        .then((response) => {
            if(!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then((data) => {
            this.setState({
                warehouses: data
            });
        })
        .catch((error) => console.log(error))
    }

    handleAddInventory(e) {
        e.preventDefault();

        const name = e.target[0].value == "" ? " " : e.target[0].value;
        const item = e.target[1].value == "" ? " " : e.target[1].value;
        const quantity = e.target[2].value == "" ? -1 : e.target[2].value;

        fetch(`/api/v1/warehouses/add/${name}/${item}/${quantity}/`)
        .then((response) => {
            if(!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then((data) => {
            this.setState({
                warehouses: data['warehouses']
            });
            this.props.updateInventory();
        })
        .catch((error) => console.log(error))
    }

    render() {
        const {warehouses} = this.state;
        return(
            <>
            <div id="create-warehouse">
                <h3>Create Warehouse:</h3>
                <form onSubmit={this.handleCreateWarehouse}>
                    <input id="name" type="text" placeholder="Warehouse Name" />
                    <input type="submit" value="Create Warehouse"/>
                </form>
            </div>
            <div id="add-warehouse-inventory">
                <h3>Add to Warehouse from Inventory:</h3>
                <form onSubmit={this.handleAddInventory}>
                    <input id="warehouse" type="text" placeholder="Warehouse Name"/>
                    <input id="item" type="text" placeholder="Item Name"/>
                    <input id="quantity" type="number" placeholder="Quantity"/>
                    <input type="submit" value="Add Inventory"/>
                </form>
            </div>
            <div id="current-warehouses">
                {Object.keys(warehouses).length !== 0 ? Object.keys(warehouses).map(name => (
                    <li>
                        <label>{name}'s Inventory:</label>
                        <ul>
                            {Object.keys(warehouses[name]).length !== 0 ? Object.keys(warehouses[name]).map(item => (
                                <li>
                                    <label>{item}: {warehouses[name][item]}</label>
                                </li>
                            )) : <li><label>No Inventory for {name} yet!</label></li>}
                        </ul>
                    </li>
                )) : <label>No Warehouses Yet!</label>}
            </div>
            </>
        );
    }
}

export default Warehouses;