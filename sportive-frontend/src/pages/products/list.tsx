import {
  List,
  EditButton,
  ShowButton,
  DeleteButton,
  useTable,
  getDefaultSortOrder,
} from "@refinedev/antd";
import { Table, Space, Image, Tag } from "antd";
import type { BaseRecord } from "@refinedev/core";

export const ProductList = () => {
  const { tableProps, sorter } = useTable({
    syncWithLocation: true,
    pagination: {
      pageSize: 10,
    },
    sorters: {
      initial: [
        {
          field: "createdAt",
          order: "desc",
        },
      ],
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="_id">
        <Table.Column 
          dataIndex="image" 
          title="Image"
          render={(value) => (
            value ? (
              <Image
                src={value}
                alt="product"
                style={{ maxWidth: '50px', maxHeight: '50px', objectFit: 'cover' }}
              />
            ) : '-'
          )}
        />
        <Table.Column 
          dataIndex="name" 
          title="Name"
          sorter={true}
          defaultSortOrder={getDefaultSortOrder("name", sorter)}
          render={(value) => value || '-'}
        />
        <Table.Column 
          dataIndex="price" 
          title="Price"
          sorter={true}
          defaultSortOrder={getDefaultSortOrder("price", sorter)}
          render={(value: number) => value ? `$${value.toFixed(2)}` : '-'}
        />
        <Table.Column 
          dataIndex={["category", "name"]}
          title="Category"
          sorter={true}
          defaultSortOrder={getDefaultSortOrder("category.name", sorter)}
          render={(value, record: any) => value || record.category || '-'}
        />
        <Table.Column 
          dataIndex="stock" 
          title="Stock"
          sorter={true}
          defaultSortOrder={getDefaultSortOrder("stock", sorter)}
          render={(value: number) => (
            <Tag color={value > 0 ? 'green' : 'red'}>
              {value || 0} in stock
            </Tag>
          )}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record._id} />
              <ShowButton hideText size="small" recordItemId={record._id} />
              <DeleteButton 
                hideText 
                size="small" 
                recordItemId={record._id}
              />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
