
import React from 'react';
import { Button, Checkbox, Form, Input,Card } from 'antd';
import axios from "axios";
import { Navigate } from "react-router-dom";

const onFinish = async ({email,password}) => {
  console.log('Success:', values);
  try {
    const user = await axios.post('http://localhost:3000/auth/login',{email,password})
    if(user.status === 201){
        Navigate('/u')
    }
  } catch (error) {
    
  }
};


const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
const Login = () => (
    <div className="d-flex justify-content-center pt-5">
    <Card >

  <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Email"
      name="email"
      rules={[
        {
          required: true,
          message: 'Please input your Email!',
        },
      ]}
    >
      <Input 
     
       />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[
        {
          required: true,
          message: 'Please input your password!',
        },
      ]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item name="remember" valuePropName="checked" label={null}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  </Card>
  </div>
);
export default Login;