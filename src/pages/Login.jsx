import React from "react"
import { Layout, Card, Form, Input, Button, Typography, Divider, message } from "antd"
import { UserOutlined, LockOutlined } from "@ant-design/icons"
import { useDispatch } from "react-redux"
import { login } from "../redux/reduces/authSlice"
import { useNavigate, Link } from "react-router-dom"

const { Title, Text } = Typography
const { Content } = Layout

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const onFinish = (values) => {
    dispatch(login(values))
    message.success("Login successful!")
    navigate("/dashboard")
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card
          style={{
            width: "100%",
            maxWidth: 400,
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            borderRadius: "8px",
          }}
        >
          <Title level={2} style={{ textAlign: "center", marginBottom: "24px" }}>
            Welcome Back
          </Title>
          <Form form={form} name="login" layout="vertical" onFinish={onFinish} autoComplete="off" requiredMark={false}>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" size="large" />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true, message: "Please enter your password!" }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
            </Form.Item>


            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                Log in
              </Button>
            </Form.Item>
          </Form>
          <Divider plain>Or</Divider>
          <div style={{ marginTop: "24px", textAlign: "center" }}>
            <Text>
              Don't have an account? <Link to="/register">Sign up</Link>
            </Text>
          </div>
        </Card>
      </Content>
    </Layout>
  )
}

export default Login

