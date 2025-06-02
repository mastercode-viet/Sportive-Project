import { useShow, useUpdate } from "@refinedev/core";
import { Show, DateField } from "@refinedev/antd";
import { Typography, Card, Descriptions, Table, Space, Button, Tag, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { confirm } = Modal;

export const OrderShow = () => {
  const { queryResult } = useShow();
  const { mutate } = useUpdate();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const handleStatusChange = (newStatus: string) => {
    confirm({
      title: 'Are you sure you want to change the order status?',
      icon: <ExclamationCircleOutlined />,
      content: `Change status to ${newStatus.toUpperCase()}?`,
      onOk() {
        mutate({
          resource: "orders",
          id: record?.id,
          values: {
            status: newStatus,
          },
          mutationMode: "optimistic",
        });
      },
    });
  };

  const handlePaymentStatusChange = (newStatus: string) => {
    confirm({
      title: 'Are you sure you want to change the payment status?',
      icon: <ExclamationCircleOutlined />,
      content: `Change payment status to ${newStatus.toUpperCase()}?`,
      onOk() {
        mutate({
          resource: "orders",
          id: record?.id,
          values: {
            paymentStatus: newStatus,
          },
          mutationMode: "optimistic",
        });
      },
    });
  };

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
    <Show isLoading={isLoading}>
      <Title level={5}>Order Details</Title>
      <Card>
        <Descriptions bordered>
          <Descriptions.Item label="Order ID" span={3}>
            #{record?.id}
          </Descriptions.Item>
          <Descriptions.Item label="Customer Name" span={2}>
            {record?.user.name}
          </Descriptions.Item>
          <Descriptions.Item label="Phone">
            {record?.user.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Email" span={2}>
            {record?.user.email}
          </Descriptions.Item>
          <Descriptions.Item label="Address" span={3}>
            {record?.user.address}
          </Descriptions.Item>
          <Descriptions.Item label="Order Date">
            <DateField value={record?.createdAt} format="YYYY-MM-DD HH:mm" />
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <Space>
              <Tag color={getStatusColor(record?.status)}>
                {record?.status?.toUpperCase()}
              </Tag>
              {record?.status !== 'delivered' && record?.status !== 'cancelled' && (
                <Space>
                  {record?.status === 'pending' && (
                    <Button size="small" onClick={() => handleStatusChange('processing')}>
                      Process
                    </Button>
                  )}
                  {record?.status === 'processing' && (
                    <Button size="small" onClick={() => handleStatusChange('shipped')}>
                      Ship
                    </Button>
                  )}
                  {record?.status === 'shipped' && (
                    <Button size="small" onClick={() => handleStatusChange('delivered')}>
                      Mark Delivered
                    </Button>
                  )}
                  {record?.status === 'pending' && (
                    <Button size="small" danger onClick={() => handleStatusChange('cancelled')}>
                      Cancel
                    </Button>
                  )}
                </Space>
              )}
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Payment Status">
            <Space>
              <Tag color={getPaymentStatusColor(record?.paymentStatus)}>
                {record?.paymentStatus?.toUpperCase()}
              </Tag>
              {record?.paymentStatus === 'pending' && (
                <Space>
                  <Button size="small" onClick={() => handlePaymentStatusChange('paid')}>
                    Mark as Paid
                  </Button>
                  <Button size="small" danger onClick={() => handlePaymentStatusChange('failed')}>
                    Mark as Failed
                  </Button>
                </Space>
              )}
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Payment Method">
            {record?.paymentMethod}
          </Descriptions.Item>
        </Descriptions>

        <Title level={5} style={{ marginTop: 20 }}>Order Items</Title>
        <Table
          dataSource={record?.items}
          rowKey="id"
          pagination={false}
        >
          <Table.Column
            title="Product"
            dataIndex={["product", "name"]}
          />
          <Table.Column
            title="Price"
            dataIndex="price"
            render={(price) => `$${price.toFixed(2)}`}
          />
          <Table.Column
            title="Quantity"
            dataIndex="quantity"
          />
          <Table.Column
            title="Subtotal"
            render={(_, record) => `$${(record.price * record.quantity).toFixed(2)}`}
          />
        </Table>

        <Descriptions style={{ marginTop: 20 }}>
          <Descriptions.Item label="Total Amount">
            <Title level={4}>${record?.totalAmount.toFixed(2)}</Title>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </Show>
  );
};
