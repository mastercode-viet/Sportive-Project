import {
  List,
  EditButton,
  ShowButton,
  DeleteButton,
  useTable,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import type { BaseRecord } from "@refinedev/core";

export const ProductList = () => {
  const { tableProps } = useTable({ syncWithLocation: true });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex="name" title="Name" />
        <Table.Column dataIndex="price" title="Price" />
        <Table.Column dataIndex="category" title="Category" />
        <Table.Column dataIndex="stock" title="Stock" />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
