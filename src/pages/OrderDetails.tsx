/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetSingleOrderQuery } from "@/redux/features/Admin/orderManagementApi";
import { useParams } from "react-router-dom";
import { Card, Descriptions, Row, Col, Image, Typography, Divider } from "antd";
import Loader from "./Loader"; // Loader component in case of loading
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";

const { Title } = Typography;

const OrderDetails = () => {
  const { id } = useParams();
  const { data: order, isLoading } = useGetSingleOrderQuery(id);

  if (isLoading) return <Loader />;

  const {
    transaction,
    cars,
    totalPrice,
    orderStatus,
    status,
    createdAt,
    updatedAt,
  } = order?.data || {};

  return (
    <div className="max-w-screen-2xl mx-auto py-6 px-4">
      <div className="order-details">
        <Title level={2} className="text-center text-red-500 font-bold mb-6">
          Order Details
        </Title>

        {/* Transaction Information */}
        <Card
          bordered={false}
          className="bg-white shadow-lg rounded-lg mb-6 border-red-200"
        >
          <Title level={3} className="text-red-500 font-semibold mb-4">
            Transaction Information
          </Title>
          <Descriptions bordered column={1} className="rounded-lg">
            <Descriptions.Item label="Transaction ID">
              {transaction?.id}
            </Descriptions.Item>
            <Descriptions.Item label="Bank Status">
              {transaction?.bank_status}
            </Descriptions.Item>
            <Descriptions.Item label="Date & Time">
              {transaction?.date_time}
            </Descriptions.Item>
            <Descriptions.Item label="Payment Method">
              {transaction?.method}
            </Descriptions.Item>
            <Descriptions.Item label="SP Code">
              {transaction?.sp_code}
            </Descriptions.Item>
            <Descriptions.Item label="SP Message">
              {transaction?.sp_message}
            </Descriptions.Item>
          </Descriptions>
        </Card>

        <Divider className="border-red-200" />

        {/* Car Information */}
        <Title level={3} className="text-red-500 font-semibold mb-4">
          Car Information
        </Title>
        {cars?.map(
          (car: {
            _id: Key | null | undefined;
            image: string | undefined;
            name:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | null
              | undefined;
            brand:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined;
            category:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined;
            description:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined;
            fuelType:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined;
            milage:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined;
            year:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined;
            price:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined;
            userName:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined;
            email:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined;
            address:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined;
            phone:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined;
            city:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined;
            totalPrice:
              | string
              | number
              | boolean
              | ReactElement<any, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | null
              | undefined;
          }) => (
            <Card
              key={car._id}
              bordered={false}
              className="bg-white shadow-lg rounded-lg mb-6 border-red-200"
            >
              <Row gutter={16} align="middle">
                <Col xs={24} sm={8}>
                  <Image
                    src={car.image}
                    
                    className="rounded-lg shadow-md"
                    preview={false}
                  />
                </Col>
                <Col xs={24} sm={16}>
                  <Descriptions bordered column={1} className="rounded-lg">
                    <Descriptions.Item label="Car Name">
                      {car.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Brand">
                      {car.brand}
                    </Descriptions.Item>
                    <Descriptions.Item label="Category">
                      {car.category}
                    </Descriptions.Item>
                    <Descriptions.Item label="Description">
                      {car.description}
                    </Descriptions.Item>
                    <Descriptions.Item label="Fuel Type">
                      {car.fuelType}
                    </Descriptions.Item>
                    <Descriptions.Item label="Milage">
                      {car.milage}
                    </Descriptions.Item>
                    <Descriptions.Item label="Year">
                      {car.year}
                    </Descriptions.Item>
                    <Descriptions.Item label="Price">
                      ${car.price}
                    </Descriptions.Item>
                    <Descriptions.Item label="User Name">
                      {car.userName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Email">
                      {car.email}
                    </Descriptions.Item>
                    <Descriptions.Item label="Address">
                      {car.address}
                    </Descriptions.Item>
                    <Descriptions.Item label="Phone">
                      {car.phone}
                    </Descriptions.Item>
                    <Descriptions.Item label="City">
                      {car.city}
                    </Descriptions.Item>
                    <Descriptions.Item label="Total Price">
                      ${car.totalPrice}
                    </Descriptions.Item>
                  </Descriptions>
                </Col>
              </Row>
            </Card>
          )
        )}

        <Divider className="border-red-200" />

        {/* Order Summary */}
        <Card bordered={false} className="bg-white shadow-lg rounded-lg">
          <Title level={3} className="text-red-500 font-semibold mb-4">
            Order Summary
          </Title>
          <Descriptions bordered column={1} className="rounded-lg">
            <Descriptions.Item label="Total Price">
              ${totalPrice}
            </Descriptions.Item>
            <Descriptions.Item label="Order Status">
              {orderStatus}
            </Descriptions.Item>
            <Descriptions.Item label="Status">{status}</Descriptions.Item>
            <Descriptions.Item label="Created At">
              {new Date(createdAt).toLocaleString()}
            </Descriptions.Item>
            <Descriptions.Item label="Updated At">
              {new Date(updatedAt).toLocaleString()}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </div>
    </div>
  );
};

export default OrderDetails;
