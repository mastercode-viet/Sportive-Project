import { Show } from "@refinedev/antd";
import { useShow } from "@refinedev/core";
import { Typography, Card, Image, Descriptions, Tag } from "antd";

const { Title } = Typography;

export const ProductShow = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Card>
        <Descriptions title="Product Information" bordered column={2}>
          <Descriptions.Item label="ID" span={2}>
            {record?._id}
          </Descriptions.Item>
          <Descriptions.Item label="Name" span={2}>
            {record?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Price">
            ${record?.price?.toFixed(2)}
          </Descriptions.Item>
          <Descriptions.Item label="Stock">
            <Tag color={record?.stock > 0 ? "green" : "red"}>
              {record?.stock} in stock
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Category" span={2}>
            {record?.category?.name || record?.category}
          </Descriptions.Item>
          <Descriptions.Item label="Description" span={2}>
            {record?.description}
          </Descriptions.Item>
        </Descriptions>

        {record?.image && (
          <div style={{ marginTop: 20 }}>
            <Title level={5}>Product Image</Title>
            <Image
              src={record.image}
              alt={record.name}
              style={{ maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }}
            />
          </div>
        )}
      </Card>
    </Show>
  );
};
