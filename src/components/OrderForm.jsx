import { useState, useEffect } from 'react';
import { useToast } from './Toast';
import { getItems, createOrder } from '../services/api';
import './css/OrderForm.css';

function OrderForm({ onOrderSubmit }) {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    customerName: '',
    address: '',
    contactNumber: ''
  });

  const [items, setItems] = useState([]);
  const [availableItems, setAvailableItems] = useState([]);
  const [currentItem, setCurrentItem] = useState({
    itemName: '',
    quantity: ''
  });

  // Fetch available items from API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const result = await getItems();
        
        if (result.success && result.data) {
          setAvailableItems(result.data);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
        showToast('Failed to load items', 'error');
      }
    };

    fetchItems();
  }, []);

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
      showToast('Please select an item and enter quantity', 'warning');
      return;
    }

    setItems(prev => [...prev, { ...currentItem }]);
    setCurrentItem({ itemName: '', quantity: '' });
    showToast('Item added successfully!', 'success');
  };

  // Remove item from the list
  const handleRemoveItem = (index) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  // Handle final order submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.customerName || !formData.address || !formData.contactNumber) {
      showToast('Please fill in customer details', 'warning');
      return;
    }

    if (items.length === 0) {
      showToast('Please add at least one item', 'warning');
      return;
    }

    try {
      // Prepare order data for API
      const orderData = {
        customerName: formData.customerName,
        address: formData.address,
        contactNumber: formData.contactNumber,
        items: items.map(item => {
          // Find the item ID from availableItems
          const foundItem = availableItems.find(ai => ai.itemName === item.itemName);
          return {
            itemId: foundItem ? foundItem.id : null,
            qty: parseInt(item.quantity)
          };
        })
      };

      // Call the API
      const response = await createOrder(orderData);
      
      if (response.success) {
        showToast(`Order Created Successfully! Order ID: ${response.data.id} | Customer: ${response.data.customerName} | Total Items: ${items.length}`, 'success');
        
        // Create new order for local state
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
      } else {
        showToast('Order Creation Failed: ' + (response.message || 'Unknown error'), 'error');
      }
    } catch (error) {
      showToast('Order Creation Error: ' + error.message, 'error');
    }
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
            Donation Barnch
          </label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter delivery branch"
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
                {availableItems.map((item) => (
                  <option key={item.id} value={item.itemName}>
                    {item.itemName}
                  </option>
                ))}
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
