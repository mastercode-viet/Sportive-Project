import React, { useEffect, useState } from "react";
import { Table, Tag, Button, Popconfirm, message } from "antd";
import axios from "axios";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("refine-auth") || '{}').token;
      const res = await axios.get("http://localhost:3000/api/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      message.error("Không thể tải danh sách user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const token = JSON.parse(localStorage.getItem("refine-auth") || '{}').token;
      await axios.delete(`http://localhost:3000/api/auth/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.success("Đã xóa user");
      fetchUsers();
    } catch (err) {
      message.error("Xóa user thất bại");
    }
  };

  return (
    <div>
      <h2 style={{ fontWeight: 700, fontSize: 24, marginBottom: 24 }}>Quản lý người dùng</h2>
      <Table
        dataSource={users}
        rowKey="_id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      >
        <Table.Column title="ID" dataIndex="_id" />
        <Table.Column title="Tên đăng nhập" dataIndex="username" />
        <Table.Column title="Email" dataIndex="email" />
        <Table.Column
          title="Role"
          dataIndex="role"
          render={(role) => (
            <Tag color={role === "admin" ? "red" : "blue"}>{role.toUpperCase()}</Tag>
          )}
        />
        <Table.Column
          title="Hành động"
          key="actions"
          render={(_, record: any) => (
            record.role !== "admin" && (
              <Popconfirm
                title="Bạn chắc chắn muốn xóa user này?"
                onConfirm={() => handleDelete(record._id)}
                okText="Xóa"
                cancelText="Hủy"
              >
                <Button danger size="small">Xóa</Button>
              </Popconfirm>
            )
          )}
        />
      </Table>
    </div>
  );
};

export default UserList; 