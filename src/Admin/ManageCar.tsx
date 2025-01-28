/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Table, Input, Button, Space, Popconfirm, Image, message } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import Loader from "@/pages/Loader";
import {
  useDeleteProductMutation,
  useGetAllProductsQuery,
} from "@/redux/features/Admin/productManagement.api";

import { Link } from "react-router-dom";
import { CardHeader, CardTitle } from "@/components/ui/card";

interface Car {
  _id: string;
  key: number;
  image: string;
  carName: string;
  brand: string;
  quantity: number;
  model: string;
  year: number;
  price: number;
}

interface CarResponse {
  data?: {
    data?: Car[];
  };
}

const ManageCar: React.FC = () => {
  const { data: response, isLoading } = useGetAllProductsQuery(undefined) as {
    data?: CarResponse;
    isLoading: boolean;
  };
  const [deleteProduct] = useDeleteProductMutation();

  const [searchText, setSearchText] = useState<string>("");
  const [searchedColumn, setSearchedColumn] = useState<string>("");

  if (isLoading) return <Loader />;

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

  const getColumnSearchProps = (dataIndex: keyof Car) => ({
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
          className="mb-2 block w-full rounded-md border-rose-300 focus:border-rose-500"
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            className="bg-rose-500 hover:bg-rose-600"
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            className="border-rose-500 text-rose-500 hover:border-rose-600"
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined
        className={filtered ? "text-rose-500" : "text-gray-400"}
      />
    ),
    onFilter: (value: string, record: Car) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
  });

  const handleDelete = async (record: Car) => {
    try {
      // Call deleteProduct mutation
      await deleteProduct(record._id).unwrap();
      message.success(`${record.carName} deleted successfully!`);
    } catch (error) {
      console.log(error);
      message.error("Failed to delete car. Please try again.");
    }
  };

  const columns: any = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text: string) => (
        <Image
          src={text}
          alt="Car"
          width={100}
          className="rounded-lg shadow-md hover:scale-110 transition-transform"
        />
      ),
    },
    {
      title: "Car Name",
      dataIndex: "carName",
      key: "carName",
      ...getColumnSearchProps("carName"),
      render: (text: string) => (
        <span className="font-semibold text-gray-800">{text}</span>
      ),
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      ...getColumnSearchProps("brand"),
      render: (text: string) => (
        <span className="font-medium text-gray-700">{text}</span>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      sorter: (a: Car, b: Car) => a.quantity - b.quantity,
      render: (quantity: number) => (
        <span
          className={`font-bold ${
            quantity > 10
              ? "text-green-600"
              : quantity > 5
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          {quantity}
        </span>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a: Car, b: Car) => a.price - b.price,
      render: (price: number) => (
        <span className="font-medium text-gray-700">${price}</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Car) => (
        <Space size="middle">
          <Link
            to={`/dashboard/update-car/${record._id}`}
            type="text"
            className="text-blue-500 hover:text-blue-700"
          >
            Update
          </Link>

          <Popconfirm
            title="Are you sure to delete this car?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ className: "bg-rose-500 text-white" }}
          >
            <Button
              type="text"
              icon={<DeleteOutlined />}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </Button>
          </Popconfirm>
          <Link
            to={`/car/${record._id}`}
            type="text"
            className="text-green-500 hover:text-green-700"
          >
            Details
          </Link>
        </Space>
      ),
    },
  ];

  const dataSource =
    response?.data?.data?.map((item, index) => ({
      i: index,
      ...item,
    })) || [];

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-rose-600 to-red-500 py-6">
          <CardTitle className="text-4xl font-extrabold text-white text-center tracking-wide drop-shadow-lg">
            Manage Cars
          </CardTitle>
        </CardHeader>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{
            pageSize: 10,
            className: "p-4",
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} cars`,
          }}
          className="p-4"
          bordered
        />
      </div>
    </div>
  );
};

export default ManageCar;
