import { Link } from "react-router-dom";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
};

const ProductCard = ({ product }: { product: Product }) => (
  <div className="border rounded-lg p-4 shadow hover:shadow-lg transition flex flex-col">
    <img src={product.image} alt={product.name} className="rounded w-full mb-2 aspect-video object-cover" />
    <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
    <div className="text-blue-600 font-bold mb-2">{product.price.toLocaleString()}₫</div>
    <Link to={`/product/${product.id}`} className="text-blue-500 text-sm mt-auto">Xem chi tiết →</Link>
  </div>
);

export default ProductCard;
