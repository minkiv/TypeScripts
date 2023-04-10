import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form, Input } from "antd";
import ICategory from "../../../interfaces/category";

interface IProps {
  categories: ICategory[];
  onUpdate: (category: ICategory, id: any) => void;
}
const UpdateCategory = (props: IProps) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState<ICategory>();
  useEffect(() => {
    const currentCategory = props.categories.find(
      (category: ICategory) => category._id == String(id)
    );
    console.log(currentCategory);

    setCategory(currentCategory);
  }, [props]);
  useEffect(() => {
    setFields();
  }, [category]);
  const [form] = Form.useForm();

  const setFields = () => {
    form.setFieldsValue({
      id: category?._id,
      name: category?.name,
    });
  };

  const onFinish = (values: any) => {
    console.log(values);

    props.onUpdate(values, id);
    navigate("/admin/categories");
  };
  return (
    <div className="product-ac">
      <h1>Update Category</h1>
      <Form form={form} style={{ maxWidth: 600 }} onFinish={onFinish}>
        <Form.Item
          label=""
          name="id"
          style={{ display: "none" }}
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Category Name"
          name="name"
          rules={[
            { required: true, message: "Please input your Product Name!" },
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
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateCategory;
