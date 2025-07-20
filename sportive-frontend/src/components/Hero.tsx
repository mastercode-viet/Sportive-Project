import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Bộ sưu tập giày thể thao chất
                <span className="block text-blue-400">thời trang 2025</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-lg">
                Khám phá những đôi giày chất lượng cao từ các thương hiệu nổi tiếng thế giới với mức giá tốt nhất
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105">
                Mua sắm ngay
                <ArrowRight className="h-5 w-5" />
              </button>
              <Link to ="/shop"> <button className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                Xem bộ sưu tập
              </button></Link>
             
            </div>

            <div className="flex items-center gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-gray-300">Sản phẩm</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">50+</div>
                <div className="text-gray-300">Thương hiệu</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-gray-300">Khách hàng</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=600&fit=crop"
                alt="Featured Shoes"
                className="w-full h-auto rounded-2xl shadow-2xl transform rotate-12 hover:rotate-6 transition-transform duration-500"
              />
            </div>
            <div className="absolute top-8 left-8 z-0">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop"
                alt="Background Shoes"
                className="w-48 h-48 rounded-xl opacity-30 transform -rotate-12"
              />
            </div>
            <div className="absolute bottom-4 right-4 z-0">
              <img
                src="https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=300&h=300&fit=crop"
                alt="Background Shoes"
                className="w-32 h-32 rounded-lg opacity-40 transform rotate-45"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600 rounded-full opacity-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-indigo-600 rounded-full opacity-10 animate-pulse delay-1000" />
      </div>
    </section>
  );
}
