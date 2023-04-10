import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ICategory from "../../../interfaces/category";
interface IProps {
  categories: ICategory[];
  onRemove: (id: any) => void;
}
const CategoryManagement = (props: IProps) => {
  const navigate = useNavigate();
  const [data, setData] = useState<ICategory[]>([]);
  useEffect(() => {
    setData(props.categories);
  }, [props]);
  const removeProduct = (id: any) => {
    confirm("Bạn chắc chắn muốn xóa?");
    props.onRemove(id);

    navigate("/admin/categories");
  };
  return (
    <div className="container">
      <h1>Categories ManageMent</h1>
      <Link to={"/admin/categories/add"}>
        <button className="btn btn-primary mb-3">Add Category</button>
      </Link>
      <table className="table table-bordered table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((cat, index) => {
            return (
              <tr key={index + 1}>
                <td>{index + 1}</td>
                <td>{cat.name}</td>
                <td>
                  <button
                    onClick={() => removeProduct(cat._id)}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                  <a href={"categories/" + cat._id + "/update"}>
                    <button className="btn btn-primary">Update</button>
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryManagement;
