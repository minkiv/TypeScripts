// import React from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { useParams } from "react-router-dom";
// import IProduct from "../../interfaces/product";

// interface IFormInput {
//   _id: any;
//   name: string;
//   price: number;
//   images: string;
//   description: string;
//   categoryId: { _id: any; name: string };
// }
// interface IProps {
//   products: IProduct[];
//   onUpdate: (product: IProduct, id: any) => void;
// }
// const UpdateProduct = (props: IProps) => {
//   let { id } = useParams();
//   const { register, handleSubmit } = useForm<IFormInput>();
//   const onHandleSubmit: SubmitHandler<IFormInput> = (data) => {
//     props.onUpdate(data, id);
//   };
//   return (
//     <div className="container">
//       <h1>Update Product</h1>
//       <form onSubmit={handleSubmit(onHandleSubmit)}>
//         <div className="form-group">
//           <label>Product Name</label>
//           <input type="text" className="form-control" {...register("name")} />

//         </div>
//         <div className="form-group">
//           <label>Price</label>
//           <input
//             type="number"
//             className="form-control"
//             {...register("price")}
//           />
//         </div>
//         <div className="form-group">
//           <label>Description</label>
//           <input
//             type="text"
//             className="form-control"
//             {...register("description")}
//           />
//         </div>
//         <div className="form-group">
//           <label>Image</label>
//           <input type="text" className="form-control" {...register("images")} />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateProduct;
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import IProduct from "../../interfaces/product";
import { Button, Form, Input, Select } from "antd";
import ICategory from "../../interfaces/category";
interface IProps {
  products: IProduct[];
  categories: ICategory[];
  onUpdate: (product: IProduct, id: any) => void;
}
const UpdateProduct = (props: IProps) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategory] = useState<ICategory[]>([]);
  const [product, setProduct] = useState<IProduct>();
  useEffect(() => {
    const currentProduct = props.products.find(
      (product: IProduct) => product._id == String(id)
    );

    setProduct(currentProduct);
    setCategory(props.categories);
  }, [props]);
  useEffect(() => {
    setFields();
  }, [product]);
  const [form] = Form.useForm();

  const setFields = () => {
    form.setFieldsValue({
      id: product?._id,
      name: product?.name,
      images: product?.images,
      price: product?.price,
      description: product?.description,
      categoryId: product?.categoryId._id,
    });
  };

  const onFinish = (values: any) => {
    console.log(values);
    const { id, ...other } = values;
    props.onUpdate(other, id);
  };
  return (
    <div className="product-ac">
      <h1 className="text-lg-center">Update Product</h1>
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
          label="Product Name"
          name="name"
          rules={[
            { required: true, message: "Please input your Product Name!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Product Price"
          name="price"
          rules={[
            { required: true, message: "Please input your Product Price!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Product Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please input your Product Description!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="categoryId"
          label="Cagegory"
          rules={[
            {
              required: true,
              message: "Please select category!",
            },
          ]}
        >
          <Select placeholder="Select Category">
            {categories.map((cat, index) => {
              return (
                <Select.Option key={index + 1} value={cat._id}>
                  {cat.name}
                </Select.Option>
                // <Option value="female">Female</Option>
                // <Option value="other">Other</Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Update Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default UpdateProduct;
