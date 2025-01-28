import React from "react";
import { useGetAllOrdersQuery } from "@/redux/features/Admin/orderManagementApi";
import { Card, Typography, Statistic, Row, Col, Divider } from "antd";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion"; // For animation

const { Title } = Typography;

const RevenueCheck = () => {
  const { data: revenue } = useGetAllOrdersQuery(undefined);
  const totalRevenue = revenue?.data?.reduce((acc, order) => acc + order.totalPrice, 0) || 0;
  const chartData = revenue?.data?.map((order) => ({
    name: order.date, 
    revenue: order.totalPrice,
  }));

  return (
    <div className="flex justify-center items-center flex-col lg:flex-row" style={{ padding: "20px" }}>
      <Row gutter={[16, 24]} style={{ width: "100%" }}>
        {/* Total Revenue Card */}
        <Col xs={24} sm={12} md={12} lg={8}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Card
              bordered={false}
              style={{
                textAlign: "center",
                borderRadius: "16px",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#ffffff",
                padding: "20px",
                marginBottom: "20px",
              }}
            >
              <Title level={3} style={{ color: "red" }}>Total Revenue</Title>
              <Statistic
                value={totalRevenue}
                prefix="$"
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "#4caf50",
                }}
              />
            </Card>
          </motion.div>
        </Col>

        {/* Revenue Over Time Chart */}
        <Col >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Card
              bordered={false}
              style={{
                borderRadius: "16px",
                boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                backgroundColor: "#ffffff",
                padding: "20px",
                marginBottom: "20px",
              }}
            >
              <Title level={4} style={{ color: "#333", fontWeight: "500" }}>Revenue Over Time</Title>
              <Divider style={{ margin: "12px 0" }} />
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={chartData}>
                  <XAxis dataKey="name" stroke="#8884d8" />
                  <YAxis stroke="#8884d8" />
                  <Tooltip />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar
                    dataKey="revenue"
                    fill="#82ca9d"
                    radius={[8, 8, 0, 0]}
                    animationDuration={1000}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </div>
  );
};

export default RevenueCheck;
