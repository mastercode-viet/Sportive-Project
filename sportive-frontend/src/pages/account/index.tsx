"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Form, Input, Button, Modal, message, Avatar } from "antd"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import HeaderClient from "../../components/header/HeaderClient"
import FooterClient from "../../components/footer/FooterClient"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Lock,
  Edit3,
  Save,
  X,
  Trash2,
  LogOut,
  Shield,
  Camera,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"

const AccountPage: React.FC = () => {
  const [form] = Form.useForm()
  const [passwordForm] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("profile")
  const [editMode, setEditMode] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const userStr = localStorage.getItem("refine-auth")
    if (userStr) {
      const userData = JSON.parse(userStr)
      setUser(userData)
      form.setFieldsValue(userData)
    } else {
      navigate("/login")
    }
  }, [form, navigate])

  const handleUpdate = async (values: any) => {
    try {
      setLoading(true)
      const token = user?.token
      const res = await axios.put(`http://localhost:3000/api/auth/update`, values, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const updatedUser = res.data.user
      message.success("Cập nhật tài khoản thành công!")
      localStorage.setItem("refine-auth", JSON.stringify({ ...updatedUser, token }))
      setUser({ ...updatedUser, token })
      setEditMode(false)
    } catch (error: any) {
      message.error(error.response?.data?.error || "Cập nhật thất bại. Vui lòng thử lại!")
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async (values: any) => {
    try {
      setLoading(true)
      const token = user?.token
      await axios.put(`http://localhost:3000/api/auth/change-password`, values, {
        headers: { Authorization: `Bearer ${token}` },
      })
      message.success("Đổi mật khẩu thành công!")
      passwordForm.resetFields()
    } catch (error: any) {
      console.error("Change password error:", error, error?.response)
      let msg = "Đổi mật khẩu thất bại. Vui lòng thử lại!"
      if (error.response?.data?.error) msg = error.response.data.error
      else if (error.response?.data?.message) msg = error.response.data.message
      else if (error.message) msg = error.message
      message.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    Modal.confirm({
      title: "Xác nhận xóa tài khoản",
      content: "Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác.",
      okText: "Xóa tài khoản",
      okType: "danger",
      cancelText: "Hủy bỏ",
      centered: true,
      onOk: async () => {
        try {
          setLoading(true)
          const token = user?.token
          await axios.delete(`http://localhost:3000/api/auth/delete`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          message.success("Đã xóa tài khoản!")
          localStorage.removeItem("refine-auth")
          navigate("/register")
        } catch (error: any) {
          message.error(error.response?.data?.error || "Xóa thất bại. Vui lòng thử lại!")
        } finally {
          setLoading(false)
        }
      },
    })
  }

  const handleLogout = () => {
    localStorage.removeItem("refine-auth")
    localStorage.removeItem("cart")
    window.dispatchEvent(new CustomEvent("userLogout"))
    navigate("/login")
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
  

        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Bạn chưa đăng nhập</h2>
            <p className="text-gray-600 mb-6">Vui lòng đăng nhập để truy cập trang tài khoản</p>
            <Button
              type="primary"
              size="large"
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 border-0 hover:from-blue-700 hover:to-indigo-700"
            >
              Đăng nhập ngay
            </Button>
          </div>
        </div>
        <FooterClient />
      </div>
    )
  }

  const menuItems = [
    {
      key: "profile",
      label: "Thông tin cá nhân",
      icon: <User className="w-5 h-5" />,
    },
    {
      key: "password",
      label: "Đổi mật khẩu",
      icon: <Lock className="w-5 h-5" />,
    },
    {
      key: "security",
      label: "Bảo mật",
      icon: <Shield className="w-5 h-5" />,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-blue-50">
    
    

      <main className="flex-1 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tài khoản của tôi</h1>
            <p className="text-gray-600">Quản lý thông tin cá nhân và cài đặt bảo mật</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Profile Header */}
                <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <div className="text-center">
                    <div className="relative inline-block">
                      <Avatar
                        size={80}
                        className="bg-white text-blue-600 border-4 border-white shadow-lg"
                        icon={<User />}
                      />
                      <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                        <Camera className="w-4 h-4 text-blue-600" />
                      </button>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">{user.username || user.email}</h3>
                    <p className="text-blue-100 text-sm">{user.email}</p>
                  </div>
                </div>

                {/* Menu */}
                <div className="p-2">
                  {menuItems.map((item) => (
                    <button
                      key={item.key}
                      onClick={() => setActiveTab(item.key)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                        activeTab === item.key
                          ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
                          : "text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                      }`}
                    >
                      {item.icon}
                      <span className="font-medium">{item.label}</span>
                    </button>
                  ))}

                  <div className="border-t border-gray-100 mt-4 pt-4">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-all duration-200"
                    >
                      <LogOut className="w-5 h-5" />
                      <span className="font-medium">Đăng xuất</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                {/* Profile Tab */}
                {activeTab === "profile" && (
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold text-gray-900">Thông tin cá nhân</h2>
                      {!editMode && (
                        <button
                          onClick={() => setEditMode(true)}
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                          <span>Chỉnh sửa</span>
                        </button>
                      )}
                    </div>

                    {!editMode ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-6">
                          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Tên đăng nhập</p>
                              <p className="font-semibold text-gray-900">{user.username}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                              <Mail className="w-5 h-5 text-green-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Email</p>
                              <p className="font-semibold text-gray-900">{user.email}</p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                              <User className="w-5 h-5 text-purple-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Họ và tên</p>
                              <p className="font-semibold text-gray-900">
                                {user.fullName || <span className="text-gray-400 italic">Chưa cập nhật</span>}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                              <Phone className="w-5 h-5 text-yellow-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Số điện thoại</p>
                              <p className="font-semibold text-gray-900">
                                {user.phone || <span className="text-gray-400 italic">Chưa cập nhật</span>}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                              <MapPin className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-600">Địa chỉ</p>
                              <p className="font-semibold text-gray-900">
                                {user.address || <span className="text-gray-400 italic">Chưa cập nhật</span>}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Form
                        form={form}
                        layout="vertical"
                        onFinish={handleUpdate}
                        initialValues={user}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <Form.Item
                            label={
                              <span className="text-gray-700 font-medium flex items-center">
                                <User className="w-4 h-4 mr-2" />
                                Tên đăng nhập
                              </span>
                            }
                            name="username"
                          >
                            <Input
                              disabled
                              className="h-12 bg-gray-50 border-gray-200 rounded-lg"
                              prefix={<User className="w-4 h-4 text-gray-400" />}
                            />
                          </Form.Item>

                          <Form.Item
                            label={
                              <span className="text-gray-700 font-medium flex items-center">
                                <Mail className="w-4 h-4 mr-2" />
                                Email
                              </span>
                            }
                            name="email"
                          >
                            <Input
                              disabled
                              className="h-12 bg-gray-50 border-gray-200 rounded-lg"
                              prefix={<Mail className="w-4 h-4 text-gray-400" />}
                            />
                          </Form.Item>

                          <Form.Item
                            label={
                              <span className="text-gray-700 font-medium flex items-center">
                                <User className="w-4 h-4 mr-2" />
                                Họ và tên
                              </span>
                            }
                            name="fullName"
                          >
                            <Input
                              className="h-12 border-gray-200 rounded-lg focus:border-blue-500"
                              prefix={<User className="w-4 h-4 text-gray-400" />}
                              placeholder="Nhập họ và tên"
                            />
                          </Form.Item>

                          <Form.Item
                            label={
                              <span className="text-gray-700 font-medium flex items-center">
                                <Phone className="w-4 h-4 mr-2" />
                                Số điện thoại
                              </span>
                            }
                            name="phone"
                          >
                            <Input
                              className="h-12 border-gray-200 rounded-lg focus:border-blue-500"
                              prefix={<Phone className="w-4 h-4 text-gray-400" />}
                              placeholder="Nhập số điện thoại"
                            />
                          </Form.Item>

                          <Form.Item
                            label={
                              <span className="text-gray-700 font-medium flex items-center">
                                <MapPin className="w-4 h-4 mr-2" />
                                Địa chỉ
                              </span>
                            }
                            name="address"
                            className="md:col-span-2"
                          >
                            <Input
                              className="h-12 border-gray-200 rounded-lg focus:border-blue-500"
                              prefix={<MapPin className="w-4 h-4 text-gray-400" />}
                              placeholder="Nhập địa chỉ"
                            />
                          </Form.Item>
                        </div>

                        <div className="flex space-x-4 pt-6 border-t border-gray-100">
                          <Button
                            type="primary"
                            htmlType="submit"
                            loading={loading}
                            className="h-12 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 border-0 hover:from-blue-700 hover:to-indigo-700 rounded-lg font-medium"
                            icon={<Save className="w-4 h-4" />}
                          >
                            Lưu thay đổi
                          </Button>
                          <Button
                            onClick={() => setEditMode(false)}
                            className="h-12 px-8 border-gray-200 rounded-lg font-medium"
                            icon={<X className="w-4 h-4" />}
                          >
                            Hủy bỏ
                          </Button>
                        </div>
                      </Form>
                    )}
                  </div>
                )}

                {/* Password Tab */}
                {activeTab === "password" && (
                  <div className="p-8">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Đổi mật khẩu</h2>
                      <p className="text-gray-600">Cập nhật mật khẩu để bảo mật tài khoản của bạn</p>
                    </div>

                    <div className="max-w-md">
                      <Form form={passwordForm} layout="vertical" onFinish={handleChangePassword} className="space-y-6">
                        <Form.Item
                          label={
                            <span className="text-gray-700 font-medium flex items-center">
                              <Lock className="w-4 h-4 mr-2" />
                              Mật khẩu hiện tại
                            </span>
                          }
                          name="oldPassword"
                          rules={[{ required: true, message: "Vui lòng nhập mật khẩu hiện tại!" }]}
                        >
                          <Input.Password
                            className="h-12 border-gray-200 rounded-lg focus:border-blue-500"
                            prefix={<Lock className="w-4 h-4 text-gray-400" />}
                            placeholder="Nhập mật khẩu hiện tại"
                          />
                        </Form.Item>

                        <Form.Item
                          label={
                            <span className="text-gray-700 font-medium flex items-center">
                              <Lock className="w-4 h-4 mr-2" />
                              Mật khẩu mới
                            </span>
                          }
                          name="newPassword"
                          rules={[
                            { required: true, message: "Vui lòng nhập mật khẩu mới!" },
                            { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
                          ]}
                        >
                          <Input.Password
                            className="h-12 border-gray-200 rounded-lg focus:border-blue-500"
                            prefix={<Lock className="w-4 h-4 text-gray-400" />}
                            placeholder="Nhập mật khẩu mới"
                          />
                        </Form.Item>

                        <Button
                          type="primary"
                          htmlType="submit"
                          loading={loading}
                          className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 border-0 hover:from-blue-700 hover:to-indigo-700 rounded-lg font-medium"
                          icon={<CheckCircle className="w-4 h-4" />}
                        >
                          Cập nhật mật khẩu
                        </Button>
                      </Form>
                    </div>
                  </div>
                )}

                {/* Security Tab */}
                {activeTab === "security" && (
                  <div className="p-8">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Bảo mật tài khoản</h2>
                      <p className="text-gray-600">Quản lý các cài đặt bảo mật và quyền riêng tư</p>
                    </div>

                    <div className="space-y-6">
                      {/* Account Status */}
                      <div className="p-6 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-green-900">Tài khoản đã được xác thực</h3>
                            <p className="text-green-700 text-sm">
                              Email của bạn đã được xác thực và tài khoản đang hoạt động
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Delete Account */}
                      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <AlertTriangle className="w-5 h-5 text-red-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-red-900 mb-2">Xóa tài khoản</h3>
                            <p className="text-red-700 text-sm mb-4">
                              Khi bạn xóa tài khoản, tất cả dữ liệu cá nhân và lịch sử mua hàng sẽ bị xóa vĩnh viễn.
                              Hành động này không thể hoàn tác.
                            </p>
                            <Button
                              danger
                              onClick={handleDelete}
                              loading={loading}
                              className="h-10 px-6 rounded-lg font-medium"
                              icon={<Trash2 className="w-4 h-4" />}
                            >
                              Xóa tài khoản
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <FooterClient />
    </div>
  )
}

export default AccountPage
