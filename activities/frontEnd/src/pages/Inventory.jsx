import { useState, useEffect } from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";
import "./Login.css";
import { useCart } from "../hooks/useCart";
import TextArea from "../components/TextArea";
import slugify from "slugify";
import { inventoryService } from "../services/inventoryService";
import ProductDetails from "../components/ProductDetails";

const Inventory = () => {
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
    <div style={{ padding: '20px' }}>
      <Card title="Create Product">
        <form className="login-form" onSubmit={handleSubmit}>
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
          <p>No products available. Create one above!</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
            {products.map((product) => (
              <div key={product._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
                <h4 style={{ margin: '0 0 10px 0' }}>{product.name}</h4>
                <p style={{ color: '#666', fontSize: '14px' }}>{product.description?.substring(0, 50)}...</p>
                <p style={{ fontWeight: 'bold', fontSize: '18px', margin: '10px 0' }}>${product.price}</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
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
