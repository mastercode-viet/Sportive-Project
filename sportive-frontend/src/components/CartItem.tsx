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
  const blue = '#2563eb';

  return (
    <div className="flex items-center gap-4 py-4 border-b" style={{ borderColor: blue + '33' }}>
      <img src={image} alt={name} className="w-24 h-24 object-cover rounded-md border" style={{ borderColor: blue + '33' }} />
      <div className="flex-1">
        <h3 className="text-lg font-semibold" style={{ color: blue }}>{name}</h3>
        <p className="font-bold" style={{ color: blue }}>${price.toFixed(2)}</p>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center border rounded-md" style={{ borderColor: blue + '33' }}>
            <button
              onClick={() => updateQuantity(id, Math.max(0, quantity - 1))}
              className="px-3 py-1 hover:bg-blue-50 transition"
              style={{ color: blue }}
            >
              -
            </button>
            <span className="px-3 py-1 border-x" style={{ borderColor: blue + '33', color: blue }}>{quantity}</span>
            <button
              onClick={() => updateQuantity(id, quantity + 1)}
              className="px-3 py-1 hover:bg-blue-50 transition"
              style={{ color: blue }}
            >
              +
            </button>
          </div>
          <button
            onClick={() => removeFromCart(id)}
            className="font-semibold transition"
            style={{ color: '#e11d48' }}
          >
            Xóa
          </button>
        </div>
      </div>
      <div className="text-lg font-bold" style={{ color: blue }}>
        ${(price * quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem; 