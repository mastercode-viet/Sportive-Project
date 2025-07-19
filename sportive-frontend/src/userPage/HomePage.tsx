"use client"

import type React from "react"
import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import axios from "axios"
import FooterClient from "../components/footer/FooterClient"
import Hero from "../components/Hero"

interface Product {
  _id: string
  name: string
  price: number
  description: string
  image: string
}

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products")
        setProducts(response.data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching products:", error)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200"></div>
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-600 border-t-transparent absolute top-0 left-0"></div>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Đang tải sản phẩm...</h3>
            <p className="text-gray-600">Vui lòng chờ trong giây lát</p>
          </div>
        </div>
      </div>
    )
  }

  const featuredCategories = [
    {
      name: "Áo thun thể thao",
      description: "Thoáng mát, co giãn tốt",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "Áo gió thể thao",
      description: "Chống gió, nhẹ nhàng",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop",
      color: "from-green-500 to-green-600",
    },
    {
      name: "Quần thể thao",
      description: "Thoải mái, linh hoạt",
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=300&fit=crop",
      color: "from-purple-500 to-purple-600",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* <HeaderClient /> */}

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full translate-y-32 -translate-x-32"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 text-sm font-medium border border-white/20">
              <span className="text-2xl">🏀</span>
              <span>Thương hiệu thể thao hàng đầu Việt Nam</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="block bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Sportive
                </span>
                <span className="block text-yellow-400 text-3xl md:text-4xl lg:text-5xl mt-2">
                  Quần áo thể thao nam
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                Thời trang thể thao dành cho bạn
                <span className="block mt-2 font-semibold text-yellow-300">Năng động – Thoải mái – Chất lượng</span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <button className="group bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <span className="flex items-center space-x-2">
                  <span>Khám phá ngay</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              <button className="border-2 border-white text-white hover:bg-white hover:text-blue-700 font-bold py-4 px-8 rounded-full transition-all duration-300 backdrop-blur-sm">
                Xem bộ sưu tập
              </button>
            </div>
          </div>
        </div>
      </section>

      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
          {/* Hero Component */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <Hero />
          </div>

          {/* Featured Categories */}
          <section className="space-y-12">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
                <span>Danh mục nổi bật</span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Sản phẩm được yêu thích nhất</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Khám phá các sản phẩm thể thao chất lượng cao với thiết kế hiện đại và công nghệ tiên tiến
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredCategories.map((category, index) => (
                <div
                  key={category.name}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                >
                  <div className="aspect-[4/3] relative">
                    <img
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity`}
                    ></div>
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <p className="text-blue-100 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        {category.description}
                      </p>
                      <button className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 delay-200">
                        <span>Xem thêm</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Products Grid */}
          <section className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Sản phẩm mới nhất</h2>
                <p className="text-gray-600">Cập nhật những xu hướng thời trang thể thao mới nhất</p>
              </div>

              <div className="flex items-center space-x-4">
                <select className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option>Sắp xếp theo</option>
                  <option>Giá: Thấp đến cao</option>
                  <option>Giá: Cao đến thấp</option>
                  <option>Mới nhất</option>
                  <option>Phổ biến nhất</option>
                </select>

                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button className="p-2 rounded-md bg-white shadow-sm">
                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                      />
                    </svg>
                  </button>
                  <button className="p-2 rounded-md">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map((product) => (
                  <div key={product._id} className="group">
                    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden border border-gray-100">
                      <ProductCard
                        id={product._id}
                        name={product.name}
                        price={product.price}
                        image={product.image}
                        description={product.description}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Chưa có sản phẩm</h3>
                <p className="text-gray-600">Các sản phẩm mới sẽ được cập nhật sớm nhất</p>
              </div>
            )}
          </section>

          {/* Newsletter Section */}
          <section className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
            </div>

            <div className="relative text-center space-y-6">
              <h3 className="text-2xl md:text-3xl font-bold">Đăng ký nhận thông tin mới nhất</h3>
              <p className="text-blue-100 max-w-2xl mx-auto">
                Nhận thông báo về các sản phẩm mới, khuyến mãi đặc biệt và xu hướng thời trang thể thao
              </p>

              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Nhập email của bạn"
                  className="flex-1 px-4 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />
                <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-3 rounded-full transition-colors duration-300">
                  Đăng ký
                </button>
              </div>
            </div>
          </section>
        </div>
      </main>

      <FooterClient />
    </div>
  )
}

export default HomePage
