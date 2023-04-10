import instance from "./instance";
import ICategory from "../src/interfaces/category";

const getAllCategories = () => {
  return instance.get("/categories");
};

const deleteCategory = (id: any) => {
  return instance.delete("/categories/" + id);
};
const addCategory = (category: ICategory) => {
  return instance.post("/categories", category);
};
const updateCategory = (category: ICategory, id: any) => {
  return instance.put("/categories/" + id, category);
};

export { deleteCategory, getAllCategories, addCategory, updateCategory };
