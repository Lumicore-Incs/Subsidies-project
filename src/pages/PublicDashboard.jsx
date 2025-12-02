import { useMemo } from 'react';
import './css/PublicDashboard.css';

function PublicDashboard({ orders }) {
  // Calculate total statistics
  const stats = useMemo(() => {
    const totalOrders = orders.length;
    
    // Calculate total items across all orders
    const totalItems = orders.reduce((sum, order) => {
      const orderItemCount = order.items.reduce((itemSum, item) => {
        return itemSum + parseInt(item.quantity || 0);
      }, 0);
      return sum + orderItemCount;
    }, 0);

    // Calculate progress percentage (target: 500,000)
    const target = 500000;
    const progressPercentage = Math.min((totalItems / target) * 100, 100);

    // Calculate item statistics for chart
    const itemStats = {};
    const itemTypes = ['Book', 'Pen', 'Pencil', 'Eraser', 'PensilBox'];
    
    // Initialize all items with 0
    itemTypes.forEach(type => {
      itemStats[type] = 0;
    });
    
    // Count quantities for each item type
    orders.forEach(order => {
      order.items.forEach(item => {
        if (itemStats.hasOwnProperty(item.itemName)) {
          itemStats[item.itemName] += parseInt(item.quantity || 0);
        }
      });
    });

    // Find max value for chart scaling
    const maxValue = Math.max(...Object.values(itemStats), 1);

    return {
      totalOrders,
      totalItems,
      target,
      progressPercentage,
      itemStats,
      maxValue
    };
  }, [orders]);

  // Format number with commas
  const formatNumber = (num) => {
    return num.toLocaleString();
  };

  // Get color for each item type
  const getItemColor = (itemName) => {
    const colors = {
      'Book': '#667eea',
      'Pen': '#11998e',
      'Pencil': '#f093fb',
      'Eraser': '#ffd166',
      'PensilBox': '#764ba2'
    };
    return colors[itemName] || '#999';
  };

  // Get icon for each item type
  const getItemIcon = (itemName) => {
    const icons = {
      'Book': '📚',
      'Pen': '🖊️',
      'Pencil': '✏️',
      'Eraser': '🧹',
      'PensilBox': '📦'
    };
    return icons[itemName] || '📦';
  };

  return (
    <div className="public-dashboard-container">
      <div className="public-dashboard-header">
        <h1>📊 Public Dashboard</h1>
        <p>Real-time Order Statistics</p>
      </div>

      <div className="stats-grid">
        {/* Total Orders Card */}
        <div className="stat-card orders-card">
          <div className="stat-icon">📦</div>
          <div className="stat-content">
            <h3>Total Orders</h3>
            <div className="stat-value">{formatNumber(stats.totalOrders)}</div>
            <p className="stat-label">Orders Processed</p>
          </div>
        </div>

        {/* Total Items Card */}
        <div className="stat-card items-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>Total Items</h3>
            <div className="stat-value">{formatNumber(stats.totalItems)}</div>
            <p className="stat-label">Items Delivered</p>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="progress-section">
        <div className="progress-header">
          <h2>🎯 Progress to Target</h2>
          <div className="progress-stats">
            <span className="current-count">{formatNumber(stats.totalItems)}</span>
            <span className="separator">/</span>
            <span className="target-count">{formatNumber(stats.target)}</span>
          </div>
        </div>

        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill"
            style={{ width: `${stats.progressPercentage}%` }}
          >
            <span className="progress-percentage">
              {stats.progressPercentage.toFixed(1)}%
            </span>
          </div>
        </div>

        <div className="progress-info">
          <div className="info-item">
            <span className="info-label">Remaining:</span>
            <span className="info-value">
              {formatNumber(stats.target - stats.totalItems)} items
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Completion:</span>
            <span className="info-value">{stats.progressPercentage.toFixed(2)}%</span>
          </div>
        </div>
      </div>

      {/* Item Statistics Chart */}
      {orders.length > 0 && (
        <div className="chart-section">
          <h2>📊 Item Distribution</h2>
          <div className="chart-container">
            {Object.entries(stats.itemStats).map(([itemName, quantity]) => (
              <div key={itemName} className="chart-bar-wrapper">
                <div className="chart-bar-container">
                  <div 
                    className="chart-bar"
                    style={{
                      height: `${(quantity / stats.maxValue) * 100}%`,
                      background: getItemColor(itemName)
                    }}
                  >
                    <span className="chart-value">{formatNumber(quantity)}</span>
                  </div>
                </div>
                <div className="chart-label">
                  <span className="chart-icon">{getItemIcon(itemName)}</span>
                  <span className="chart-name">{itemName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {orders.length === 0 && (
        <div className="no-data">
          <div className="no-data-icon">📭</div>
          <h3>No Orders Yet</h3>
          <p>Start processing orders to see statistics here!</p>
        </div>
      )}
    </div>
  );
}

export default PublicDashboard;
