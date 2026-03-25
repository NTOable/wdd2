import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Button from "../components/Button";
import ProductDetails from "../components/ProductDetails";
import { useCart } from "../hooks/useCart";
import { inventoryService } from "../services/inventoryService";
import "./Products.css";

const Products = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await inventoryService.getAll();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    setAddingToCart(product._id);
    try {
      await addToCart({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.thumbnail || '',
      });
      alert(`${product.name} added to cart!`);
    } catch (error) {
      alert("Failed to add to cart: " + error.message);
    } finally {
      setAddingToCart(null);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products-container">
      <Button 
        onClick={() => navigate("/landing")}
        style={{ marginBottom: '20px' }}
      >
        ← Back to Home
      </Button>
      
      <h1>All Products</h1>
      
      <div className="products-search">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      
      {loading ? (
        <p>Loading products...</p>
      ) : filteredProducts.length === 0 ? (
        <p className="no-products">
          {searchTerm ? "No products match your search." : "No products available."}
        </p>
      ) : (
          <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product._id} className="product-card">
              {product.thumbnail && (
                <div className="product-image">
                  <img src={product.thumbnail} alt={product.name} />
                </div>
              )}
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-description">
                  {product.description?.substring(0, 80)}...
                </p>
                <p className="product-price">${product.price?.toFixed(2)}</p>
                <div className="product-actions">
                  <Button onClick={() => setSelectedProduct(product)}>
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
            </div>
          ))}
        </div>
      )}
      {selectedProduct && (
        <ProductDetails 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </div>
  );
};

export default Products;
