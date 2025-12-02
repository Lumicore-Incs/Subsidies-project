import { useState } from 'react';
import './OrderForm.css';

function OrderForm({ onOrderSubmit }) {
  const [formData, setFormData] = useState({
    customerName: '',
    address: '',
    contactNumber: ''
  });

  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    itemName: '',
    quantity: ''
  });

  // Generate unique customer ID
  const generateCustomerId = () => {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000);
    return `CUST-${timestamp}-${random}`;
  };

  // Handle customer info changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle item input changes
  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setCurrentItem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add item to the list
  const handleAddItem = (e) => {
    e.preventDefault();
    
    if (!currentItem.itemName || !currentItem.quantity) {
      alert('Please select an item and enter quantity');
      return;
    }

    setItems(prev => [...prev, { ...currentItem }]);
    setCurrentItem({ itemName: '', quantity: '' });
    alert('Item added successfully!');
  };

  // Remove item from the list
  const handleRemoveItem = (index) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  // Handle final order submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.customerName || !formData.address || !formData.contactNumber) {
      alert('Please fill in customer details');
      return;
    }

    if (items.length === 0) {
      alert('Please add at least one item');
      return;
    }

    // Create new order with unique customer ID
    const newOrder = {
      customerId: generateCustomerId(),
      ...formData,
      items: items,
      orderDate: new Date().toLocaleString()
    };

    onOrderSubmit(newOrder);
    
    // Reset form
    setFormData({
      customerName: '',
      address: '',
      contactNumber: ''
    });
    setItems([]);
    setCurrentItem({ itemName: '', quantity: '' });

    alert('Order submitted successfully!');
  };

  return (
    <div className="form-section">
      <h2>New Order</h2>
      <form onSubmit={handleSubmit} className="order-form">
        <div className="form-group">
          <label htmlFor="customerName">
            <span className="label-icon">👤</span>
            Customer Name
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            placeholder="Enter customer name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">
            <span className="label-icon">📍</span>
            Address
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter delivery address"
            rows="3"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactNumber">
            <span className="label-icon">📞</span>
            Contact Number
          </label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Enter contact number"
            required
          />
        </div>

        <div className="items-section">
          <h3>Add Items</h3>
          <div className="item-input-group">
            <div className="form-group">
              <label htmlFor="itemName">
                <span className="label-icon">📦</span>
                Item Name
              </label>
              <select
                id="itemName"
                name="itemName"
                value={currentItem.itemName}
                onChange={handleItemChange}
              >
                <option value="">Select an item</option>
                <option value="Book">Book</option>
                <option value="Pen">Pen</option>
                <option value="Pencil">Pencil</option>
                <option value="Eraser">Eraser</option>
                <option value="PensilBox">PensilBox</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="quantity">
                <span className="label-icon">🔢</span>
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={currentItem.quantity}
                onChange={handleItemChange}
                placeholder="Enter quantity"
                min="1"
              />
            </div>

            <button type="button" onClick={handleAddItem} className="add-item-btn">
              Add Item
            </button>
          </div>

          {items.length > 0 && (
            <div className="items-list">
              <h4>Added Items:</h4>
              <ul>
                {items.map((item, index) => (
                  <li key={index}>
                    {item.itemName} - Quantity: {item.quantity}
                    <button 
                      type="button" 
                      onClick={() => handleRemoveItem(index)}
                      className="remove-item-btn"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Submit Order
        </button>
      </form>
    </div>
  );
}

export default OrderForm;
