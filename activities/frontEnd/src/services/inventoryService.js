const API_URL = "http://localhost:3000/api/inventory";

export const inventoryService = {
    // Get all products with optional filters
    async getAll(filters = {}) {
        const queryParams = new URLSearchParams(filters).toString();
        const response = await fetch(`${API_URL}?${queryParams}`);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Services: Get products failed");
        }

        return data;
    },

    // Get featured products only
    async getFeatured(limit = 10) {
        const response = await fetch(`${API_URL}/featured?limit=${limit}`);

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Services: Get featured products failed");
        }

        return data;
    },

    async create(productData) {
        const response = await fetch(`${API_URL}/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify(productData)
        });

        const data = await response.json();

        if(!response.ok) {
            throw new Error(data.message || "Services: Create product failed");
        }

        return data;
    },
     async update(productData, objectId) {
        const response = await fetch(`${API_URL}/update/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify(productData)
        });
        console.log(response)
        const data = await response.json();
        console.log(data)
        if(!response.ok) {
            throw new Error(data.message || "Services: Product update failed");
        }
    return data;
    }
};