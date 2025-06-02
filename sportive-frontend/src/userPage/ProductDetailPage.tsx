import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import FooterClient from "../components/footer/FooterClient";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: {
    _id: string;
    name: string;
    description?: string;
  };
}

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/products/${id}`);
        console.log('Product data:', response.data);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-xl text-gray-600">Product not found</p>
      </div>
    );
  }

  const imageUrl = product.image.startsWith('http') ? product.image : `http://localhost:3000${product.image}`;

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: imageUrl,
      quantity,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-1 p-8 max-w-5xl mx-auto">
        <Link to="/" className="text-indigo-600 text-sm mb-4 inline-block hover:underline">
          ← Quay lại trang chủ
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 rounded-lg shadow-lg">
          {/* Product Image */}
          <div>Thêm vào giỏ hàng
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full rounded-lg shadow-md"
            />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-700 mb-6">{product.description}</p>

            <div className="mb-6">
              <span className="text-3xl font-bold text-indigo-600">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-semibold mb-2">Số lượng</label>
              <div className="flex items-center border rounded-md w-36 overflow-hidden">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-200"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-200"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-2xl font-semibold shadow-md hover:from-indigo-700 hover:to-purple-700 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"

            >
              <Link to ="/cart">Thêm vào giỏ hàng</Link>
            </button>

            <div className="mt-10">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Chi tiết sản phẩm</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Danh mục</p>
                  <p className="font-medium text-gray-800">
                    {product.category?.name || 'Không có danh mục'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <FooterClient />
    </div>
  );
};

export default ProductDetailPage;
