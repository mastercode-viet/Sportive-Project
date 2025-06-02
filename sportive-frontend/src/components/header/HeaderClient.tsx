import { Link } from "react-router-dom";

const HeaderClient = () => (
  <header className="flex items-center justify-between px-6 py-4 bg-white shadow">
    <Link to="/" className="text-xl font-bold text-blue-600">Sportive</Link>
    <nav className="flex gap-4">
      <Link to="/cart" className="hover:underline">Cart</Link>
      <Link to="/checkout" className="hover:underline">Checkout</Link>
    </nav>
  </header>
);

export default HeaderClient;
