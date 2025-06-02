import {
  List,
  EditButton,
  ShowButton,
  DeleteButton,
  useTable,
} from "@refinedev/antd";
import { Table, Space } from "antd";
import type { BaseRecord } from "@refinedev/core";

export const CategoryList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    pagination: {
      pageSize: 10,
    },
    sorters: {
      initial: [
        {
          field: "_id",
          order: "desc",
        },
      ],
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="_id">
        <Table.Column dataIndex="_id" title="ID" />
        <Table.Column 
          dataIndex="name" 
          title="Name"
          sorter={true}
        />
        <Table.Column 
          dataIndex="description" 
          title="Description"
          sorter={true}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record._id} />
              <ShowButton hideText size="small" recordItemId={record._id} />
              <DeleteButton hideText size="small" recordItemId={record._id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
