import './css/OrderList.css';

function OrderList({ orders }) {
  return (
    <div className="orders-section">
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>No orders yet. Create your first order!</p>
        </div>
      ) : (
        <div className="orders-list">
          {[...orders].reverse().map((order, index) => (
            <div key={index} className="order-card">
              <div className="order-header">
                <h3>Order #{orders.length - index}</h3>
                <span className="customer-id">{order.customerId}</span>
              </div>
              <div className="order-details">
                <div className="detail-row">
                  <span className="detail-label">Customer:</span>
                  <span className="detail-value">{order.customerName}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Address:</span>
                  <span className="detail-value">{order.address}</span>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Contact:</span>
                  <span className="detail-value">{order.contactNumber}</span>
                </div>
                <div className="detail-row items-row">
                  <span className="detail-label">Items:</span>
                  <div className="items-detail">
                    {order.items && order.items.length > 0 ? (
                      <ul className="order-items-list">
                        {order.items.map((item, itemIndex) => (
                          <li key={itemIndex}>
                            {item.itemName} - Qty: {item.quantity}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="detail-value">
                        {order.itemName} - Qty: {order.quantity}
                      </span>
                    )}
                  </div>
                </div>
                <div className="detail-row">
                  <span className="detail-label">Date:</span>
                  <span className="detail-value">{order.orderDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderList;
