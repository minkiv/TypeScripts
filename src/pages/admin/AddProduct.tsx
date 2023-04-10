// import React from "react";
// import IProduct from "../../interfaces/product";
// import { useForm } from "react-hook-form";
// import { SubmitHandler } from "react-hook-form/dist/types";
// import ICategory from "../../interfaces/category";

// interface IProps {
//   onAdd: (product: IProduct) => void;
//   categories: ICategory[];
// }
// interface IFormInput {
//   _id: any;
//   name: string;
//   price: number;
//   images: string;
//   description: string;
//   categoryId: { _id: any; name: string };
// }
// const AddProduct = (props: IProps) => {
//   const { register, handleSubmit } = useForm<IFormInput>();
//   const onHandleSubmit: SubmitHandler<IFormInput> = (data: IProduct) => {
//     console.log(data);

//     props.onAdd(data);
//   };
//   return (
//     <div className="container">
//       <h1>Add Product</h1>
//       <form onSubmit={handleSubmit(onHandleSubmit)}>
//         <div className="form-group">
//           <label>Product Name</label>
//           <input type="text" className="form-control" {...register("name")} />
//           <small>We'll never share your email with anyone else.</small>
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

// export default AddProduct;
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import IProduct from "../../interfaces/product";
import ICategory from "../../interfaces/category";
import { Button, Form, Input, Modal, Upload, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { RcFile, UploadProps } from "antd/es/upload";
import type { UploadFile } from "antd/es/upload/interface";
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
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
interface IProps {
  onAdd: (product: IProduct) => void;
  categories: ICategory[];
}
const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
const AddProduct = (props: IProps) => {
  const navigate = useNavigate();
  const [categories, setCategory] = useState<ICategory[]>([]);
  useEffect(() => {
    setCategory(props.categories);
    // console.log(categories);
  }, [props.categories]);
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    const newProduct = {
      name: values.name,
      price: values.price,
      description: values.description,
      categoryId: values.categoryId,
      // image: values.image.file.name,
    };
    console.log(values);

    // console.log(values.image.file.name);
    console.log(newProduct);

    props.onAdd(values);
    navigate("/admin/products");
  };
  // upload image
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf("/") + 1)
    );
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  // setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  return (
    <div className="product-ac">
      <h1 className="text-lg-center">Add Product</h1>
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
          name="name"
          label="Product Name"
          rules={[
            {
              required: true,
              message: "Please input Product Name!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="Product Price"
          rules={[
            {
              required: true,
              message: "Please input Product Price!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Product Description"
          rules={[
            {
              required: true,
              message: "Please input Product Description!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Product Image"
          name="image"
          // rules={[{ required: true, message: "Please select image!" }]}
        >
          <Upload
            // action="http://localhost:3000/products"
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          {/* <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                    </Modal> */}
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
            <Select.Option key={0}>
              <Link className="link" to="/admin/products/add">
                Thêm danh mục
              </Link>
            </Select.Option>
          </Select>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default AddProduct;
