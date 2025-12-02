import { useState } from 'react';
import OrderForm from './OrderForm';
import OrderList from './OrderList';
import './css/OrderPage.css';

function OrderPage() {
  const [orders, setOrders] = useState([]);

  // Handle order submission from OrderForm component
  const handleOrderSubmit = (newOrder) => {
    setOrders(prev => [...prev, newOrder]);
  };

  return (
    <div className="order-page">
      <OrderForm onOrderSubmit={handleOrderSubmit} />
      <OrderList orders={orders} />
    </div>
  );
}

export default OrderPage;
