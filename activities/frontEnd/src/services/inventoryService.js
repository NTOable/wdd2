const API_URL = "http://localhost:3000/api/inventory";

export const inventoryService ={
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