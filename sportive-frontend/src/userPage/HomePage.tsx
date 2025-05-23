import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">🏀 Sportive - Quần áo thể thao nam</h1>
      <p className="mb-6 text-gray-600">Thời trang thể thao dành cho bạn. Năng động – Thoải mái – Chất lượng.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
          <img
            src="https://via.placeholder.com/300x200"
            alt="Áo thể thao"
            className="rounded w-full mb-2"
          />
          <h2 className="text-xl font-semibold mb-1">Áo thể thao</h2>
          <p className="text-sm text-gray-500">Thoáng khí, co giãn, phù hợp mọi hoạt động.</p>
          <Link to="/product/1" className="text-blue-500 text-sm mt-2 inline-block">Xem chi tiết →</Link>
        </div>

        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
          <img
            src="https://via.placeholder.com/300x200"
            alt="Quần thể thao"
            className="rounded w-full mb-2"
          />
          <h2 className="text-xl font-semibold mb-1">Quần thể thao</h2>
          <p className="text-sm text-gray-500">Chất liệu bền bỉ, thoải mái cả ngày dài.</p>
          <Link to="/product/2" className="text-blue-500 text-sm mt-2 inline-block">Xem chi tiết →</Link>
        </div>

        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
          <img
            src="https://via.placeholder.com/300x200"
            alt="Giày thể thao"
            className="rounded w-full mb-2"
          />
          <h2 className="text-xl font-semibold mb-1">Giày thể thao</h2>
          <p className="text-sm text-gray-500">Êm ái, nâng bước tự tin trên từng bước chân.</p>
          <Link to="/product/3" className="text-blue-500 text-sm mt-2 inline-block">Xem chi tiết →</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
