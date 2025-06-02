import { Create, useForm, useSelect } from "@refinedev/antd";
import { Form, Input, InputNumber, Upload, Select, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";
import type { UploadFile } from "antd/es/upload/interface";

export const ProductCreate = () => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const { formProps, saveButtonProps, onFinish } = useForm();

  const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",
    optionLabel: "name",
    optionValue: "_id",
  });

  const handleSubmit = async (values: any) => {
    try {
      if (!imageUrl) {
        message.error('Vui lòng tải lên hình ảnh sản phẩm!');
        return;
      }

      // Transform the data before sending
      const transformedValues = {
        ...values,
        image: imageUrl,
        price: Number(values.price),
        stock: Number(values.stock)
      };

      // Call the original onFinish with transformed values
      await onFinish(transformedValues);
      message.success('Tạo sản phẩm thành công!');
      
      // Reset form
      setImageUrl("");
      setFileList([]);
    } catch (error) {
      message.error('Lỗi khi tạo sản phẩm. Vui lòng thử lại!');
      console.error('Error:', error);
    }
  };

  const handleUpload = async (options: any) => {
    const { file, onSuccess, onError } = options;
    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploading(true);
      // Get the token from localStorage
      const userStr = localStorage.getItem('refine-auth');
      if (!userStr) {
        throw new Error('Không tìm thấy token xác thực. Vui lòng đăng nhập lại!');
      }
      const user = JSON.parse(userStr);

      const response = await axios.post('http://localhost:3000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${user.token}`
        },
      });
      
      setImageUrl(response.data.url);
      setFileList([
        {
          uid: '-1',
          name: file.name,
          status: 'done',
          url: `http://localhost:3000${response.data.url}`
        }
      ]);
      onSuccess('Ok');
      message.success('Tải ảnh lên thành công!');
    } catch (err: any) {
      console.error('Upload error:', err);
      onError({ err });
      if (err.response?.status === 401) {
        message.error('Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!');
      } else {
        message.error(err.response?.data?.error || 'Lỗi khi tải ảnh lên. Vui lòng thử lại!');
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={handleSubmit}>
        <Form.Item 
          label="Tên sản phẩm" 
          name="name" 
          rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          label="Giá" 
          name="price" 
          rules={[{ required: true, message: "Vui lòng nhập giá sản phẩm" }]}
        >
          <InputNumber 
            min={0} 
            style={{ width: "100%" }}
            prefix="$"
            step={0.01}
            precision={2}
          />
        </Form.Item>
        <Form.Item 
          label="Mô tả" 
          name="description"
          rules={[{ required: true, message: "Vui lòng nhập mô tả sản phẩm" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item 
          label="Hình ảnh" 
          required
          tooltip="Hình ảnh sản phẩm (JPG, PNG hoặc GIF, tối đa 5MB)"
        >
          <Upload.Dragger
            name="file"
            customRequest={handleUpload}
            listType="picture-card"
            fileList={fileList}
            maxCount={1}
            accept="image/*"
            showUploadList={{ 
              showPreviewIcon: true, 
              showRemoveIcon: true,
              showDownloadIcon: false
            }}
            onChange={({ fileList }) => setFileList(fileList)}
            onRemove={() => {
              setImageUrl("");
              setFileList([]);
              return true;
            }}
          >
            {fileList.length < 1 && (
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>
                  {uploading ? 'Đang tải lên...' : 'Tải ảnh lên'}
                </div>
              </div>
            )}
          </Upload.Dragger>
        </Form.Item>
        <Form.Item 
          label="Danh mục" 
          name="category"
          rules={[{ required: true, message: "Vui lòng chọn danh mục sản phẩm" }]}
        >
          <Select {...categorySelectProps} />
        </Form.Item>
        <Form.Item 
          label="Số lượng trong kho" 
          name="stock"
          rules={[{ required: true, message: "Vui lòng nhập số lượng sản phẩm" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>
      </Form>
    </Create>
  );
};
