/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { Table, Input, Space } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useGetUserQuery } from "@/redux/features/Admin/userManagementApi";

interface User {
  key: number;
  name: string;
  email: string;
  role: string;
}

const ManageUser: React.FC = () => {
  const { data: response, isLoading } = useGetUserQuery(undefined);
  const [searchText, setSearchText] = useState<string>("");
  const [searchedColumn, setSearchedColumn] = useState<string>("");

  const users: User[] =
    response?.data?.map((user: { name: any; email: any; role: any; }, index: any) => ({
      key: index,
      name: user.name,
      email: user.email,
      role: user.role,
    })) || [];

  const handleSearch = (
    selectedKeys: string[],
    confirm: () => void,
    dataIndex: string
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex: keyof User) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }: any) => (
      <div className="p-2 bg-white rounded-lg shadow-lg">
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          className="mb-2 block w-full rounded-md"
        />
        <Space>
          <button
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Search
          </button>
          <button
            onClick={() => handleReset(clearFilters)}
            className="bg-gray-300 text-gray-800 px-3 py-1 rounded"
          >
            Reset
          </button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value: string, record: User) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
      render: (text: string) => (
        <span className="font-bold uppercase">{text}</span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email"),
      render: (text: string) => (
        <span className="font-bold ">{text}</span>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text: string) => (
        <span className="font-bold uppercase">{text}</span>
      ),
    },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-red-600 text-white text-center py-4">
          <h2 className="text-xl font-bold">Manage Users</h2>
        </div>
        <Table
          columns={columns}
          dataSource={users}
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} users`,
          }}
          bordered
          loading={isLoading}
          className="p-4"
        />
      </div>
    </div>
  );
};

export default ManageUser;
