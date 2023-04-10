import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  deleteProduct,
  getAll,
  addProduct,
  updateProduct,
  // addProduct1,
} from "../api/product";
import {
  deleteCategory,
  getAllCategories,
  addCategory,
  updateCategory,
} from "../api/category";
import { addUser, signIn } from "../api/user";
import IProduct from "./interfaces/product";
import IUser from "./interfaces/user";
import AddProduct from "./pages/admin/AddProduct";
import DashBoard from "./pages/admin/DashBoard";
import ProductManagement from "./pages/admin/ProductManagement";
import HomePage from "./pages/HomePage";
import AdminLayout from "./pages/Layouts/AdminLayout";
import WebsiteLayout from "./pages/Layouts/WebsiteLayout";
import ProductDetail from "./pages/ProductDetail";
import ProductsPage from "./pages/ProductsPage";
import SignIn from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import ICategory from "./interfaces/category";
import CategoryManagement from "./pages/admin/categories/CategoryManagement";
import AddCategory from "./pages/admin/categories/AddCategory";
import UpdateCategory from "./pages/admin/categories/UpdateCategory";
import UpdateProduct from "./pages/admin/UpdateProduct";

function App() {
  const navigate = useNavigate();
  const [products, setProduct] = useState<IProduct[]>([]);
  const [categories, setCategory] = useState<ICategory[]>([]);
  useEffect(() => {
    getAll().then(({ data }) => setProduct(data));
    getAllCategories().then(({ data }) => setCategory(data));
    // console.log(categories);
  }, []);
  const onHandleRemove = async (id: any) => {
    try {
      const response = await deleteProduct(id);
      setCategory(categories.filter((category) => category._id !== id));
      response?.statusText == "Unauthorized"
        ? alert("Bạn không có quyền để thực hiện hành động này")
        : response?.statusText == "OK"
        ? alert("Xóa sản phẩm thành công")
        : alert(response?.statusText);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const onHandleAdd = async (product: IProduct) => {
    await addProduct(product)
      .then(({ data }) => alert(data.message))
      .then(() => setProduct([...products, product]))
      .catch(({ response }) => {
        console.log(response.statusText);
        response.statusText == "Unauthorized"
          ? alert("Bạn không có quyền để thực hiện hành động này")
          : alert(response.statusText);
      });
    // try {
    //   const response = await addProduct1(product);
    //   console.log("🚀 ~ file: App.tsx:64 ~ onHandleAdd ~ response:", response);
    //   if (response && response.data) {
    //     setProduct([...products, product]);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  };
  const onHandleUpdate = async (product: IProduct, id: any) => {
    console.log(product);
    await updateProduct(product, id)
      .then((data) => {
        console.log(data);
        setProduct(
          products.map((items) => (items._id == id ? product : items))
        );
        alert("Cập nhật sản phẩm thành công");
      })
      .catch(({ response }) => {
        console.log(response.statusText);
        response.statusText == "Unauthorized"
          ? alert("Bạn không có quyền để thực hiện hành động này")
          : alert(response.statusText);
      });
    navigate("/admin/products");
  };
  // User
  const onAddUser = (user: IUser) => {
    addUser(user)
      .then(({ data }) => {
        console.log(data);
        localStorage.setItem("accessToken", data.accessToken);
        alert(data.message);
        if (data.user.role == "admin") {
          navigate("/admin/products");
        } else navigate("/products");
      })
      .catch(({ response }) => {
        alert(response.data.message);
      });
    // navigate("/products");
  };
  const onSignIn = (user: IUser) => {
    console.log(user);
    signIn(user)
      .then(({ data }) => {
        // console.log(data.user);
        localStorage.setItem("accessToken", data.accessToken);
        alert(data.message);
        if (data.user.role == "admin") {
          navigate("/admin/products");
        } else navigate("/products");
      })
      .catch(({ response }) => {
        alert(response.data.message);
      });
  };
  // Category
  const onHandleAddCat = (category: ICategory) => {
    console.log(category);
    addCategory(category)
      .then(({ data }) => alert(data.message))
      .then(() => setCategory([...categories, category]));
    navigate("/admin/categories");
  };

  const onRemoveCat = (id: any) => {
    deleteCategory(id)
      .then(() =>
        setCategory(categories.filter((category) => category._id !== id))
      )
      .catch(({ response }) => {
        console.log(response.statusText);
        response.statusText == "Unauthorized"
          ? alert("Bạn không có quyền để thực hiện hành động này")
          : alert(response.statusText);
      });
  };
  const onHandleUpdateCat = (category: ICategory, id: any) => {
    updateCategory(category, id)
      .then(() => {
        setCategory(
          categories.map((items) => (items._id == id ? category : items))
        );
        alert("Cập nhật danh mục sản phẩm thành công");
      })
      .catch(({ response }) => {
        console.log(response.statusText);
        response.statusText == "Unauthorized"
          ? alert("Bạn không có quyền để thực hiện hành động này")
          : alert(response.statusText);
      });
    navigate("/admin/categories");
  };
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<WebsiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="products">
            <Route
              index
              element={
                <ProductsPage products={products} onRemove={onHandleRemove} />
              }
            />
            <Route path=":id" element={<ProductDetail products={products} />} />
          </Route>
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashBoard />} />
          <Route path="products">
            <Route
              index
              element={
                <ProductManagement
                  products={products}
                  onRemove={onHandleRemove}
                />
              }
            />
            <Route
              path="add"
              element={
                <AddProduct onAdd={onHandleAdd} categories={categories} />
              }
            />
            <Route
              path=":id/update"
              element={
                <UpdateProduct
                  products={products}
                  categories={categories}
                  onUpdate={onHandleUpdate}
                />
              }
            />
          </Route>
          <Route path="categories">
            <Route
              index
              element={
                <CategoryManagement
                  categories={categories}
                  onRemove={onRemoveCat}
                />
              }
            />
            <Route
              path="add"
              element={<AddCategory onAdd={onHandleAddCat} />}
            />
            <Route
              path=":id/update"
              element={
                <UpdateCategory
                  categories={categories}
                  onUpdate={onHandleUpdateCat}
                />
              }
            />
          </Route>
        </Route>
        <Route path="/signup" element={<SignUpPage addUser={onAddUser} />} />
        <Route path="/signin" element={<SignIn signIn={onSignIn} />} />
      </Routes>
    </div>
  );
}

export default App;
