import { useParams, Link } from "react-router-dom";
import HeaderClient from "../components/header/HeaderClient";
import FooterClient from "../components/footer/FooterClient";

// Mock data for demonstration
const products = [
  {
    id: "1",
    name: "Áo thể thao",
    price: 299000,
    image: "https://via.placeholder.com/300x200?text=Áo+thể+thao",
    description: "Áo thể thao nam, chất liệu co giãn, thoáng khí.",
  },
  {
    id: "2",
    name: "Quần thể thao",
    price: 249000,
    image: "https://via.placeholder.com/300x200?text=Quần+thể+thao",
    description: "Quần thể thao nam, chất liệu bền bỉ, thoải mái.",
  },
  {
    id: "3",
    name: "Giày thể thao",
    price: 599000,
    image: "https://via.placeholder.com/300x200?text=Giày+thể+thao",
    description: "Giày thể thao nam, êm ái, nâng bước tự tin.",
  },
];

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) return <div>Không tìm thấy sản phẩm.</div>;

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderClient />
      <main className="flex-1 p-8 max-w-3xl mx-auto">
        <Link to="/" className="text-blue-500 text-sm mb-4 inline-block">← Quay lại trang chủ</Link>
        <div className="flex flex-col md:flex-row gap-8">
          <img src={product.image} alt={product.name} className="w-full md:w-1/2 rounded shadow" />
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <div className="text-blue-600 font-bold text-xl mb-2">{product.price.toLocaleString()}₫</div>
            <p className="mb-4">{product.description}</p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Thêm vào giỏ hàng</button>
          </div>
        </div>
      </main>
      <FooterClient />
    </div>
  );
};

export default ProductDetailPage;
