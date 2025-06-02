import { List, ShowButton, useTable } from "@refinedev/antd";
import { Table, Space } from "antd";
import type { BaseRecord } from "@refinedev/core";

export const OrderList = () => {
  const { tableProps } = useTable({ syncWithLocation: true });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title="ID" />
        <Table.Column dataIndex={["user", "email"]} title="User Email" />
        <Table.Column dataIndex="totalPrice" title="Total Price" />
        <Table.Column dataIndex="status" title="Status" />
        <Table.Column dataIndex="isPaid" title="Paid" render={(v) => (v ? "Yes" : "No")} />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <ShowButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
