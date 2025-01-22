import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Card, Button, Typography, Row, Col, Space, InputNumber, Empty, Divider, message } from "antd"
import { DeleteOutlined, ShoppingOutlined, ArrowLeftOutlined } from "@ant-design/icons"
import { removeFromCart, updateCartItemQuantity } from "../redux/reduces/wishlistCartSlice"
import { useNavigate } from "react-router-dom"

const { Title, Text } = Typography

const Cart = () => {
  const cart = useSelector((state) => state.wishlistCart.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (cart.length === 0) {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <Empty
          description={
            <Space direction="vertical" size="large">
              <Title level={3}>Your Cart is Empty</Title>
              <Button type="primary" icon={<ShoppingOutlined />} onClick={() => navigate("/dashboard")}>
                Continue Shopping
              </Button>
            </Space>
          }
        />
      </div>
    )
  }

  const handleRemoveProduct = (productId) => {
    dispatch(removeFromCart(productId))
    message.success("Product removed from cart")
  }

  const handleUpdateQuantity = (productId, quantity) => {
    dispatch(updateCartItemQuantity({ id: productId, quantity }))
  }

  const calculateTotal = () => cart.reduce((total, product) => total + product.price * product.quantity, 0)

  const handleCheckout = () => {
    message.info("Proceeding to checkout...")
    // Add your checkout logic here
  }

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Title level={2}>Shopping Cart</Title>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate("/dashboard")}>
            Continue Shopping
          </Button>
        </div>
        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              {cart.map((product) => (
                <Card key={product.id} hoverable>
                  <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                    <img
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                    <div style={{ flex: 1 }}>
                      <Title level={4}>{product.name}</Title>
                      <Text type="secondary">{product.description || "No description available."}</Text>
                    </div>
                    <Space direction="vertical" align="end">
                      <Text strong>${product.price.toFixed(2)}</Text>
                      <InputNumber
                        min={1}
                        value={product.quantity}
                        onChange={(value) => handleUpdateQuantity(product.id, value)}
                      />
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleRemoveProduct(product.id)}
                      >
                        Remove
                      </Button>
                    </Space>
                  </div>
                </Card>
              ))}
            </Space>
          </Col>
          <Col xs={24} lg={8}>
            <Card>
              <Space direction="vertical" size="middle" style={{ width: "100%" }}>
                <Title level={3}>Order Summary</Title>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Text>Subtotal:</Text>
                  <Text strong>${calculateTotal().toFixed(2)}</Text>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Text>Shipping:</Text>
                  <Text strong>$0.00</Text>
                </div>
                <Divider />
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <Title level={4}>Total:</Title>
                  <Title level={4}>${calculateTotal().toFixed(2)}</Title>
                </div>
                <Button type="primary" size="large" block onClick={handleCheckout}>
                  Proceed to Checkout
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>
      </Space>
    </div>
  )
}

export default Cart

