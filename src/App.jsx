import { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import OrdersPage from './pages/OrdersPage';
import Login from './pages/Login';
import PublicDashboard from './pages/PublicDashboard';
import { ToastProvider } from './components/Toast';
import { getOrders } from './services/api';
import './App.css';
import './fonts.css';

function App() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Check if user has valid token on initial load
    return !!localStorage.getItem('authToken');
  });
  const [username, setUsername] = useState(() => {
    // Restore username from localStorage
    return localStorage.getItem('userEmail') || '';
  });
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [loading, setLoading] = useState(true);

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getOrders();
      if (response.success && response.data) {
        // Transform API data to match dashboard format
        const transformedOrders = response.data.map(order => ({
          customerId: `CUST${String(order.id).padStart(3, '0')}`,
          customerName: order.customerName,
          address: order.address,
          contactNumber: order.contactNumber,
          items: order.orderDetails.map(detail => ({
            itemName: detail.item.itemName,
            quantity: detail.qty
          })),
          orderDate: new Date(order.orderDate).toISOString().split('T')[0]
        }));
        setOrders(transformedOrders);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  };

  // Check authentication token on mount and path changes
  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const userEmail = localStorage.getItem('userEmail');
    
    // If on admin path but no token, redirect to login
    if ((currentPath === '/admin' || currentPath.startsWith('/admin')) && !authToken) {
      setIsLoggedIn(false);
      setUsername('');
      navigateTo('/login');
      return;
    }
    
    // If token exists, set logged in state
    if (authToken) {
      setIsLoggedIn(true);
      if (userEmail) {
        setUsername(userEmail);
      }
    }
  }, [currentPath]);

  // Fetch orders on component mount (for both public and admin)
  useEffect(() => {
    fetchOrders();
  }, []);

  // Refetch orders when switching to dashboard page
  useEffect(() => {
    if (isLoggedIn && currentPage === 'dashboard') {
      fetchOrders();
    }
  }, [currentPage, isLoggedIn]);

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
    navigateTo('/admin');
  };

  const handleLogout = () => {
    // Clear authentication data from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUsername('');
    setCurrentPage('dashboard');
    navigateTo('/login');
  };

  const handleOrderSubmit = (newOrder) => {
    setOrders(prev => [...prev, newOrder]);
  };

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  // Show loader while loading data
  if (loading) {
    return (
      <div className="loader-overlay">
        <div className="modern-loader">
          <div className="loader-circle"></div>
          <div className="loader-circle"></div>
          <div className="loader-circle"></div>
        </div>
      </div>
    );
  }

  // Show login page at /login
  if (currentPath === '/login') {
    if (isLoggedIn) {
      navigateTo('/admin');
      return null;
    }
    return (
      <ToastProvider>
        <Login onLogin={handleLogin} />
      </ToastProvider>
    );
  }

  // Show public dashboard at root path
  if (currentPath === '/') {
    return (
      <ToastProvider>
        <div className="app-container">
          <PublicDashboard orders={orders} />
        </div>
      </ToastProvider>
    );
  }

  // Show admin panel if logged in and on /admin path
  if (currentPath === '/admin' || currentPath.startsWith('/admin')) {
    if (!isLoggedIn) {
      navigateTo('/login');
      return null;
    }
    return (
      <ToastProvider>
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
      </ToastProvider>
    );
  }

  // Default: Show public dashboard
  return (
    <ToastProvider>
      <div className="app-container">
        <PublicDashboard orders={orders} />
      </div>
    </ToastProvider>
  );
}

export default App;

