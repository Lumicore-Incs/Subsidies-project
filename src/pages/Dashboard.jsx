import { useMemo } from 'react';
import './css/Dashboard.css';

function Dashboard({ orders }) {
  // Calculate item statistics
  const itemStats = useMemo(() => {
    const stats = {};
    
    // Count items from orders
    orders.forEach(order => {
      if (order.items && order.items.length > 0) {
        order.items.forEach(item => {
          const itemName = item.itemName;
          if (!stats[itemName]) {
            stats[itemName] = 0;
          }
          stats[itemName] += parseInt(item.quantity) || 0;
        });
      } else if (order.itemName) {
        // Support old format
        const itemName = order.itemName;
        if (!stats[itemName]) {
          stats[itemName] = 0;
        }
        stats[itemName] += parseInt(order.quantity) || 0;
      }
    });

    return stats;
  }, [orders]);

  const totalOrders = orders.length;
  const totalItems = Object.values(itemStats).reduce((sum, count) => sum + count, 0);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>📊 Dashboard</h2>
        <p>Overview of your order statistics</p>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>{totalOrders}</h3>
            <p>Total Orders</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <h3>{totalItems}</h3>
            <p>Total Items</p>
          </div>
        </div>
      </div>

      <div className="items-statistics">
        <h3>Item Distribution</h3>
        <div className="items-progress-list">
          {Object.entries(itemStats)
            .sort(([, a], [, b]) => b - a) // Sort by count descending
            .map(([item, count]) => {
              const percentage = totalItems > 0 ? (count / totalItems) * 100 : 0;
              return (
                <div key={item} className="progress-item">
                  <div className="progress-header">
                    <span className="item-name">{item}</span>
                    <span className="item-count">{count} ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="progress-bar-container">
                    <div 
                      className="progress-bar-fill" 
                      style={{ width: `${percentage}%` }}
                    >
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {orders.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No Orders Yet</h3>
          <p>Start creating orders to see your statistics here!</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
