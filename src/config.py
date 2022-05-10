from src.api.exceptions import InvalidInput

# Will consist of Key-Value pairs
inventory = {}
# Will consist of Key -> Key-Value pairs
warehouses = {}

def verify_inputs(items, quantity=None):
    # Ensures that there is at least one alphanumeric char in item
    for item in items:
        if not any(c.isalpha() for c in item):
            raise InvalidInput('The inventory item name cannot be left empty.')

    if quantity is not None:
        if quantity < 1:
            raise InvalidInput('Quantity must be at least 1 item.')