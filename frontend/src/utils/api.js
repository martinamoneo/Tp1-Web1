// intermediario entre el front y el back
// recibe las solicitudes del front y las manda al back

export const SERVER_URL = 'http://localhost:3000'; // se guarda la url del servidor en una variable
const API_BASE_URL = `${SERVER_URL}/api`; // se guarda la url de la API para usarla en las funciones

// Si no es exitosa la respuesta de la API, manda a la pantalla de error 500
const handleResponse = async (response) => {
    if (!response.ok) { // si la respuesta no es exitosa
        if (response.status === 500) { // si el error es 500
            window.location.href = '/500'; // manda a la pantalla de error 500
            return;
        }
        // se guarda la respuesta de la API en una variable
        const errorData = await response.json().catch(() => ({})); 
        // se lanza un error con el mensaje de la API
        throw new Error(errorData.message || `API error: ${response.status}`);
    }
    // se retorna la respuesta de la API en formato JSON
    return response.json();
};

const apiService = {
    // obtener productos
    getProducts: (params = {}) => {
        const queryParams = new URLSearchParams(params).toString(); // convierte los parametros en query params
        const url = queryParams ? `${API_BASE_URL}/?${queryParams}` : `${API_BASE_URL}/`; // crea la url con los query params si existen
        return fetch(url).then(handleResponse); // retorna la respuesta de la API
    },
    
    // obtener producto por id
    getProductById: (id) => {
        // agrega el ID a la URL y llama a la API
        return fetch(`${API_BASE_URL}/product/${id}`).then(handleResponse);
    },

    // obtener productos por categoría
    getCategoryProducts: (categoryName) => {
        // agrega el nombre de la categoría a la URL y llama a la API
        return fetch(`${API_BASE_URL}/categories/${categoryName}`).then(handleResponse);
    },

    // buscar productos por nombre
    searchProducts: (query) => {
        return fetch(`${API_BASE_URL}/search?query=${encodeURIComponent(query)}`).then(handleResponse);
    },

    // Actualizar producto (PUT)
    updateProduct: (id, productData) => {
        return fetch(`${API_BASE_URL}/products/${id}/edit`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        }).then(handleResponse);
    },

    // Crear producto (POST)
    createProduct: (productData) => {
        return fetch(`${API_BASE_URL}/products/new`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
        }).then(handleResponse);
    },

    // Eliminar producto (DELETE)
    deleteProduct: (id) => {
        return fetch(`${API_BASE_URL}/products/${id}/delete`, {
            method: 'DELETE'
        }).then(handleResponse);
    },

    // Auth
    login: (credentials) => {
        // llama a la ruta /login con los datos del usuario
        return fetch(`${API_BASE_URL}/login`, { // se guarda la url de la API en una variable
            method: 'POST', // se define el método como POST
            headers: { // se define las cabeceras de la solicitud
                'Content-Type': 'application/json', // se define el tipo de contenido
            },
            body: JSON.stringify(credentials), // se convierte los datos del usuario a JSON
        }).then(handleResponse);
    },

    register: (userData) => {
        // llama a la ruta /register con los datos del usuario
        return fetch(`${API_BASE_URL}/register`, { // se guarda la url de la API en una variable
            method: 'POST', // se define el método como POST
            headers: { // se define las cabeceras de la solicitud
                'Content-Type': 'application/json', // se define el tipo de contenido
            },
            body: JSON.stringify(userData), // se convierte los datos del usuario a JSON
        }).then(handleResponse); // retorna la respuesta de la API
    }
};

export default apiService;
