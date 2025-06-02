import {
  Refine,
  Authenticated,
} from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {
  ThemedLayoutV2,
  ThemedSiderV2,
  ErrorComponent,
  useNotificationProvider,
} from "@refinedev/antd";
import routerBindings, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import { App as AntdApp } from "antd";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import { authProvider } from "./authProvider";
import {  Header } from "./components/header/index";
import { ColorModeContextProvider } from "./contexts/color-mode";
import ProductDetailPage from "./userPage/ProductDetailPage";
import CartPage from "./userPage/CartPage";
import CheckoutPage from "./userPage/CheckoutPage";
import About from "./userPage/About";
import Shop from "./userPage/Shop";

// 🧱 Layouts
import LayoutClient from "./layouts/layoutClient";

// 👥 Pages
import HomePage from "./userPage/HomePage";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { ForgotPassword } from "./pages/forgotPassword";

// 🛠️ Admin Pages
import {
  BlogPostList,
  BlogPostCreate,
  BlogPostEdit,
  BlogPostShow,
} from "./pages/blog-posts";
import {
  CategoryList,
  CategoryCreate,
  CategoryEdit,
  CategoryShow,
} from "./pages/categories";
import { ProductCreate, ProductEdit, ProductList, ProductShow } from "./pages/products";
import { OrderList } from "./pages/orders/list";
import { OrderShow } from "./pages/orders/show";

import axios from "axios";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <RefineKbarProvider>
          <ColorModeContextProvider>
            <AntdApp>
              <Refine
                dataProvider={{
                  ...dataProvider("http://localhost:3000/api"),
                  getOne: async ({ resource, id }) => {
                    const url = `http://localhost:3000/api/${resource.toLowerCase()}/${id}`;
                    const response = await axios.get(url);
                    return {
                      data: response.data,
                    };
                  },
                  getList: async ({ resource, pagination, sorters }) => {
                    const url = `http://localhost:3000/api/${resource.toLowerCase()}`;
                    const response = await axios.get(url);
                    return {
                      data: response.data,
                      total: response.data.length,
                    };
                  },
                  create: async ({ resource, variables }) => {
                    const url = `http://localhost:3000/api/${resource.toLowerCase()}`;
                    const response = await axios.post(url, variables);
                    return {
                      data: response.data,
                    };
                  },
                  update: async ({ resource, id, variables }) => {
                    const url = `http://localhost:3000/api/${resource.toLowerCase()}/${id}`;
                    const response = await axios.put(url, variables);
                    return {
                      data: response.data,
                    };
                  },
                  deleteOne: async ({ resource, id }) => {
                    const url = `http://localhost:3000/api/${resource.toLowerCase()}/${id}`;
                    const response = await axios.delete(url);
                    return {
                      data: response.data,
                    };
                  },
                }}
                routerProvider={routerBindings}
                authProvider={authProvider}
                notificationProvider={useNotificationProvider}
                resources={[
                  {
                    name: "blog_posts",
                    list: "/admin/blog-posts",
                    create: "/admin/blog-posts/create",
                    edit: "/admin/blog-posts/edit/:id",
                    show: "/admin/blog-posts/show/:id",
                    meta: { canDelete: true },
                  },
                  {
                    name: "products",
                    list: "/admin/products",
                    create: "/admin/products/create",
                    edit: "/admin/products/edit/:id",
                    show: "/admin/products/show/:id",
                    meta: { canDelete: true },
                  },
                  {
                    name: "categories",
                    list: "/admin/categories",
                    create: "/admin/categories/create",
                    edit: "/admin/categories/edit/:id",
                    show: "/admin/categories/show/:id",
                    meta: { canDelete: true },
                  },
                  {
                    name: "orders",
                    list: "/admin/orders",
                    show: "/admin/orders/show/:id",
                    meta: { 
                      canDelete: false,
                      label: "Orders"
                    },
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                }}
              >
                <Routes>
                  {/* 👥 CLIENT ROUTES */}
                  <Route element={<LayoutClient />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/shop" element={<Shop />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                  </Route>

                  {/* 🛠️ ADMIN ROUTES */}
                  <Route
                    path="/admin"
                    element={
                      <Authenticated
                        key="authenticated-admin"
                        v3LegacyAuthProviderCompatible={true}
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2
                          Header={Header}
                          Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="blog_posts" />}
                    />

                    <Route path="blog-posts">
                      <Route index element={<BlogPostList />} />
                      <Route path="create" element={<BlogPostCreate />} />
                      <Route path="edit/:id" element={<BlogPostEdit />} />
                      <Route path="show/:id" element={<BlogPostShow />} />
                    </Route>

                    <Route path="products">
                      <Route index element={<ProductList />} />
                      <Route path="create" element={<ProductCreate />} />
                      <Route path="edit/:id" element={<ProductEdit />} />
                      <Route path="show/:id" element={<ProductShow />} />
                    </Route>

                    <Route path="categories">
                      <Route index element={<CategoryList />} />
                      <Route path="create" element={<CategoryCreate />} />
                      <Route path="edit/:id" element={<CategoryEdit />} />
                      <Route path="show/:id" element={<CategoryShow />} />
                    </Route>

                    <Route path="orders">
                      <Route index element={<OrderList />} />
                      <Route path="show/:id" element={<OrderShow />} />
                    </Route>
                  </Route>

                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="*" element={<ErrorComponent />} />
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
            </AntdApp>
          </ColorModeContextProvider>
        </RefineKbarProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;