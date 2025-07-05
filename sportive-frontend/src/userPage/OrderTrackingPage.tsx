"use client"

import type React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import HeaderClient from "../components/header/HeaderClient"
import FooterClient from "../components/footer/FooterClient"
import {
  Package,
  Clock,
  Truck,
  CheckCircle,
  XCircle,
  CreditCard,
  AlertCircle,
  RefreshCw,
  Calendar,
  DollarSign,
  ShoppingBag,
  Eye,
  X,
} from "lucide-react"

interface OrderItem {
  product: {
    _id: string
    name: string
    image?: string
  }
  quantity: number
  price: number
}

interface Order {
  _id: string
  items: OrderItem[]
  totalAmount: number
  status: string
  paymentStatus: string
  paymentMethod: string
  createdAt: string
}

const OrderTrackingPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cancelling, setCancelling] = useState<string | null>(null)
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userStr = localStorage.getItem("refine-auth")
        if (!userStr) {
          setError("Bạn cần đăng nhập để xem đơn hàng.")
          setLoading(false)
          return
        }

        const user = JSON.parse(userStr)
        if (!user || !user.id) {
          setError("Thông tin người dùng không hợp lệ.")
          setLoading(false)
          localStorage.removeItem("refine-auth")
          return
        }

        const res = await axios.get(`http://localhost:3000/api/orders/user/${user.id}`)
        setOrders(res.data)
      } catch (err) {
        setError("Không thể tải đơn hàng.")
        console.error("Error fetching orders:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [navigate])

  const handleCancelOrder = async (orderId: string) => {
    if (!window.confirm("Bạn chắc chắn muốn hủy đơn hàng này?")) return

    setCancelling(orderId)
    try {
      await axios.post(`http://localhost:3000/api/orders/${orderId}/cancel`)
      setOrders((prev) => prev.map((o) => (o._id === orderId ? { ...o, status: "cancelled" } : o)))
    } catch (err) {
      alert("Hủy đơn hàng thất bại!")
    } finally {
      setCancelling(null)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />
      case "processing":
        return <Package className="w-5 h-5 text-blue-500" />
      case "shipped":
        return <Truck className="w-5 h-5 text-cyan-500" />
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "shipped":
        return "bg-cyan-100 text-cyan-800 border-cyan-200"
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "paid":
        return "bg-green-100 text-green-800 border-green-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ xử lý"
      case "processing":
        return "Đang xử lý"
      case "shipped":
        return "Đang giao"
      case "delivered":
        return "Đã giao"
      case "cancelled":
        return "Đã hủy"
      default:
        return status.toUpperCase()
    }
  }

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Chờ thanh toán"
      case "paid":
        return "Đã thanh toán"
      case "failed":
        return "Thanh toán thất bại"
      default:
        return status.toUpperCase()
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        
        <div className="flex-1 flex justify-center items-center">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200"></div>
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
            </div>
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Đang tải đơn hàng...</h3>
              <p className="text-gray-600">Vui lòng chờ trong giây lát</p>
            </div>
          </div>
        </div>
        <FooterClient />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 via-white to-pink-50">

        <div className="flex-1 flex justify-center items-center">
          <div className="text-center max-w-md mx-auto p-8">
            <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold mb-4 text-red-600">Có lỗi xảy ra</h1>
            <p className="text-gray-600 mb-6 leading-relaxed">{error}</p>
            <button
              onClick={() => navigate("/login")}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>Đăng nhập</span>
            </button>
          </div>
        </div>
        <FooterClient />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-blue-50">
      

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Đơn hàng của tôi</h1>
              <p className="text-gray-600">Theo dõi và quản lý các đơn hàng của bạn</p>
            </div>

            <button
              className="inline-flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 shadow-sm"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="w-4 h-4" />
              <span>Làm mới</span>
            </button>
          </div>
        </div>

        {/* Orders List */}
        {orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Chưa có đơn hàng nào</h3>
            <p className="text-gray-600 mb-6">Bạn chưa thực hiện đơn hàng nào. Hãy bắt đầu mua sắm ngay!</p>
            <button
              onClick={() => navigate("/")}
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Bắt đầu mua sắm</span>
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                {/* Order Header */}
                <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                        <Package className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Đơn hàng #{order._id.slice(-8).toUpperCase()}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(order.createdAt).toLocaleString("vi-VN")}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-5 h-5 text-green-600" />
                        <span className="text-xl font-bold text-gray-900">${order.totalAmount.toFixed(2)}</span>
                      </div>

                      <button
                        onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                        className="p-2 hover:bg-white rounded-lg transition-colors duration-200"
                      >
                        <Eye className="w-5 h-5 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Order Status */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Trạng thái đơn hàng</span>
                        <div
                          className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}
                        >
                          {getStatusIcon(order.status)}
                          <span>{getStatusText(order.status)}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Trạng thái thanh toán</span>
                        <div
                          className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${getPaymentStatusColor(order.paymentStatus)}`}
                        >
                          <CreditCard className="w-4 h-4" />
                          <span>{getPaymentStatusText(order.paymentStatus)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Phương thức thanh toán</span>
                        <span className="text-sm font-semibold text-gray-900 capitalize">{order.paymentMethod}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Số lượng sản phẩm</span>
                        <span className="text-sm font-semibold text-gray-900">
                          {order.items.reduce((total, item) => total + item.quantity, 0)} sản phẩm
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Order Details */}
                  {expandedOrder === order._id && (
                    <div className="border-t border-gray-100 pt-6">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">Chi tiết sản phẩm</h4>
                      <div className="space-y-4">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                              {item.product?.image ? (
                                <img
                                  src={
                                    item.product.image.startsWith("http")
                                      ? item.product.image
                                      : `http://localhost:3000${item.product.image}`
                                  }
                                  alt={item.product?.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <Package className="w-8 h-8 text-gray-400" />
                              )}
                            </div>

                            <div className="flex-1">
                              <h5 className="font-semibold text-gray-900">{item.product?.name}</h5>
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span>Số lượng: {item.quantity}</span>
                                <span>Đơn giá: ${item.price.toFixed(2)}</span>
                                <span className="font-semibold text-gray-900">
                                  Tổng: ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {order.status === "pending" && (
                    <div className="flex justify-end pt-6 border-t border-gray-100">
                      <button
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => handleCancelOrder(order._id)}
                        disabled={cancelling === order._id}
                      >
                        {cancelling === order._id ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                            <span>Đang hủy...</span>
                          </>
                        ) : (
                          <>
                            <X className="w-4 h-4" />
                            <span>Hủy đơn hàng</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <FooterClient />
    </div>
  )
}

export default OrderTrackingPage
