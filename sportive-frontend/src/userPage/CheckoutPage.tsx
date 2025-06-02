import HeaderClient from "../components/header/HeaderClient";
import FooterClient from "../components/footer/FooterClient";
import { useState } from "react";

// Mock cart data
const cartItems = [
  {
    id: "1",
    name: "Áo thể thao",
    price: 299000,
    quantity: 2,
  },
  {
    id: "2",
    name: "Quần thể thao",
    price: 249000,
    quantity: 1,
  },
];

const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

const CheckoutPage = () => {
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderClient />
      <main className="flex-1 p-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Thanh toán</h1>
        {success ? (
          <div className="bg-green-100 text-green-700 p-4 rounded">Đặt hàng thành công! Cảm ơn bạn đã mua hàng.</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Họ tên</label>
              <input required className="border rounded px-3 py-2 w-full" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Địa chỉ</label>
              <input required className="border rounded px-3 py-2 w-full" />
            </div>
            <div>
              <label className="block mb-1 font-medium">Số điện thoại</label>
              <input required className="border rounded px-3 py-2 w-full" />
            </div>
            <div className="font-bold">Tổng cộng: {total.toLocaleString()}₫</div>
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Đặt hàng</button>
          </form>
        )}
      </main>
      <FooterClient />
    </div>
  );
};

export default CheckoutPage;
