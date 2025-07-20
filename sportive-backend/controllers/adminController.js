const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");

exports.getDashboardStats = async (req, res) => {
  try {
    // Tổng doanh thu
    const orders = await Order.find({ status: { $ne: "cancelled" } });
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    // Tổng số đơn hàng, sản phẩm, user
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalUsers = await User.countDocuments();

    // Top 5 sản phẩm bán chạy
    const productSales = {};
    orders.forEach(order => {
      order.items.forEach(item => {
        productSales[item.product] = (productSales[item.product] || 0) + item.quantity;
      });
    });
    const topProducts = await Product.find({ _id: { $in: Object.keys(productSales) } })
      .lean();
    const topSelling = topProducts
      .map(p => ({
        ...p,
        sold: productSales[p._id.toString()] || 0
      }))
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 5);

    // Lưu ý (ví dụ: sản phẩm sắp hết hàng)
    const lowStockProducts = await Product.find({ stock: { $lte: 5 } }).select("name stock");

    res.json({
      totalRevenue,
      totalOrders,
      totalProducts,
      totalUsers,
      topSelling,
      lowStockProducts
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 