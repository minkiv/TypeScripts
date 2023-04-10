import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import ICategory from "../../../interfaces/category";
interface IProps {
  onAdd: (category: ICategory) => void;
}
const AddCategory = (props: IProps) => {
  const onFinish = (values: any) => {
    // console.log("Success:", values);
    props.onAdd(values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="product-ac">
      <h1>Add Category</h1>
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
          label="Category Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input Category Name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCategory;
