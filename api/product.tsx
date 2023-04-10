import instance from "./instance";
import IProduct from "../src/interfaces/product";
import axios from "axios";

const getAll = () => {
  return instance.get("/products");
};

const deleteProduct = async (id: string) => {
  try {
    const response = await instance.delete("/products/" + id);
    return response;
  } catch (error) {
    console.log(error);
  }
};
const addProduct = (product: IProduct) => {
  console.log("🚀 ~ file: product.tsx:17 ~ addProduct ~ product:", product);
  return instance.post("/products", product);
};

const updateProduct = async (product: IProduct, id: any) => {
  console.log("🚀 ~ file: product.tsx:23 ~ updateProduct ~ product:", product);
  try {
    const res = await instance.put("/products/" + id, product);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export { deleteProduct, getAll, addProduct, updateProduct };
