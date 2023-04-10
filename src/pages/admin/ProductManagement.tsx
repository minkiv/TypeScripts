import React, { useRef, useState } from "react";
import IProduct from "../../interfaces/product";
import { SearchOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import type { InputRef } from "antd";
import { Button, Input, Space, Table, Popconfirm } from "antd";
import type { ColumnsType, ColumnType } from "antd/es/table";
import type { FilterConfirmProps } from "antd/es/table/interface";
import Highlighter from "react-highlight-words";

interface IProps {
  products: IProduct[];
  onRemove: (id: any) => void;
}
interface DataType {
  key: string | number;
  categoryName: string;
  _id: any;
  name: string;
  price: number;
  images: string;
  description: string;
  categoryId: { _id: any; name: string; products: [string] };
}

type DataIndex = keyof DataType;
const ProductManagement = (props: IProps) => {
  const data: DataType[] = props.products.map((item: IProduct) => {
    return {
      key: item._id,
      categoryName: item.categoryId?.name,
      ...item,
    };
  });
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const handleDelete = (id: any) => {
    props.onRemove(id);
  };
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "15%",
      ...getColumnSearchProps("name"),
      sorter: (a, b) => a.description.length - b.description.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Image",
      dataIndex: "images",
      key: "images",
      width: "22%",
      render: (imgLink) => <img src={imgLink} alt="" />,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: "15%",
      ...getColumnSearchProps("price"),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ...getColumnSearchProps("description"),
      sorter: (a, b) => a.description.length - b.description.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
      width: "15%",
      ...getColumnSearchProps("categoryName"),
    },
    {
      title: "Action",
      dataIndex: "operation",
      render: (_, record: { _id: React.Key }) =>
        data.length >= 1 ? (
          <div>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record._id)}
            >
              <a>
                <button className="btn btn-danger">Delete</button>
              </a>
            </Popconfirm>
            <button className="btn btn-primary">
              <a href={"products/" + record._id + "/update"}>Update</a>
            </button>
          </div>
        ) : null,
    },
  ];

  return (
    <div className="container">
      <h1>Product ManageMent</h1>
      <Link to={"/admin/products/add"}>
        <button className="btn btn-primary mb-3">Add Product</button>
      </Link>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </div>
  );
};

export default ProductManagement;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import IProduct from "../../interfaces/product";

// interface IProps {
//   products: IProduct[];
//   onRemove: (id: any) => void;
// }
// const ProductManagement = (props: IProps) => {
//   // console.log(props.products);

//   const [data, setData] = useState<IProduct[]>([]);
//   useEffect(() => {
//     setData(props.products);
//   }, [props]);
//   const removeProduct = (id: any) => {
//     props.onRemove(id);
//   };
//   // const updateProduct = (id) => {
//   //   props.onUpdate(id);
//   // };
//   return (
//     <div className="container">
//       <h1>Product ManageMent</h1>
//       <Link to={"/admin/products/add"}>
//         <button className="btn btn-primary">Add Product</button>
//       </Link>
//       <table className="table table-bordered table-hover">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Image</th>
//             <th>Price</th>
//             <th>Description</th>
//             <th>Category</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((pro, index) => {
//             return (
//               <tr key={index + 1}>
//                 <td>{index + 1}</td>
//                 <td>{pro.name}</td>
//                 <td>
//                   <img src={pro.images} alt="" />
//                 </td>
//                 <td>{pro.price}</td>
//                 <td>{pro.description}</td>
//                 <td>{pro.categoryId?.name}</td>
//                 <td>
//                   <button
//                     onClick={() => removeProduct(pro._id)}
//                     className="btn btn-danger"
//                   >
//                     Remove
//                   </button>
//                   <a href={"products/" + pro._id + "/update"}>
//                     <button className="btn btn-primary">Update</button>
//                   </a>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ProductManagement;
