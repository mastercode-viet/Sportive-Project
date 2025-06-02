import { Outlet } from "react-router-dom";
import HeaderClient from "../components/header/HeaderClient";
import FooterClient from "../components/footer/FooterClient";

function LayoutClient() {
  return (
    <div className="min-h-screen flex flex-col">
      <HeaderClient />
      <main className="flex-1">
        <Outlet />
      </main>
      <FooterClient />
    </div>
  );
}

export default LayoutClient;
