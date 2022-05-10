from importlib import invalidate_caches
from operator import inv
import flask
import src
from src.api.exceptions import InvalidInput
from src.config import verify_inputs, warehouses, inventory

@src.app.route('/api/v1/warehouses/create/<name>/')
def create_warehouse(name):
    name = name.lower()
    verify_inputs(name)

    if name in warehouses:
        raise InvalidInput('That warehouse name already exists. Please choose another.')
    
    warehouses[name] = {}
    return flask.jsonify(warehouses)

@src.app.route('/api/v1/warehouses/add/<name>/<item>/<quantity>/')
def add_warehouse_inventory(name, item, quantity):
    name = name.lower()
    item = item.lower()
    quantity = int(quantity)
    verify_inputs([name, item], quantity)

    if name not in warehouses:
        raise InvalidInput('That warehouse does not exist. Please enter a valid warehouse.')
    
    selected_warehouse = warehouses[name]
    # Ensure the item and quantity requested are available
    if item not in inventory:
        raise InvalidInput('That item does not exist in Inventory. Please choose a valid item.')
    
    if quantity > inventory[item]:
        raise InvalidInput('Quantity to add to warehouse cannot exceed current available quantity.')

    # Modify unallocated inventory and move selected items to the warehouse
    inventory[item] -= quantity

    if inventory[item] == 0:
        inventory.pop(item)
    
    if item in selected_warehouse:
        selected_warehouse[item] += quantity
    else:
        selected_warehouse[item] = quantity
    
    return {
        "warehouses": warehouses,
        "inventory": inventory
    }
