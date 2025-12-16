import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Alert, Checkbox, Card, Typography } from 'antd';
import axios from 'axios'

const URL_AUTH = "/api/auth/login"

export default function LoginScreen(props) {

  const [isLoading, setIsLoading] = useState(false)
  const [errMsg, setErrMsg] = useState(null)
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      setIsLoading(true)
      setErrMsg(null)
      const { remember, ...credentials } = formData
      const response = await axios.post(URL_AUTH, credentials)
      const token = response.data.access_token
      axios.defaults.headers.common = { 'Authorization': `bearer ${token}` }
      props.onLoginSuccess(token, remember)
      navigate('/')
    } catch (err) {
      console.log(err)
      setErrMsg(err.message)
    } finally { setIsLoading(false) }
  }
  return (
    <div className="login-wrapper">
      <Card className="login-card" bordered={false}>
        <div style={{ textAlign: 'center', marginBottom: 12 }}>
          <Typography.Title level={3} style={{ margin: 0 }}>Sign in to Your Account</Typography.Title>
          <Typography.Text type="secondary">Enter your credentials to continue</Typography.Text>
        </div>

        <Form
          onFinish={handleLogin}
          autoComplete="off"
          initialValues={{ remember: false }}
          layout="vertical"
          requiredMark={false}
        >

          {errMsg &&
            <Form.Item>
              <Alert message={errMsg} type="error" />
            </Form.Item>
          }

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true },]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember Me</Checkbox>
              </Form.Item>
              <a href="#" onClick={(e) => e.preventDefault()}>Forgot password?</a>
            </div>
          </Form.Item>

          <Form.Item>
            <Button type="primary" block htmlType="submit" loading={isLoading}>
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}