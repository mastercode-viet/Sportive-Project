import React, { useState, useEffect } from "react";
import { Button, Input, Rate, message, Popconfirm } from "antd";
import { Send, Edit, Delete, User } from "lucide-react";
import axios from "axios";

const { TextArea } = Input;

interface Comment {
  _id: string;
  content: string;
  rating: number;
  user: {
    _id: string;
    username: string;
  };
  createdAt: string;
}

interface CommentSectionProps {
  productId: string;
}

const CommentSection: React.FC<CommentSectionProps> = ({ productId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [editRating, setEditRating] = useState(5);

  const userStr = localStorage.getItem("refine-auth");
  const user = userStr ? JSON.parse(userStr) : null;

  useEffect(() => {
    fetchComments();
  }, [productId]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/comments/product/${productId}`);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handleSubmitComment = async () => {
    if (!user) {
      message.warning("Bạn cần đăng nhập để bình luận!");
      return;
    }

    if (!newComment.trim()) {
      message.warning("Vui lòng nhập nội dung bình luận!");
      return;
    }

    setLoading(true);
    try {
      const token = user.token;
      const response = await axios.post(
        `http://localhost:3000/api/comments/product/${productId}`,
        {
          content: newComment,
          rating,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setComments([response.data, ...comments]);
      setNewComment("");
      setRating(5);
      message.success("Bình luận đã được đăng!");
    } catch (error: any) {
      message.error(error.response?.data?.error || "Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  const handleEditComment = async (commentId: string) => {
    if (!editContent.trim()) {
      message.warning("Vui lòng nhập nội dung bình luận!");
      return;
    }

    try {
      const token = user.token;
      const response = await axios.put(
        `http://localhost:3000/api/comments/${commentId}`,
        {
          content: editContent,
          rating: editRating,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setComments(comments.map(comment => 
        comment._id === commentId ? response.data : comment
      ));
      setEditingComment(null);
      setEditContent("");
      setEditRating(5);
      message.success("Bình luận đã được cập nhật!");
    } catch (error: any) {
      message.error(error.response?.data?.error || "Có lỗi xảy ra!");
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      const token = user.token;
      await axios.delete(`http://localhost:3000/api/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setComments(comments.filter(comment => comment._id !== commentId));
      message.success("Bình luận đã được xóa!");
    } catch (error: any) {
      message.error(error.response?.data?.error || "Có lỗi xảy ra!");
    }
  };

  const startEdit = (comment: Comment) => {
    setEditingComment(comment._id);
    setEditContent(comment.content);
    setEditRating(comment.rating);
  };

  const cancelEdit = () => {
    setEditingComment(null);
    setEditContent("");
    setEditRating(5);
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

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <User className="w-6 h-6 text-blue-600 mr-3" />
        Bình luận ({comments.length})
      </h3>

      {/* Add Comment Form */}
      {user ? (
        <div className="mb-8 p-6 bg-gray-50 rounded-xl">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <span className="font-medium text-gray-900">{user.username}</span>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Đánh giá của bạn
            </label>
            <Rate value={rating} onChange={setRating} />
          </div>
          
          <TextArea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
            rows={4}
            className="mb-4"
          />
          
          <Button
            type="primary"
            icon={<Send className="w-4 h-4" />}
            onClick={handleSubmitComment}
            loading={loading}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Đăng bình luận
          </Button>
        </div>
      ) : (
        <div className="mb-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
          <p className="text-yellow-800">
            Bạn cần <a href="/login" className="text-blue-600 hover:underline">đăng nhập</a> để bình luận.
          </p>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment._id} className="border-b border-gray-100 pb-6 last:border-b-0">
            {editingComment === comment._id ? (
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-medium mb-2">
                    Đánh giá
                  </label>
                  <Rate value={editRating} onChange={setEditRating} />
                </div>
                <TextArea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={3}
                  className="mb-4"
                />
                <div className="flex space-x-2">
                  <Button
                    type="primary"
                    onClick={() => handleEditComment(comment._id)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Cập nhật
                  </Button>
                  <Button onClick={cancelEdit}>Hủy</Button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{comment.user.username}</p>
                      <p className="text-sm text-gray-500">{formatDate(comment.createdAt)}</p>
                    </div>
                  </div>
                  
                  {user && (user.id === comment.user._id || user.role === "admin") && (
                    <div className="flex space-x-2">
                      <Button
                        size="small"
                        icon={<Edit className="w-3 h-3" />}
                        onClick={() => startEdit(comment)}
                      >
                        Sửa
                      </Button>
                      <Popconfirm
                        title="Xóa bình luận?"
                        description="Bạn có chắc chắn muốn xóa bình luận này?"
                        onConfirm={() => handleDeleteComment(comment._id)}
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
                    </div>
                  )}
                </div>
                
                <div className="mb-3">
                  <Rate disabled value={comment.rating} />
                </div>
                
                <p className="text-gray-700 leading-relaxed">{comment.content}</p>
              </div>
            )}
          </div>
        ))}
        
        {comments.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Chưa có bình luận nào. Hãy là người đầu tiên chia sẻ trải nghiệm!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection; 