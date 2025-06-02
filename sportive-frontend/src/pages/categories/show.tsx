import { useShow, useOne } from "@refinedev/core";
import { Show, MarkdownField } from "@refinedev/antd";
import { Typography } from "antd";

const { Title, Text } = Typography;

export const CategoryShow = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  return (
    <Show isLoading={isLoading}>
      <Title level={5}>Name</Title>
      <Text>{record?.name}</Text>

      <Title level={5}>Description</Title>
      <Text>{record?.description}</Text>

      <Title level={5}>Created At</Title>
      <Text>
        {record?.createdAt && new Date(record?.createdAt).toLocaleString()}
      </Text>
    </Show>
  );
};
