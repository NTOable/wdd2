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
    stock: 0,
    thumbnail: "",
    tags: "",
  });
  const [loading, setLoading] = useState();
  const [errors, setErrors] = useState({});
  const [slug, setSlug] = useState("");
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const { addToCart } = useCart();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          thumbnail: reader.result,
        }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const tagsArray = formData.tags
        ? formData.tags.split(",").map(tag => tag.trim()).filter(tag => tag)
        : [];
      
      const productData = {
        ...formData,
        slug: slug,
        tags: tagsArray,
      };
      await inventoryService.create(productData);
      alert("Product created successfully!");
      setFormData({ name: "", slug: "", description: "", price: 0, stock: 0, thumbnail: "", tags: "" });
      setSlug("");
      setImagePreview(null);
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
          <TextArea
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            error={errors.description}
            rows={4}
          ></TextArea>
          <div className="input-group">
            <label className="input-label">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="input-field"
              style={{ padding: '0.5rem' }}
            />
            {imagePreview && (
              <div style={{ marginTop: '10px' }}>
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  style={{ maxWidth: '200px', borderRadius: '8px' }} 
                />
              </div>
            )}
          </div>
          <Input
            label="Tags"
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="charger, usb, fast charging (comma separated)"
          />
          <div className="form-row">
            <Input
              label="Price"
              name="price"
              type="number"
              value={formData.price}
              error={errors.price}
              onChange={handleChange}
              min="0"
              step="0.01"
            />
            <Input
              label="Stock"
              name="stock"
              type="number"
              value={formData.stock}
              error={errors.stock}
              onChange={handleChange}
              min="0"
            />
          </div>
          <Button type="submit" loading={loading}>
            Save Product
          </Button>
        </form>
      </Card>

      {/* Available Products section - hidden for now */}
      {/* <Card title="Available Products" style={{ marginTop: '20px' }}>
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
      </Card> */}

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
