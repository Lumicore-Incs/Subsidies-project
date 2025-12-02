import { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import OrdersPage from './pages/OrdersPage';
import Login from './pages/Login';
import PublicDashboard from './pages/PublicDashboard';
import './App.css';

function App() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  // Handle browser navigation
  useEffect(() => {
    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  const handleLogin = (user) => {
    setUsername(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setCurrentPage('dashboard');
  };

  const handleOrderSubmit = (newOrder) => {
    setOrders(prev => [...prev, newOrder]);
  };

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Show public dashboard if on /public-dashboard path
  if (currentPath === '/public-dashboard') {
    return (
      <div className="app-container">
        <PublicDashboard orders={orders} />
      </div>
    );
  }

  // Show login page if not logged in
  if (!isLoggedIn) {
    return (
      <>
        <Login onLogin={handleLogin} />
        <div className="public-link-overlay">
          <button 
            className="public-link-btn"
            onClick={() => navigateTo('/public-dashboard')}
          >
            📊 View Public Dashboard
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="app-container">
      <header className="header">
        <div>
          <h1>Customer Order Management</h1>
          <p>Simple & Efficient Order Processing</p>
        </div>
        <div className="user-section">
          <span className="welcome-text">Welcome, {username}!</span>
          <button className="logout-btn" onClick={handleLogout}>
            <span>🚪</span> Logout
          </button>
        </div>
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
