import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { viewProductDetails } from "../redux/reduces/productSlice";
import { Card, Button, Row, Col, Typography, Space } from "antd";
import { ShoppingCartOutlined, EyeOutlined, LogoutOutlined } from "@ant-design/icons";
import { logout } from "../redux/reduces/authSlice";

const { Title, Text } = Typography;

const Dashboard = () => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleViewDetails = (id) => {
    dispatch(viewProductDetails(id));
    navigate(`/product/${id}`);
  };

  const handleGoToCart = () => {
    navigate("/cart");
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login")
  };

  return (
    <div style={{ padding: "24px" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title level={2}>Products</Title>
          <Space>
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              onClick={handleGoToCart}
            >
              Go to Cart
            </Button>
            <Button
              type="default"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Space>
        </div>
        <Row gutter={[16, 16]}>
          {products.map((product) => (
            <Col xs={24} sm={12} md={8} key={product.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={product.name}
                    src={product.image || "/placeholder.svg"}
                    style={{ height: 200, objectFit: "cover" }}
                  />
                }
                actions={[
                  <Button
                    type="primary"
                    icon={<EyeOutlined />}
                    key="view-details-button" // Added key prop here
                    onClick={() => handleViewDetails(product.id)}
                  >
                    View Details
                  </Button>,
                ]}
              >
                <Card.Meta
                  title={product.name}
                  description={
                    <Space direction="vertical">
                      <Text>{product.description}</Text>
                      <Text strong>${product.price.toFixed(2)}</Text>
                    </Space>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      </Space>
    </div>
  );
};

export default Dashboard;
