import HeaderClient from "../components/header/HeaderClient";
import FooterClient from "../components/footer/FooterClient";
import CartItem from "../components/cart/CartItem";
import { Link } from "react-router-dom";

// Mock cart data
const cartItems = [
  {
    id: "1",
    name: "Áo thể thao",
    image: "https://via.placeholder.com/300x200?text=Áo+thể+thao",
    price: 299000,
    quantity: 2,
  },
  {
    id: "2",
    name: "Quần thể thao",
    image: "https://via.placeholder.com/300x200?text=Quần+thể+thao",
    price: 249000,
    quantity: 1,
  },
];

const CartPage = () => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderClient />
      <main className="flex-1 p-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Giỏ hàng</h1>
        <div className="mb-4">
          {cartItems.length === 0 ? (
            <div>Giỏ hàng của bạn đang trống.</div>
          ) : (
            cartItems.map((item) => <CartItem key={item.id} item={item} />)
          )}
        </div>
        <div className="flex justify-between items-center mt-6">
          <div className="font-bold text-lg">Tổng cộng: {total.toLocaleString()}₫</div>
          <Link to="/checkout" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Thanh toán</Link>
        </div>
      </main>
      <FooterClient />
    </div>
  );
};

export default CartPage;
