import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

const CartPage: React.FC = () => {
  const { items, getTotalPrice, isUserAuthenticated } = useCart();
  const navigate = useNavigate();
  const blue = '#2563eb';

  const handleCheckout = () => {
    if (!isUserAuthenticated()) {
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  // Show login prompt if not authenticated
  if (!isUserAuthenticated()) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: blue }}>Vui lòng đăng nhập</h2>
          <p className="text-gray-600 mb-6">Bạn cần đăng nhập để xem giỏ hàng và thanh toán</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 rounded-lg font-semibold transition-colors"
            style={{ background: blue, color: '#fff', fontWeight: 600 }}
          >
            Đăng nhập
          </button>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4" style={{ color: blue }}>Giỏ hàng trống</h2>
          <p className="text-gray-600 mb-6">Hãy thêm sản phẩm vào giỏ để tiếp tục mua sắm</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 rounded-lg font-semibold transition-colors"
            style={{ background: blue, color: '#fff', fontWeight: 600 }}
          >
            Tiếp tục mua sắm
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8" style={{ color: blue }}>Giỏ hàng</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {items.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              image={item.image}
              quantity={item.quantity}
            />
          ))}
        </div>

        {/* Order Summary */}
        <div className="rounded-lg p-6 h-fit" style={{ background: '#f0f6ff', border: `1.5px solid ${blue}33` }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: blue }}>Tóm tắt đơn hàng</h2>
          
          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Tạm tính</span>
              <span className="font-medium" style={{ color: blue }}>${getTotalPrice().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Vận chuyển</span>
              <span className="font-medium" style={{ color: blue }}>Miễn phí</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between">
                <span className="font-bold" style={{ color: blue }}>Tổng cộng</span>
                <span className="font-bold" style={{ color: blue }}>${getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full py-3 px-6 rounded-xl font-semibold shadow hover:shadow-lg transition"
            style={{ background: blue, color: '#fff', fontWeight: 600, fontSize: 17 }}
          >
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
