import { Show, TextField } from "@refinedev/antd";
import { Typography } from "antd";

const { Title } = Typography;

export const ProductShow = (props: any) => {
  const record = props?.record ?? props?.data?.data ?? {};

  return (
    <Show>
      <Title level={5}>ID</Title>
      <TextField value={record?.id} />
      <Title level={5}>Name</Title>
      <TextField value={record?.name} />
      <Title level={5}>Price</Title>
      <TextField value={record?.price} />
      <Title level={5}>Description</Title>
      <TextField value={record?.description} />
      <Title level={5}>Image</Title>
      <TextField value={record?.image} />
      <Title level={5}>Category</Title>
      <TextField value={record?.category} />
      <Title level={5}>Stock</Title>
      <TextField value={record?.stock} />
    </Show>
  );
};
