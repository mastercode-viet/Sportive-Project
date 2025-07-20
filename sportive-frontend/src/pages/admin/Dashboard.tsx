"use client"

import type React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import { Card, Statistic, Table, Alert, Row, Col, Typography, Space, Tag, Progress, Skeleton, Empty, Badge } from "antd"
import {
  DollarOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  UserOutlined,
  TrophyOutlined,
  WarningOutlined,
  RiseOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons"

const { Title, Text } = Typography

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("refine-auth") || "{}").token
        const res = await axios.get("http://localhost:3000/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        })
        setStats(res.data)
      } catch (err) {
        setStats(null)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  if (loading) {
    return (
      <div style={{ padding: "24px", background: "#f5f5f5", minHeight: "100vh" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <Space direction="vertical" size="large" style={{ width: "100%" }}>
            {/* Header Skeleton */}
            <div>
              <Skeleton.Input active size="large" style={{ width: 200, marginBottom: 8 }} />
              <Skeleton.Input active size="small" style={{ width: 400 }} />
            </div>

            {/* Stats Cards Skeleton */}
            <Row gutter={[24, 24]}>
              {[...Array(4)].map((_, i) => (
                <Col xs={24} sm={12} lg={6} key={i}>
                  <Card>
                    <Skeleton active paragraph={{ rows: 2 }} />
                  </Card>
                </Col>
              ))}
            </Row>

            {/* Tables Skeleton */}
            <Row gutter={[24, 24]}>
              <Col xs={24} lg={12}>
                <Card>
                  <Skeleton active paragraph={{ rows: 6 }} />
                </Card>
              </Col>
              <Col xs={24} lg={12}>
                <Card>
                  <Skeleton active paragraph={{ rows: 4 }} />
                </Card>
              </Col>
            </Row>
          </Space>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div
        style={{
          padding: "24px",
          background: "#f5f5f5",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Alert
          type="error"
          message="Không thể tải dữ liệu dashboard"
          description="Vui lòng kiểm tra kết nối mạng và thử lại sau."
          showIcon
          style={{ maxWidth: 400 }}
        />
      </div>
    )
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("vi-VN").format(value)
  }

  const statsConfig = [
    {
      title: "Tổng doanh thu",
      value: stats.totalRevenue,
      suffix: "₫",
      icon: <DollarOutlined style={{ color: "#52c41a" }} />,
      color: "#52c41a",
      formatter: formatCurrency,
    },
    {
      title: "Đơn hàng",
      value: stats.totalOrders,
      icon: <ShoppingCartOutlined style={{ color: "#1890ff" }} />,
      color: "#1890ff",
    },
    {
      title: "Sản phẩm",
      value: stats.totalProducts,
      icon: <AppstoreOutlined style={{ color: "#722ed1" }} />,
      color: "#722ed1",
    },
    {
      title: "Người dùng",
      value: stats.totalUsers,
      icon: <UserOutlined style={{ color: "#fa8c16" }} />,
      color: "#fa8c16",
    },
  ]

  const topSellingColumns = [
    {
      title: "Xếp hạng",
      dataIndex: "rank",
      key: "rank",
      width: 80,
      render: (_: any, __: any, index: number) => {
        const colors = ["#gold", "#silver", "#bronze"]
        const bgColors = ["#fff7e6", "#f6f6f6", "#fff2e8"]
        return (
          <Badge
            count={index + 1}
            style={{
              backgroundColor: index < 3 ? colors[index] : "#d9d9d9",
              color: index < 3 ? "#000" : "#fff",
            }}
          />
        )
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Đã bán",
      dataIndex: "sold",
      key: "sold",
      align: "center" as const,
      render: (value: number) => (
        <Tag color="green" icon={<RiseOutlined />}>
          {value.toLocaleString()}
        </Tag>
      ),
    },
    {
      title: "Tồn kho",
      dataIndex: "stock",
      key: "stock",
      align: "center" as const,
      render: (value: number) => <Text type={value < 10 ? "warning" : "secondary"}>{value.toLocaleString()}</Text>,
    },
  ]

  const lowStockColumns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <Text strong>{text}</Text>,
    },
    {
      title: "Tồn kho",
      dataIndex: "stock",
      key: "stock",
      align: "center" as const,
      render: (value: number) => (
        <Space direction="vertical" size="small" style={{ width: "100%" }}>
          <Tag color="red" icon={<WarningOutlined />}>
            {value} còn lại
          </Tag>
          <Progress
            percent={Math.min((value / 20) * 100, 100)}
            size="small"
            status={value < 5 ? "exception" : "active"}
            showInfo={false}
          />
        </Space>
      ),
    },
  ]

  return (
    <div style={{ padding: "24px", background: "#f5f5f5", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {/* Header */}
          <div style={{ marginBottom: "24px" }}>
            <Title level={2} style={{ margin: 0, color: "#001529" }}>
              📊 Dashboard
            </Title>
            <Text type="secondary" style={{ fontSize: "16px" }}>
              Tổng quan về hoạt động kinh doanh của bạn
            </Text>
          </div>

          {/* Stats Cards */}
          <Row gutter={[24, 24]}>
            {statsConfig.map((stat, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card
                  hoverable
                  style={{
                    borderRadius: "12px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    border: "none",
                  }}
                  bodyStyle={{ padding: "24px" }}
                >
                  <Statistic
                    title={
                      <Space>
                        {stat.icon}
                        <Text style={{ color: "#666", fontSize: "14px" }}>{stat.title}</Text>
                      </Space>
                    }
                    value={stat.value}
                    suffix={stat.suffix}
                    formatter={stat.formatter}
                    valueStyle={{
                      color: stat.color,
                      fontSize: "28px",
                      fontWeight: "bold",
                    }}
                  />
                  <div style={{ marginTop: "8px" }}>
                    <Text type="success" style={{ fontSize: "12px" }}>
                      <RiseOutlined /> +12.5% so với tháng trước
                    </Text>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Charts and Tables */}
          <Row gutter={[24, 24]}>
            {/* Top Selling Products */}
            <Col xs={24} lg={14}>
              <Card
                title={
                  <Space>
                    <TrophyOutlined style={{ color: "#faad14" }} />
                    <Text strong style={{ fontSize: "18px" }}>
                      Top 5 sản phẩm bán chạy
                    </Text>
                  </Space>
                }
                extra={<Tag color="gold">Bestsellers</Tag>}
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  border: "none",
                }}
                bodyStyle={{ padding: "24px" }}
              >
                <Table
                  dataSource={stats.topSelling}
                  columns={topSellingColumns}
                  rowKey="_id"
                  pagination={false}
                  size="middle"
                  style={{ marginTop: "16px" }}
                  rowClassName={(_, index) => (index < 3 ? "top-product-row" : "")}
                />
              </Card>
            </Col>

            {/* Low Stock Alert */}
            <Col xs={24} lg={10}>
              <Card
                title={
                  <Space>
                    <WarningOutlined style={{ color: "#ff4d4f" }} />
                    <Text strong style={{ fontSize: "18px" }}>
                      Cảnh báo tồn kho
                    </Text>
                  </Space>
                }
                extra={
                  <Tag color={stats.lowStockProducts.length === 0 ? "green" : "red"}>
                    {stats.lowStockProducts.length === 0 ? "An toàn" : "Cần chú ý"}
                  </Tag>
                }
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  border: "none",
                }}
                bodyStyle={{ padding: "24px" }}
              >
                {stats.lowStockProducts.length === 0 ? (
                  <Empty
                    image={<CheckCircleOutlined style={{ fontSize: "48px", color: "#52c41a" }} />}
                    description={
                      <div>
                        <Text strong style={{ color: "#52c41a", fontSize: "16px" }}>
                          Tuyệt vời!
                        </Text>
                        <br />
                        <Text type="secondary">Không có sản phẩm nào sắp hết hàng</Text>
                      </div>
                    }
                  />
                ) : (
                  <Table
                    dataSource={stats.lowStockProducts}
                    columns={lowStockColumns}
                    rowKey="_id"
                    pagination={false}
                    size="middle"
                    style={{ marginTop: "16px" }}
                  />
                )}
              </Card>
            </Col>
          </Row>
        </Space>
      </div>

      <style jsx>{`
        .top-product-row {
          background: linear-gradient(90deg, #fff7e6 0%, #ffffff 100%);
        }
        .ant-card:hover {
          transform: translateY(-2px);
          transition: all 0.3s ease;
        }
        .ant-statistic-content {
          display: flex;
          align-items: center;
        }
      `}</style>
    </div>
  )
}

export default Dashboard
