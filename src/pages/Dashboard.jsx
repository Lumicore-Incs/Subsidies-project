import { useMemo } from 'react';
import './Dashboard.css';

function Dashboard({ orders }) {
  // Calculate item statistics
  const itemStats = useMemo(() => {
    const stats = {};
    const itemTypes = ['Book', 'Pen', 'Pencil', 'Eraser', 'PensilBox'];
    
    // Initialize all items with 0
    itemTypes.forEach(item => {
      stats[item] = 0;
    });

    // Count items from orders
    orders.forEach(order => {
      if (order.items && order.items.length > 0) {
        order.items.forEach(item => {
          if (stats[item.itemName] !== undefined) {
            stats[item.itemName] += parseInt(item.quantity) || 0;
          }
        });
      } else if (order.itemName) {
        // Support old format
        if (stats[order.itemName] !== undefined) {
          stats[order.itemName] += parseInt(order.quantity) || 0;
        }
      }
    });

    return stats;
  }, [orders]);

  const totalOrders = orders.length;
  const totalItems = Object.values(itemStats).reduce((sum, count) => sum + count, 0);
  const maxCount = Math.max(...Object.values(itemStats), 1);

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
          {Object.entries(itemStats).map(([item, count]) => {
            const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
            return (
              <div key={item} className="progress-item">
                <div className="progress-header">
                  <span className="item-name">{item}</span>
                  <span className="item-count">{count}</span>
                </div>
                <div className="progress-bar-container">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${percentage}%` }}
                  >
                    {count > 0 && <span className="progress-label">{percentage.toFixed(0)}%</span>}
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
