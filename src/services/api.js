// Base URL for API
const BASE_URL = 'http://localhost:8080';
// const BASE_URL = 'https://api.weadits.com/demo-0.0.1-SNAPSHOT';


// API Service Functions

/**
 * Login user
 * @param {string} email - User email or username
 * @param {string} password - User password
 * @returns {Promise<Object>} Response data
 */
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/user/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const result = await response.json();

    if (response.status == 200 || response.status == 201) {
      console.log("-==================");
      console.log(result);

            console.log("-==================");

      
      localStorage.setItem('authToken', result.token);
      return result;
    } else {
      throw new Error(result.message || 'Login failed');
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Get all available items
 * @returns {Promise<Object>} Response data with items list
 */
export const getItems = async () => {
  try {
    const response = await fetch(`${BASE_URL}/orders/item`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch items');
    }

    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * Create new order
 * @param {Object} orderData - Order data
 * @returns {Promise<Object>} Response data
 */
export const createOrder = async (orderData) => {
  try {
    const authToken = localStorage.getItem('authToken');
    console.log("---------------");
    console.log(authToken);
    console.log("---------------");


    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      body: JSON.stringify(orderData)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to create order');
    }

    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * Get all orders
 * @returns {Promise<Object>} Response data with orders list
 */
export const getOrders = async () => {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch orders');
    }

    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * Delete order by ID
 * @param {number} orderId - Order ID to delete
 * @returns {Promise<Object>} Response data
 */
export const deleteOrder = async (orderId) => {
  try {
    const response = await fetch(`${BASE_URL}/orders/${orderId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to delete order');
    }

    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * Get dashboard statistics
 * @returns {Promise<Object>} Response data with statistics
 */
export const getDashboardStats = async () => {
  try {
    const response = await fetch(`${BASE_URL}/dashboard/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to fetch dashboard stats');
    }

    return result;
  } catch (error) {
    throw error;
  }
};

export default {
  BASE_URL,
  loginUser,
  getItems,
  createOrder,
  getOrders,
  deleteOrder,
  getDashboardStats
};
