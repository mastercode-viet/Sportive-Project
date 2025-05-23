import { Outlet } from "react-router-dom";

function LayoutClient() {
  return (
    <div>
      <header style={{ padding: "1rem", background: "#eee" }}>
        <h2>Sportive Shop</h2>
      </header>
      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default LayoutClient;
