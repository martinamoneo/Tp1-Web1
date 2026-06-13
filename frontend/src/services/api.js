const API_BASE_URL = 'http://localhost:3000/api';

/**
 * Handle API responses globally
 */
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API error: ${response.status}`);
    }
    return response.json();
};

export const apiService = {
    // Products
    getProducts: (params = {}) => {
        const queryParams = new URLSearchParams(params).toString();
        const url = queryParams ? `${API_BASE_URL}/?${queryParams}` : `${API_BASE_URL}/`;
        return fetch(url).then(handleResponse);
    },
    
    getProductById: (id) => {
        return fetch(`${API_BASE_URL}/product/${id}`).then(handleResponse);
    },

    // Categories
    getCategoryProducts: (categoryName) => {
        return fetch(`${API_BASE_URL}/categories/${categoryName}`).then(handleResponse);
    },

    // Auth
    login: (credentials) => {
        return fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        }).then(handleResponse);
    },

    register: (userData) => {
        return fetch(`${API_BASE_URL}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        }).then(handleResponse);
    }
};

export default apiService;
