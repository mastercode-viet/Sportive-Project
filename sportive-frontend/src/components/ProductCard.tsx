import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import type { Product } from '../data/products';
import { message } from "antd";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, description }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Add server URL prefix to image path if it's a relative path
  const imageUrl = image.startsWith('http') ? image : `http://localhost:3000${image}`;

  const handleAddToCart = () => {
    const userStr = localStorage.getItem('refine-auth');
    if (!userStr) {
      message.warning('Bạn cần đăng nhập để thêm vào giỏ hàng!');
      navigate('/login');
      return;
    }
    addToCart({ id, name, price, image: imageUrl, quantity: 1 });
    message.success('Đã thêm vào giỏ hàng!');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/product/${id}`}>
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${id}`}>
          <h3 className="text-lg font-semibold text-gray-800 hover:text-primary">{name}</h3>
        </Link>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-xl font-bold text-primary">${price.toFixed(2)}</span>
          <button
            onClick={handleAddToCart}
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
