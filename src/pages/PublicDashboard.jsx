import { useMemo, useEffect, useState } from 'react';
import './css/PublicDashboard.css';
import Logo from '/assets/Logo.png';

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
    const target = 100000;
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
        {/* Login Button */}

        <div className="public-dashboard-container">
          <img
            src={Logo}
            alt="Company Logo"
            className="dashboard-logo"
          />


          {/* content */}
          <div className="text-section" style={{ textAlign: isMobile ? 'center' : 'center' }}>
            <p className='p1' style={{ textAlign: isMobile ? 'center' : 'center' }}>.xj;=r kdhhEï j,ska mSvd ú¢ wfmau wdorŒh ore megjqkag" biaflda,h ySkhla fkdfjkakg   › ,dxlslhka jYfhka wms tl;=fjuq'</p>
            <p style={{ textAlign: isMobile ? 'center' : 'center' }}>mdi,a WmlrK 100"000 m%udKhla yels blau‚ka tu orejka fj; ,nd§u wmf.a n,dfmdfrd;a;=jhs'
              fï ;SrKd;aul fudfydf;a  ,ndfok fmd;la fyda mekai,la jqjo
              ore megjqkaf.a fyg oji t,sh lrkakg uyÕ= Wmldrhla fjkq fkdjkqudkh'''</p>
            <p className='p1' style={{ textAlign: isMobile ? 'center' : 'center' }}>fï mqxÑ ore megjq fjkqfjka  Tn;a yels mu‚ka w;a je,la fjkak'''</p>

          </div>
          {/* Progress Section */}
          <div className="progress-section">
            <div className="progress-header">
              <h2> Donation Progress</h2>
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

      {/* Contact Section */}
      <div className="contact-section-wrapper">
        <div className="contact-section">
          <div className="contact-main-container">

            {/* Left Side - Donation Items */}
            <div className="donation-items-section">
              <h2>,ndÈh yels WmlrK</h2>
              <div className="donation-items-list">
                <div className="donation-item">
                  <span className="item-bullet">•</span>
                  <span className="item-text">fmd;a</span>
                </div>
                <div className="donation-item">
                  <span className="item-bullet">•</span>
                  <span className="item-text">mekai,a</span>
                </div>
                <div className="donation-item">
                  <span className="item-bullet">•</span>
                  <span className="item-text">mEka</span>
                </div>
                <div className="donation-item">
                  <span className="item-bullet">•</span>
                  <span className="item-text">mdgfmÜá</span>
                </div>
                <div className="donation-item">
                  <span className="item-bullet">•</span>
                  <span className="item-text">lEu fmÜá</span>
                </div>
                <div className="donation-item">
                  <span className="item-bullet">•</span>
                  <span className="item-text">im;a;=</span>
                </div>
                <div className="donation-item">
                  <span className="item-bullet">•</span>
                  <span className="item-text">wärE,a</span>
                </div>
                <div className="donation-item">
                  <span className="item-bullet">•</span>
                  <span className="item-text">mdi,a nE.a</span>
                </div>
                <div className="donation-item">
                  <span className="item-bullet">•</span>
                  <span className="item-text">j;=r fnda;,a</span>
                </div>
                <div className="donation-item">
                  <span className="item-bullet">•</span>
                  <span className="item-text">we;=¨ ´kEu mdi,a WmlrK</span>
                </div>
              </div>
            </div>

            {/* Right Side - Contact Grid */}
            <div className='main-container-right'>
              <h2> f.kú;a NdrÈh yels ia:dk </h2>
              <div className="contact-grid">
                <div className="contact-card">
                  <div className="contact-header">ls;=,ïmsáh</div>
                  <div className="contact-details">
                    <div className="contact-item">
                      <div className="contact-numbers">
                        <a href="tel:0770542511" className="contact-number">
                          <img src="/assets/callIcon.png" alt="call" className="phone-icon" />
                          077 054 2511 - pß;a
                        </a>
                        <a href="tel:0712325859" className="contact-number">
                          <img src="/assets/callIcon.png" alt="call" className="phone-icon" />
                          071 232 5859 - ks,dks
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="contact-card">
                  <div className="contact-header">wïn,kaf.dv </div>
                  <div className="contact-details">
                    <div className="contact-item">
                      <div className="contact-numbers">
                        <a href="tel:0774512050" className="contact-number">
                          <img src="/assets/callIcon.png" alt="call" className="phone-icon" />
                          077 251 2050 - ;reIs
                        </a>
                        <a href="tel:0769102620" className="contact-number">
                          <img src="/assets/callIcon.png" alt="call" className="phone-icon" />
                          076 910 2620 - mis÷
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="contact-card">
                  <div className="contact-header">lf,a.dk </div>
                  <div className="contact-details">
                    <div className="contact-item">
                      <div className="contact-numbers">
                        <a href="tel:0772825694" className="contact-number">
                          <img src="/assets/callIcon.png" alt="call" className="phone-icon" />
                          077 282 5694 - ksi,
                        </a>
                        <a href="tel:0719323224" className="contact-number">
                          <img src="/assets/callIcon.png" alt="call" className="phone-icon" />
                          071 932 3224 - yß÷
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="contact-card">
                  <div className="contact-header">ud;r </div>
                  <div className="contact-details">
                    <div className="contact-item">
                      <div className="contact-numbers">
                        <a href="tel:0767820049" className="contact-number">
                          <img src="/assets/callIcon.png" alt="call" className="phone-icon" />
                          076 782 0049 - k÷ka
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="contact-card">
                  <div className="contact-header">we,amsáh </div>
                  <div className="contact-details">
                    <div className="contact-item">
                      <div className="contact-numbers">
                        <a href="tel:0764006907" className="contact-number">
                          <img src="/assets/callIcon.png" alt="call" className="phone-icon" />
                          076 400 6907 - úrdÊ
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="contact-card">
                  <div className="contact-header">w¨;a.u </div>
                  <div className="contact-details">
                    <div className="contact-item">
                      <div className="contact-numbers">
                        <a href="tel:0769102620" className="contact-number">
                          <img src="/assets/callIcon.png" alt="call" className="phone-icon" />
                          076 910 2620 - mis÷
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='contact-grid2'>
                <div className="contact-card">
                  <div className="contact-header">.d,a, ñkqjkaf.dv</div>
                  <div className="contact-details">
                    <div className="contact-item">
                      <div className="contact-numbers">
                        <a href="tel:0707820049" className="contact-number contact-number10">
                          <img src="/assets/callIcon.png" alt="call" className="phone-icon" />
                          070 782 0049 - ysuxl
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="contact-card">
                  <div className="contact-header">ud,fí </div>
                  <div className="contact-details">
                    <div className="contact-item">
                      <div className="contact-numbers">
                        <a href="tel:0706850647" className="contact-number contact-number10">
                          <img src="/assets/callIcon.png" alt="call" className="phone-icon" />
                          070 685 0647 - iyka
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      {/* Second Section - Recent Top Orders */}
      {orders.length > 0 && (
        <div className="recent-orders-wrapper">
          <div className="top-orders-section">
            <h2> Our Donors</h2>
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

      {/* Footer / Copyright Section */}
      <footer className="public-footer">
        <div className="footer-bottom">
          <p>© 2025 Adits. All Rights Reserved. | Designed & Developed with Adits Technologies</p>
          <p className="footer-credits">Powered by <a href="https://piyumalnipuna60.github.io/My-Portfoliyo-2" target="_blank" rel="noopener noreferrer">Nipuna Piyumal</a></p>
        </div>
      </footer>
    </>
  );
}

export default PublicDashboard;
