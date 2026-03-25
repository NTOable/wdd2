import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import "./Inventory.css";
import { useCart } from "../hooks/useCart";
import TextArea from "../components/TextArea";
import slugify from "slugify";
import { inventoryService } from "../services/inventoryService";
import ProductDetails from "../components/ProductDetails";

const Inventory = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: 0,
  });
  const [loading, setLoading] = useState();
  const [errors, setErrors] = useState({});
  const [slug, setSlug] = useState("");
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const { addToCart } = useCart();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Include the generated slug in formData
      const productData = {
        ...formData,
        slug: slug,
      };
      await inventoryService.create(productData);
      alert("Product created successfully!");
      // Reset form
      setFormData({ name: "", slug: "", description: "", price: 0 });
      setSlug("");
      // Refresh products
      const data = await inventoryService.getAll();
      setProducts(data);
    } catch (error) {
      setErrors({ error: error.message });
    }
  };

  const handleAddToCart = async (product) => {
    setAddingToCart(product._id);
    try {
      await addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image || '',
      });
      alert(`${product.name} added to cart!`);
    } catch (error) {
      alert("Failed to add to cart: " + error.message);
    } finally {
      setAddingToCart(null);
    }
  };

  useEffect(() => {
    const generatedSlug = slugify(formData.name, {
      lower: true,
      strict: true,
    });
    setSlug(generatedSlug);
  }, [formData.name]);

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await inventoryService.getAll();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setProductsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="inventory-container">
      <Button 
        onClick={() => navigate("/landing")}
        style={{ marginBottom: '20px' }}
      >
        ← Return to Home
      </Button>
      
      <Card title="Create Product">
        <form className="inventory-form" onSubmit={handleSubmit}>
          <Input
            label="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={errors.name}
            placeholder="Enter product name"
            required
          />
          <Input
            label="Slug"
            type="text"
            name="slug"
            value={slug}
            onChange={handleChange}
            error={errors.slug}
            disabled
          />
          <TextArea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            error={errors.description}
            rows={10}
            cols={40}
          ></TextArea>
          <Input
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            error={errors.price}
            onChange={handleChange}
          />
          <Button type="submit" loading={loading}>
            Save Product
          </Button>
        </form>
      </Card>

      <Card title="Available Products" style={{ marginTop: '20px' }}>
        {productsLoading ? (
          <p>Loading products...</p>
        ) : products.length === 0 ? (
          <p className="empty-state">No products available. Create one above!</p>
        ) : (
          <div className="inventory-grid">
            {products.map((product) => (
              <div className="product-card" key={product._id}>
                <h4>{product.name}</h4>
                <p className="description">{product.description?.substring(0, 50)}...</p>
                <p className="price">${product.price}</p>
                <div className="actions">
                  <Button 
                    onClick={() => setSelectedProduct(product)}
                  >
                    View Details
                  </Button>
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    loading={addingToCart === product._id}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {selectedProduct && (
        <ProductDetails 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default Inventory;
