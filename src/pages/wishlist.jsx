import React, { useState } from "react"
import { Card, Button, Typography, Row, Col, Empty, Space, message } from "antd"
import { HeartFilled, ShoppingCartOutlined, DeleteOutlined } from "@ant-design/icons"
import { useSelector, useDispatch } from "react-redux"
import { removeFromWishlist } from "../redux/reduces/wishlistCartSlice"
import { addToCart } from "../redux/reduces/wishlistCartSlice"
import { useNavigate } from "react-router-dom"

const { Title, Text } = Typography

const Wishlist = () => {
  const { wishlist } = useSelector((state) => state?.wishlistCart)
  const [addedToCart, setAddedToCart] = useState({});
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId))
    message.success("Product removed from wishlist")
  }

  const handleAddToCart = (product) => {
    dispatch(addToCart(product))
    message.success("Product added to cart")
    setAddedToCart((prevState) => ({ ...prevState, [product?.id]: true }));
  }



  if (wishlist.length === 0) {
    return (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={
          <Space direction="vertical" size="large">
            <Title level={3}>Your Wishlist is Empty</Title>
            <Button type="primary" icon={<ShoppingCartOutlined />} onClick={() => navigate("/dashboard")}>
              Continue Shopping
            </Button>
          </Space>
        }
        style={{ margin: "50px 0" }}
      />
    )
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Title level={2}>
            <HeartFilled style={{ color: "#ff4d4f", marginRight: "8px" }} />
            My Wishlist
          </Title>
          <Button type="link" icon={<ShoppingCartOutlined />} onClick={() => navigate("/dashboard")}>
            Continue Shopping
          </Button>
        </div>
        <Row gutter={[16, 16]}>
          {wishlist.map((product) => (
            <Col xs={24} sm={12} md={8} lg={6} key={product.id}>
              <Card
                hoverable
                cover={
                  <img
                    alt={product.name}
                    src={product.image}
                    style={{ height: 200, objectFit: "cover" }}
                  />
                }
                actions={[
                    !addedToCart[product.id] ? (
                        <Button
                            key={product.id}
                            icon={<ShoppingCartOutlined />}
                            onClick={() => handleAddToCart(product)}
                        >
                            Add to Cart
                        </Button>
                    ) : (
                        <Button
                            key={product.id}
                            type="default"
                            onClick={() => navigate('/cart')}
                        >
                            Go to Cart
                        </Button>
                    ),
                    <Button
                        icon={<DeleteOutlined />}
                        danger
                        onClick={() => handleRemoveFromWishlist(product.id)}
                    >
                        Remove
                    </Button>,
                ]}
              >
                <Card.Meta
                  title={product.name}
                  description={
                    <Space direction="vertical">
                      <Text>{product.description || "No description available."}</Text>
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
  )
}

export default Wishlist

