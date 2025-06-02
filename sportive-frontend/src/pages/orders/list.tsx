import { useTable, List, DateField, ShowButton } from "@refinedev/antd";
import { Table, Space, Tag } from "antd";

export const OrderList = () => {
  const { tableProps } = useTable({
    resource: "orders",
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'gold';
      case 'processing':
        return 'blue';
      case 'shipped':
        return 'cyan';
      case 'delivered':
        return 'green';
      case 'cancelled':
        return 'red';
      default:
        return 'default';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'paid':
        return 'success';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <List>
      <Table {...tableProps} rowKey="_id">
        <Table.Column
          dataIndex="_id"
          title="ID"
          render={(value) => value ? <span>#{value}</span> : '-'}
        />
        <Table.Column
          dataIndex={["user", "name"]}
          title="Customer"
          render={(value) => value || '-'}
        />
        <Table.Column
          dataIndex="totalAmount"
          title="Total"
          render={(value) => value ? `$${Number(value).toFixed(2)}` : '-'}
        />
        <Table.Column
          dataIndex="status"
          title="Status"
          render={(value) => value ? (
            <Tag color={getStatusColor(value)}>{value.toUpperCase()}</Tag>
          ) : '-'}
        />
        <Table.Column
          dataIndex="paymentStatus"
          title="Payment"
          render={(value) => value ? (
            <Tag color={getPaymentStatusColor(value)}>{value.toUpperCase()}</Tag>
          ) : '-'}
        />
        <Table.Column
          dataIndex="paymentMethod"
          title="Payment Method"
          render={(value) => value || '-'}
        />
        <Table.Column
          dataIndex="createdAt"
          title="Order Date"
          render={(value) => value ? <DateField value={value} format="YYYY-MM-DD HH:mm" /> : '-'}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: any) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record._id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
