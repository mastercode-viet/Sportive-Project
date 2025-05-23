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

import { authProvider } from "./authProvider";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";

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

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <Refine
              dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
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
                  name: "categories",
                  list: "/admin/categories",
                  create: "/admin/categories/create",
                  edit: "/admin/categories/edit/:id",
                  show: "/admin/categories/show/:id",
                  meta: { canDelete: true },
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
                    fallback={<CatchAllNavigate to="/login" />}>
                      <ThemedLayoutV2
                        Header={Header}
                        Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route index element={<NavigateToResource resource="blog_posts" />} />

                  <Route path="blog-posts">
                    <Route index element={<BlogPostList />} />
                    <Route path="create" element={<BlogPostCreate />} />
                    <Route path="edit/:id" element={<BlogPostEdit />} />
                    <Route path="show/:id" element={<BlogPostShow />} />
                  </Route>

                  <Route path="categories">
                    <Route index element={<CategoryList />} />
                    <Route path="create" element={<CategoryCreate />} />
                    <Route path="edit/:id" element={<CategoryEdit />} />
                    <Route path="show/:id" element={<CategoryShow />} />
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
    </BrowserRouter>
  );
}

export default App;
