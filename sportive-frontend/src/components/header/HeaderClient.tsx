"use client"

import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { ShoppingCart, Menu, X, Search, User, Bell, Heart } from "lucide-react"
import { Dropdown, Menu as AntdMenu, Badge } from "antd"
import { useCart } from "../../context/CartContext"

export default function HeaderClient() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const { clearCart, items } = useCart()
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorage = () => {
      const userStr = localStorage.getItem("refine-auth")
      setUser(userStr ? JSON.parse(userStr) : null)
    }

    handleStorage()
    window.addEventListener("storage", handleStorage)
    return () => window.removeEventListener("storage", handleStorage)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = () => {
    // Clear all user data
    localStorage.removeItem("refine-auth")
    localStorage.removeItem("cart")
    clearCart()
    setUser(null)

    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent("userLogout"))

    // Redirect to login page
    window.location.href = "/login"
  }

  const navigation = [
    { name: "Trang chủ", href: "/", icon: "🏠" },
    { name: "Cửa hàng", href: "/shop", icon: "🛍️" },
    { name: "Về chúng tôi", href: "/about", icon: "ℹ️" },
    ...(user
      ? [
          { name: "Đơn hàng", href: "/my-orders", icon: "📦" },
          { name: "Thanh toán", href: "/checkout", icon: "💳" },
        ]
      : []),
  ]

  const cartItemsCount = items?.reduce((total: number, item: any) => total + item.quantity, 0) || 0

  const userMenu = (
    <AntdMenu className="w-56 shadow-lg border-0 rounded-xl overflow-hidden">
      <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-semibold text-gray-900">{user?.name || "Người dùng"}</p>
            <p className="text-sm text-gray-500">{user?.email || "user@example.com"}</p>
          </div>
        </div>
      </div>

      <AntdMenu.Item key="profile" className="py-3">
        <Link to="/account" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600">
          <User className="w-4 h-4" />
          <span>Thông tin cá nhân</span>
        </Link>
      </AntdMenu.Item>

      <AntdMenu.Item key="orders" className="py-3">
        <Link to="/my-orders" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600">
          <ShoppingCart className="w-4 h-4" />
          <span>Đơn hàng của tôi</span>
        </Link>
      </AntdMenu.Item>

      <AntdMenu.Item key="wishlist" className="py-3">
        <Link to="/wishlist" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600">
          <Heart className="w-4 h-4" />
          <span>Danh sách yêu thích</span>
        </Link>
      </AntdMenu.Item>

      <AntdMenu.Divider />

      <AntdMenu.Item
        key="logout"
        onClick={handleLogout}
        className="py-3 text-red-600 hover:text-red-700 hover:bg-red-50"
      >
        <div className="flex items-center space-x-3">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span>Đăng xuất</span>
        </div>
      </AntdMenu.Item>
    </AntdMenu>
  )

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200"
          : "bg-white shadow-sm border-b border-gray-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-bold text-lg">🏀</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Sportive
              </span>
              <div className="text-xs text-gray-500 -mt-1">Thể thao nam</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="group relative px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 hover:bg-blue-50"
              >
                <span className="flex items-center space-x-2">
                  <span className="text-sm">{item.icon}</span>
                  <span>{item.name}</span>
                </span>
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 group-hover:w-full group-hover:left-0 transition-all duration-300"></div>
              </Link>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-300 text-sm"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && searchValue.trim()) {
                    navigate(`/shop?search=${encodeURIComponent(searchValue.trim())}`)
                  }
                }}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <kbd className="px-2 py-1 text-xs text-gray-500 bg-gray-200 rounded">⌘K</kbd>
              </div>
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-2">
            {/* Notifications */}
            {user && (
              <button className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 group"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {cartItemsCount > 0 && (
                <Badge
                  count={cartItemsCount}
                  className="absolute -top-1 -right-1"
                  style={{ backgroundColor: "#3B82F6" }}
                />
              )}
            </Link>

            {/* Authentication */}
            {!user ? (
              <div className="hidden md:flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all duration-300"
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Đăng ký
                </Link>
              </div>
            ) : (
              <Dropdown overlay={userMenu} placement="bottomRight" trigger={["click"]} arrow>
                <button className="flex items-center space-x-2 p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden lg:block font-medium">{user?.name || "User"}</span>
                  <svg className="w-4 h-4 hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </Dropdown>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100 py-4 border-t border-gray-100" : "max-h-0 opacity-0 overflow-hidden"
          }`}
        >
          {/* Mobile Search */}
          <div className="mb-4 md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-300"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}

            {/* Mobile Authentication */}
            {!user ? (
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <Link
                  to="/login"
                  className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Đăng nhập
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Đăng ký
                </Link>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-100 space-y-2">
                <div className="flex items-center space-x-3 px-4 py-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{user?.name || "Người dùng"}</p>
                    <p className="text-sm text-gray-500">{user?.email || "user@example.com"}</p>
                  </div>
                </div>

                <Link
                  to="/account"
                  className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-4 h-4" />
                  <span>Thông tin cá nhân</span>
                </Link>

                <button
                  onClick={() => {
                    handleLogout()
                    setIsMenuOpen(false)
                  }}
                  className="flex items-center space-x-3 w-full px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-300"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Đăng xuất</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
