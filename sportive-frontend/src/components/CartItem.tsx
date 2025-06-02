import React from 'react';
import { useCart } from '../context/CartContext';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const CartItem: React.FC<CartItemProps> = ({ id, name, price, image, quantity }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      <img src={image} alt={name} className="w-24 h-24 object-cover rounded-md" />
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
        <p className="text-primary font-bold">${price.toFixed(2)}</p>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center border rounded-md">
            <button
              onClick={() => updateQuantity(id, Math.max(0, quantity - 1))}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
            >
              -
            </button>
            <span className="px-3 py-1 border-x">{quantity}</span>
            <button
              onClick={() => updateQuantity(id, quantity + 1)}
              className="px-3 py-1 text-gray-600 hover:bg-gray-100"
            >
              +
            </button>
          </div>
          <button
            onClick={() => removeFromCart(id)}
            className="text-red-500 hover:text-red-700"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="text-lg font-bold">
        ${(price * quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem; 