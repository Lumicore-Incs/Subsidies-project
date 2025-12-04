import { useMemo, useEffect, useState } from 'react';
import './css/PublicDashboard.css';

function PublicDashboard({ orders }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
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

  // Get top recent orders (last 5)
  const topOrders = useMemo(() => {
    // Sort orders by total item count in descending order
    const sortedByItems = [...orders].sort((a, b) => {
      const itemCountA = a.items.reduce((sum, item) => sum + parseInt(item.quantity || 0), 0);
      const itemCountB = b.items.reduce((sum, item) => sum + parseInt(item.quantity || 0), 0);
      return itemCountB - itemCountA; // Descending order (highest first)
    });
    
    // Return top 10 orders with most items
    return sortedByItems.slice(0, 10);
  }, [orders]);

  return (
    <>
      {/* First Section with Background Image */}
      <div className="public-dashboard-main-section">
        <div className="public-dashboard-container">
          <img
            src="/assets/Logo.png"
            alt="Company Logo"
            className="dashboard-logo"
          />


           {/* content */}
          <div className="text-section" style={{ textAlign: isMobile ? 'center' : 'center' }}>
            <p className='p1' style={{ textAlign: isMobile ? 'center' : 'center' }}>.xj;=r kdhhEï j,ska mSvd ú¢ wfmau wdorŒh ore megjqkag" biaflda,h ySkhla fkdfjkakg   › ,dxlslhka jYfhka wms tl;=fjuq'</p>
            <p style={{ textAlign: isMobile ? 'center' : 'center' }}>mdi,a WmlrK 500"000 m%udKhla yels blau‚ka tu orejka fj; ,n§u wmf.a n,dfmdfrd;a;=jhs'
              fï ;SrKd;aul fudfydf;a  ,ndfok fmd;la fyda mekai,la jqjo
              ore megjqkaf.a fyg oji t,sh lrkakg uyÕ= Wmldrhla fjkq fkdjkqudkh'''</p>
            <p className='p1' style={{ textAlign: isMobile ? 'center' : 'center' }}>fï mqxÑ ore megjq fjkqfjka  Tn;a yels mu‚ka w;a je,la fjkak'''</p>

          </div>

          {/* Progress Section */}
          <div className="progress-section">
            <div className="progress-header">
              <h2>🎯 Donation Progress</h2>
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
        </div>
      </div>

      {/* Second Section - Recent Top Orders */}
      {orders.length > 0 && (
        <div className="recent-orders-wrapper">
          <div className="top-orders-section">
            <h2>🎉 Top 10 Orders by Items</h2>
            <div className="orders-grid">
              {topOrders.map((order, index) => {
                const itemCount = order.items.reduce((sum, item) =>
                  sum + parseInt(item.quantity || 0), 0
                );
                return (
                  <div key={index} className="order-card">
                    <div className="order-card-header">
                      <div className="order-number">#{index + 1}</div>
                      <div className="order-date">{order.orderDate}</div>
                    </div>
                    <div className="order-customer">
                      <span className="customer-icon">👤</span>
                      <span className="customer-name">{order.customerName}</span>
                    </div>
                    <div className="order-id-section">
                      <span className="order-id-label">Order ID:</span>
                      <span className="order-id-value">{order.customerId}</span>
                    </div>
                    <div className="order-details">
                      <div className="detail-item">
                        <span className="detail-icon">📍</span>
                        <span className="detail-text">{order.address}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-icon">📞</span>
                        <span className="detail-text">{order.contactNumber}</span>
                      </div>
                    </div>
                    <div className="order-items">
                      <div className="items-header">
                        <span>📦 Items</span>
                        <span className="items-count">{itemCount} items</span>
                      </div>
                      <div className="items-list">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="item-row">
                            <span className="item-icon">{getItemIcon(item.itemName)}</span>
                            <span className="item-name">{item.itemName}</span>
                            <span className="item-quantity">×{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {orders.length === 0 && (
        <div className="public-dashboard-main-section">
          <div className="public-dashboard-container">
            <div className="no-data">
              <div className="no-data-icon">📭</div>
              <h3>No Orders Yet</h3>
              <p>Start processing orders to see statistics here!</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PublicDashboard;
