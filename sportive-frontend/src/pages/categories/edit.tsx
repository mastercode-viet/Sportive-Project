import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const CategoryEdit = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
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
    </Edit>
  );
};
