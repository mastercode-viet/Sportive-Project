import { AuthPage } from "@refinedev/antd";
import { useLogin } from "@refinedev/core";
import { message } from "antd";

export const Login = () => {
  const { mutate: login } = useLogin();

  const handleLogin = async (values: any) => {
    try {
      const result = await login(values);
      // Giả sử backend trả về user với role
      if (result?.user?.role !== "admin") {
        message.error("Bạn không có quyền truy cập trang quản trị.");
        // Xoá token nếu không phải admin
        localStorage.removeItem("refine-auth");
        return;
      }
      // Nếu là admin, chuyển hướng như bình thường
    } catch (err) {
      message.error("Đăng nhập thất bại!");
    }
  };

  return (
    <AuthPage
      type="login"
      formProps={{
        initialValues: { email: "", password: "" },
        onFinish: handleLogin,
      }}
    />
  );
};
