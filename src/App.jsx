import { useState } from 'react';
import Dashboard from './pages/Dashboard';
import OrdersPage from './pages/OrdersPage';
import './App.css';

function App() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleOrderSubmit = (newOrder) => {
    setOrders(prev => [...prev, newOrder]);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Customer Order Management</h1>
        <p>Simple & Efficient Order Processing</p>
      </header>

      <nav className="navigation">
        <button 
          className={`nav-btn ${currentPage === 'dashboard' ? 'active' : ''}`}
          onClick={() => setCurrentPage('dashboard')}
        >
          <span className="nav-icon">📊</span>
          Dashboard
        </button>
        <button 
          className={`nav-btn ${currentPage === 'orders' ? 'active' : ''}`}
          onClick={() => setCurrentPage('orders')}
        >
          <span className="nav-icon">📦</span>
          Orders
        </button>
      </nav>

      <div className="main-content">
        {currentPage === 'dashboard' ? (
          <Dashboard orders={orders} />
        ) : (
          <OrdersPage orders={orders} onOrderSubmit={handleOrderSubmit} />
        )}
      </div>
    </div>
  );
}

export default App;
