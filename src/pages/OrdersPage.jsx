import { useState } from 'react';
import OrderForm from '../components/OrderForm';
import OrderList from '../components/OrderList';
import './css/OrdersPage.css';

function OrdersPage({ orders, onOrderSubmit }) {
  return (
    <div className="orders-page">
      <OrderForm onOrderSubmit={onOrderSubmit} />
      <OrderList orders={orders} />
    </div>
  );
}

export default OrdersPage;
