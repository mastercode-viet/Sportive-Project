"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/CartContext"
import HeaderClient from "../components/header/HeaderClient"
import FooterClient from "../components/footer/FooterClient"
import axios from "axios"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building,
  FileText,
  CreditCard,
  Shield,
  Truck,
  CheckCircle,
  AlertCircle,
  Lock,
  Package,
  ArrowRight,
  ShoppingCart,
} from "lucide-react"

interface ShippingForm {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  note: string
}

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate()
  const { items, getTotalPrice, clearCart, isUserAuthenticated } = useCart()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<ShippingForm>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    note: "",
  })

  // Check authentication on component mount
  useEffect(() => {
    if (items.length === 0) {
      navigate("/cart")
      return
    }
  }, [items.length, navigate])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Double check authentication before submitting
    if (!isUserAuthenticated()) {
      setError("Bạn cần đăng nhập để đặt hàng.")
      navigate("/login")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const userStr = localStorage.getItem("refine-auth")
      const user = userStr ? JSON.parse(userStr) : null

      if (!user || !user.id) {
        setError("Thông tin người dùng không hợp lệ.")
        localStorage.removeItem("refine-auth")
        navigate("/login")
        return
      }

      const orderData = {
        user: user.id,
        items: items.map((item) => ({
          product: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        totalAmount: getTotalPrice(),
        paymentMethod: "COD",
        note: formData.note,
        shippingInfo: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
        },
      }

      const response = await axios.post("http://localhost:3000/api/orders", orderData)
      if (response.status === 201) {
        clearCart()
        navigate("/order-success")
      }
    } catch (error) {
      console.error("Error placing order:", error)
      setError("Không thể đặt hàng. Vui lòng thử lại.")
    } finally {
      setLoading(false)
    }
  }

  // Show login prompt if not authenticated
  if (!isUserAuthenticated()) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <HeaderClient />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
              <Lock className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Vui lòng đăng nhập</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Bạn cần đăng nhập để có thể thực hiện thanh toán và đặt hàng
            </p>
            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Lock className="w-5 h-5" />
              <span>Đăng nhập ngay</span>
            </button>
          </div>
        </main>
        <FooterClient />
      </div>
    )
  }

  // Don't render if no items
  if (items.length === 0) {
    return null
  }

  const steps = [
    { id: 1, name: "Thông tin giao hàng", icon: User },
    { id: 2, name: "Xác nhận đơn hàng", icon: CheckCircle },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <HeaderClient />

      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Thanh toán</h1>
            <p className="text-gray-600">Hoàn tất đơn hàng của bạn một cách an toàn và nhanh chóng</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      currentStep >= step.id
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-gray-300 text-gray-400"
                    }`}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`ml-3 text-sm font-medium ${currentStep >= step.id ? "text-blue-600" : "text-gray-400"}`}
                  >
                    {step.name}
                  </span>
                  {index < steps.length - 1 && <ArrowRight className="w-5 h-5 text-gray-300 ml-8" />}
                </div>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 max-w-4xl mx-auto">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Shipping Information Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <User className="w-6 h-6 text-blue-600 mr-3" />
                    Thông tin giao hàng
                  </h2>
                  <p className="text-gray-600 mt-1">Vui lòng điền đầy đủ thông tin để chúng tôi có thể giao hàng</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Họ và tên *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                        placeholder="Nhập họ và tên của bạn"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        <Mail className="w-4 h-4 inline mr-2" />
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                        placeholder="example@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        <Phone className="w-4 h-4 inline mr-2" />
                        Số điện thoại *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                        placeholder="0123 456 789"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-700 text-sm font-semibold mb-2">
                        <Building className="w-4 h-4 inline mr-2" />
                        Thành phố *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                        placeholder="Hồ Chí Minh, Hà Nội..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      <MapPin className="w-4 h-4 inline mr-2" />
                      Địa chỉ giao hàng *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Số nhà, tên đường, phường/xã, quận/huyện"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">
                      <FileText className="w-4 h-4 inline mr-2" />
                      Ghi chú (tùy chọn)
                    </label>
                    <textarea
                      name="note"
                      value={formData.note}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                      placeholder="Ghi chú thêm cho đơn hàng (thời gian giao hàng, địa chỉ cụ thể...)"
                    />
                  </div>

                  {/* Payment Method */}
                  <div className="border-t border-gray-100 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <CreditCard className="w-5 h-5 text-blue-600 mr-2" />
                      Phương thức thanh toán
                    </h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                          <Truck className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">Thanh toán khi nhận hàng (COD)</p>
                          <p className="text-sm text-gray-600">Bạn sẽ thanh toán khi nhận được sản phẩm</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        <span>Đang xử lý...</span>
                      </>
                    ) : (
                      <>
                        <Package className="w-5 h-5" />
                        <span>Đặt hàng ngay</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden sticky top-8">
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-green-50 to-blue-50">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <ShoppingCart className="w-6 h-6 text-green-600 mr-3" />
                    Tóm tắt đơn hàng
                  </h2>
                </div>

                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                          {item.image ? (
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <Package className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                          <p className="text-gray-600 text-sm">Số lượng: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 pt-4 space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Tạm tính</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Phí vận chuyển</span>
                      <span className="text-green-600 font-semibold">Miễn phí</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-100">
                      <span>Tổng cộng</span>
                      <span className="text-blue-600">${getTotalPrice().toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Security Badge */}
                  <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Shield className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-semibold text-green-800">Thanh toán an toàn</span>
                    </div>
                    <p className="text-xs text-green-700 mt-1">Thông tin của bạn được bảo mật với mã hóa SSL 256-bit</p>
                  </div>

                  {/* Shipping Info */}
                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <Truck className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-semibold text-blue-800">Giao hàng nhanh</span>
                    </div>
                    <p className="text-xs text-blue-700 mt-1">Giao hàng trong 2-3 ngày làm việc</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FooterClient />
    </div>
  )
}

export default CheckoutPage
