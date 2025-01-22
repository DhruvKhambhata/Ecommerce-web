import React from "react"
import { Form, Input, Button, Typography, Layout, Card, Divider, message } from "antd"
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons"
import { Link, useNavigate } from "react-router-dom"

const { Title, Text } = Typography
const { Content } = Layout

const Register = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const onFinish = (values) => {
    console.log("Received values:", values)
    message.success("Registration successful!")
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
            Create an Account
          </Title>
          <Form
            form={form}
            name="register"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            requiredMark={false}
          >
            <Form.Item name="name" rules={[{ required: true, message: "Please enter your name!" }]}>
              <Input prefix={<UserOutlined />} placeholder="Full Name" size="large" />
            </Form.Item>

            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Please enter your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" size="large" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password!" },
                { min: 8, message: "Password must be at least 8 characters long!" },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Password" size="large" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve()
                    }
                    return Promise.reject(new Error("The two passwords do not match!"))
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Confirm Password" size="large" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                Register
              </Button>
            </Form.Item>
          </Form>

          <Divider plain>Or register with</Divider>

          <div style={{ marginTop: "24px", textAlign: "center" }}>
            <Text>
              Already have an account? <Link to="/login">Log in</Link>
            </Text>
          </div>
        </Card>
      </Content>
    </Layout>
  )
}

export default Register

