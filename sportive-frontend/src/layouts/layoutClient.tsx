import { Outlet } from "react-router-dom";
import HeaderClient from "../components/header/HeaderClient";
// import FooterClient from "../components/footer/FooterClient";
import Footer from "../components/Footer";

function LayoutClient() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderClient />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default LayoutClient;
