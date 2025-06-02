import { Heart, ShoppingCart, Eye } from 'lucide-react';
import type { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewProduct: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onViewProduct }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Mới
            </span>
          )}
          {product.onSale && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              -{discountPercentage}%
            </span>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200">
            <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
          </button>
          <button
            onClick={() => onViewProduct(product)}
            className="bg-white p-2 rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200"
          >
            <Eye className="h-4 w-4 text-gray-600 hover:text-blue-500" />
          </button>
        </div>

        {/* Quick add to cart overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-white text-gray-900 py-2 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors duration-200"
          >
            <ShoppingCart className="h-4 w-4" />
            Thêm vào giỏ
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <span className="text-sm text-gray-500 font-medium">{product.brand}</span>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

        {/* Colors */}
        <div className="flex items-center gap-1 mb-3">
          {product.colors.slice(0, 4).map((color) => (
            <div
              key={color}
              className={`w-4 h-4 rounded-full border-2 border-gray-300 ${
                color === 'black' ? 'bg-black' :
                color === 'white' ? 'bg-white' :
                color === 'red' ? 'bg-red-500' :
                color === 'blue' ? 'bg-blue-500' :
                color === 'brown' ? 'bg-amber-700' :
                color === 'gray' ? 'bg-gray-500' :
                color === 'navy' ? 'bg-blue-900' :
                color === 'nude' ? 'bg-pink-200' :
                'bg-gray-400'
              }`}
              title={color}
            />
          ))}
          {product.colors.length > 4 && (
            <span className="text-xs text-gray-500 ml-1">+{product.colors.length - 4}</span>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          {/* Sizes indicator */}
          <div className="text-xs text-gray-500">
            Size {Math.min(...product.sizes)}-{Math.max(...product.sizes)}
          </div>
        </div>
      </div>
    </div>
  );
}
