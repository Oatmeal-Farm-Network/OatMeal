const API_BASE_URL = 'http://localhost:8000/api'; // Assuming your Django backend runs on port 8000

export const API_ENDPOINTS = {
    COUNTRIES: `${API_BASE_URL}/countries/`,
    STATES: `${API_BASE_URL}/states/`,
    BUSINESSES: `${API_BASE_URL}/businesses/`,
    BUSINESS_DETAILS: `${API_BASE_URL}/business_details/`,
    BUSINESS_ENRICHMENT: `${API_BASE_URL}/business_enrichment/`,
    // Add other endpoints if your minimal version needs them
}; 