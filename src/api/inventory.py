import flask
import src
from src.config import inventory, verify_inputs
from .exceptions import InvalidInput


@src.app.route('/api/v1/inventory/add/<item>/<quantity>/')
def add_inventory_item(item, quantity):
    quantity = int(quantity)
    item = item.lower()
    verify_inputs(item, quantity)

    # Determine whether we are adding to quantity of existing item
    if item in inventory:
        inventory[item] += quantity
    else:
        inventory[item] = quantity

    return flask.jsonify(inventory)

@src.app.route('/api/v1/inventory/remove/<item>/', defaults={'quantity': None})
@src.app.route('/api/v1/inventory/remove/<item>/<quantity>/')
def remove_inventory_item(item, quantity):
    item = item.lower()
    if item not in inventory:
        raise InvalidInput('The given item is not currently in your inventory.')
    
    # Removing a select amount
    if quantity is not None:
        quantity = int(quantity)
    
        verify_inputs(item, quantity)
        if quantity > inventory[item]:
            raise InvalidInput('Quantity to remove cannot exceed the item\'s current quantity')

        inventory[item] -= quantity
        # Determines whether we need to remove the key from our inventory
        if inventory[item] == 0:
            inventory.pop(item)
    else:
        # Removing entire key from inventory
        verify_inputs(item)
        inventory.pop(item)

    return flask.jsonify(inventory)

@src.app.route('/api/v1/inventory/list/')
def list_inventory():
    return flask.jsonify(inventory)

@src.app.route('/api/v1/inventory/edit/<original>/<new>/')
def edit_existing_item_name(original, new):
    original = original.lower()
    new = new.lower()
    verify_inputs([original, new])

    if original not in inventory:
        raise InvalidInput('The given item is not currently in your inventory.')

    inventory[new] = inventory[original]
    inventory.pop(original)

    return flask.jsonify(inventory)

@src.app.route('/api/v1/inventory/override/<item>/<quantity>/')
def edit_existing_item_quantity(item, quantity):
    item = item.lower()
    quantity = int(quantity)
    verify_inputs(item, quantity)

    if item not in inventory:
        raise InvalidInput('The given item is not currently in your inventory.')

    inventory[item] = quantity

    return flask.jsonify(inventory)