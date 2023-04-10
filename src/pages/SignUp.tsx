import { Button, Form, Input } from "antd";
import React, { useState } from "react";
import IUser from "../interfaces/user";
interface IProps {
  addUser: (user: IUser) => void;
}
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const SignUpPage = (props: IProps) => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    props.addUser(values);
  };

  return (
    <div className="signup">
      <h1 className="text-lg-center">Register</h1>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="name"
          label="Name"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your Name!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <p>
            Already have an account. <a href="/signin">Sign In</a> please!
          </p>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUpPage;
