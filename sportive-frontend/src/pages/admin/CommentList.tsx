import React, { useEffect, useState } from "react";
import { Table, Tag, Button, Popconfirm, message, Space, Rate } from "antd";
import { Delete, Eye, User, MessageSquare } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Comment {
  _id: string;
  content: string;
  rating: number;
  user: {
    _id: string;
    username: string;
  };
  product: {
    _id: string;
    name: string;
  };
  createdAt: string;
}

const CommentList: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchComments = async () => {
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("refine-auth") || '{}').token;
      const response = await axios.get("http://localhost:3000/api/comments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(response.data);
    } catch (err) {
      message.error("Không thể tải danh sách comment");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const token = JSON.parse(localStorage.getItem("refine-auth") || '{}').token;
      await axios.delete(`http://localhost:3000/api/comments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success("Đã xóa comment");
      fetchComments();
    } catch (err) {
      message.error("Xóa comment thất bại");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const columns = [
    {
      title: "Người dùng",
      dataIndex: ["user", "username"],
      key: "user",
      render: (username: string, record: Comment) => (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600" />
          </div>
          <span className="font-medium">{username}</span>
        </div>
      ),
    },
    {
      title: "Sản phẩm",
      dataIndex: ["product", "name"],
      key: "product",
      render: (productName: string, record: Comment) => (
        <div className="flex items-center space-x-2">
          <MessageSquare className="w-4 h-4 text-green-600" />
          <span className="font-medium">{productName}</span>
        </div>
      ),
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => (
        <Rate disabled value={rating} />
      ),
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      key: "content",
      render: (content: string) => (
        <div className="max-w-xs">
          <p className="text-sm text-gray-700 line-clamp-2">{content}</p>
        </div>
      ),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (dateString: string) => (
        <span className="text-sm text-gray-500">{formatDate(dateString)}</span>
      ),
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_, record: Comment) => (
        <Space>
          <Button
            size="small"
            icon={<Eye className="w-3 h-3" />}
            onClick={() => navigate(`/product/${record.product._id}`)}
          >
            Xem sản phẩm
          </Button>
          <Popconfirm
            title="Xóa comment này?"
            description="Bạn có chắc chắn muốn xóa comment này?"
            onConfirm={() => handleDelete(record._id)}
            okText="Xóa"
            cancelText="Hủy"
          >
            <Button
              size="small"
              danger
              icon={<Delete className="w-3 h-3" />}
            >
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 8 }}>Quản lý bình luận</h2>
        <p className="text-gray-600">Quản lý tất cả bình luận của người dùng</p>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <Table
          dataSource={comments}
          columns={columns}
          rowKey="_id"
          loading={loading}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} của ${total} bình luận`,
          }}
          scroll={{ x: 1200 }}
        />
      </div>
    </div>
  );
};

export default CommentList; 