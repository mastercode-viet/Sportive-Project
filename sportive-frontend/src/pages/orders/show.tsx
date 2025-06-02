import { Show, TextField } from "@refinedev/antd";
import { Typography, Table } from "antd";
import { useShow } from "@refinedev/core";

const { Title } = Typography;

export const OrderShow = () => {
  const { queryResult } = useShow({});
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Order ID</Title>
      <TextField value={record?._id || record?.id} />
      <Title level={5}>User Email</Title>
      <TextField value={record?.user?.email || record?.user} />
      <Title level={5}>Total Price</Title>
      <TextField value={record?.totalPrice} />
      <Title level={5}>Status</Title>
      <TextField value={record?.status} />
      <Title level={5}>Paid</Title>
      <TextField value={record?.isPaid ? "Yes" : "No"} />
      <Title level={5}>Shipping Address</Title>
      <TextField
        value={
          record?.shippingAddress
            ? `${record.shippingAddress.address}, ${record.shippingAddress.city}, ${record.shippingAddress.country}`
            : ""
        }
      />
      <Title level={5}>Order Items</Title>
      <Table
        dataSource={record?.orderItems || []}
        rowKey={(item) => item.product}
        pagination={false}
        size="small"
      >
        <Table.Column dataIndex={["name"]} title="Product Name" />
        <Table.Column dataIndex={["quantity"]} title="Quantity" />
        <Table.Column dataIndex={["price"]} title="Price" />
      </Table>
    </Show>
  );
};
