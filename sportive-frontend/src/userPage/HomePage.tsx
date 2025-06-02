import ProductCard from "../components/product/ProductCard";
import HeaderClient from "../components/header/HeaderClient";
import FooterClient from "../components/footer/FooterClient";

// Mock data for demonstration
const products = [
  {
    id: "1",
    name: "Áo thể thao",
    price: 299000,
    image: "https://via.placeholder.com/300x200?text=Áo+thể+thao",
  },
  {
    id: "2",
    name: "Quần thể thao",
    price: 249000,
    image: "https://via.placeholder.com/300x200?text=Quần+thể+thao",
  },
  {
    id: "3",
    name: "Giày thể thao",
    price: 599000,
    image: "https://via.placeholder.com/300x200?text=Giày+thể+thao",
  },
];

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderClient />
      <main className="flex-1 p-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">🏀 Sportive - Quần áo thể thao nam</h1>
        <p className="mb-6 text-gray-600">Thời trang thể thao dành cho bạn. Năng động – Thoải mái – Chất lượng.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      <FooterClient />
    </div>
  );
};

export default HomePage;
