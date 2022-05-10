import React from 'react';
import ReactDOM from 'react-dom';
import Inventory from './inventory.jsx';
import Warehouses from './warehouses.jsx';

ReactDOM.render(
    // Insert the post component into the DOM
    <div>
        <div id="container">
            <Inventory/>
            {/* <Warehouses/> */}
        </div>
    </div>,
    document.getElementById('reactEntry'),
);