import React from "react";
import { Form, Input, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Register = () => {
  const navigate = useNavigate();
  const blue = '#2563eb';

  const onFinish = async (values: any) => {
    try {
      await axios.post("http://localhost:3000/api/auth/register", values);
      message.success("Đăng ký thành công! Vui lòng đăng nhập.");
      navigate("/login");
    } catch (error: any) {
      message.error(
        error.response?.data?.error || "Đăng ký thất bại. Vui lòng thử lại!"
      );
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f0f6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: 400, width: '100%', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px rgba(37,99,235,0.08)', padding: 32 }}>
        <h2 style={{ textAlign: "center", color: blue, fontWeight: 700, fontSize: 32, marginBottom: 32, letterSpacing: 1 }}>ĐĂNG KÝ</h2>
        <Form layout="vertical" onFinish={onFinish} style={{ color: blue }}>
          <Form.Item
            label={<span style={{ color: blue, fontWeight: 600, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase' }}>Tên đăng nhập</span>}
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập tên đăng nhập!" }]}
            style={{ marginBottom: 20 }}
          >
            <Input 
              style={{ color: blue, borderRadius: 8, border: `1px solid ${blue}33`, padding: '10px 14px', fontSize: 15 }} 
              placeholder="Tên đăng nhập" 
              autoComplete="username"
            />
          </Form.Item>
          <Form.Item
            label={<span style={{ color: blue, fontWeight: 600, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase' }}>Email</span>}
            name="email"
            rules={[
              { required: true, message: "Vui lòng nhập email!" },
              { type: "email", message: "Email không hợp lệ!" },
            ]}
            style={{ marginBottom: 20 }}
          >
            <Input 
              style={{ color: blue, borderRadius: 8, border: `1px solid ${blue}33`, padding: '10px 14px', fontSize: 15 }} 
              placeholder="Email" 
              autoComplete="email"
            />
          </Form.Item>
          <Form.Item
            label={<span style={{ color: blue, fontWeight: 600, fontSize: 13, letterSpacing: 1, textTransform: 'uppercase' }}>Mật khẩu</span>}
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            style={{ marginBottom: 28 }}
          >
            <Input.Password 
              style={{ color: blue, borderRadius: 8, border: `1px solid ${blue}33`, padding: '10px 14px', fontSize: 15 }} 
              placeholder="Mật khẩu" 
              autoComplete="new-password"
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0 }}>
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              style={{ background: blue, borderColor: blue, color: '#fff', fontWeight: 600, fontSize: 16, borderRadius: 8, height: 48, letterSpacing: 1, boxShadow: `0 2px 8px ${blue}22` }}
            >
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
