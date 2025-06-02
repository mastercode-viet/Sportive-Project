import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber } from "antd";

export const ProductEdit = () => {
  const { formProps, saveButtonProps } = useForm({});

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Name" name={["name"]} rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Price" name={["price"]} rules={[{ required: true }]}>
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item label="Description" name={["description"]}>
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Image" name={["image"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Category" name={["category"]}>
          <Input />
        </Form.Item>
        <Form.Item label="Stock" name={["stock"]}>
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
