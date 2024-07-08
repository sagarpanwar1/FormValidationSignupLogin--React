import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductView = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
  
    useEffect(() => {
      axios.get('https://fakestoreapi.com/products')
        .then(response => setProducts(response.data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);
  
    const handleAddToCart = (product) => {
      setCart(prevCart => ({
        ...prevCart,
        [product.id]: (prevCart[product.id] || 0) + 1
      }));
    };
  
    const handleQuantityChange = (productId, amount) => {
      setCart(prevCart => {
        const newQuantity = (prevCart[productId] || 0) + amount;
        if (newQuantity <= 0) {
          const { [productId]: _, ...rest } = prevCart;
          return rest;
        }
        return { ...prevCart, [productId]: newQuantity };
      });
    };
  
    return (
        
      <div className="product-view">
                 {/* <div className="cart-icon">
                  <FaShoppingCart />
                  <span className="cart-count">{totalItemsInCart}</span>
                </div> */}
        {products.map(product => (
          <div key={product.id} className="product-card">
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <img src={product.image} alt="Product Image" />
            <p>${product.price}</p>
            <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
            {cart[product.id] && (
              <div className="cart-controls">
                <button onClick={() => handleQuantityChange(product.id, -1)}>-</button>
                <span>{cart[product.id]}</span>
                <button onClick={() => handleQuantityChange(product.id, 1)}>+</button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
}

export default ProductView