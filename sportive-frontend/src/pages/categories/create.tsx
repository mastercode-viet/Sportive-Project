import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const CategoryCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item 
          label="Name" 
          name="name"
          rules={[{ required: true, message: "Please enter category name" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          label="Description" 
          name="description"
          rules={[{ required: true, message: "Please enter category description" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Create>
  );
};
