import React, { useEffect, useState } from "react";
import IProduct from "../interfaces/product";
interface IProps {
  products: IProduct[];
  onRemove: (id: string) => void;
}
const ProductsPage = (props: IProps) => {
  const [products, setProduct] = useState<IProduct[]>([]);
  useEffect(() => {
    setProduct(props.products);
  }, [props]);
  return (
    <div>
      <h1>List Products</h1>
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {products.map((product, index) => {
              return (
                <div className="col mb-5" key={index + 1}>
                  <div className="card h-100">
                    <a href={"/products/" + product._id} className="card-a">
                      <img
                        className="card-img-top"
                        src={product.images}
                        alt="..."
                      />
                    </a>
                    <div className="card-body p-4">
                      <div className="text-center">
                        <h5 className="fw-bolder">{product.name}</h5>
                        <div className="d-flex justify-content-center small text-warning mb-2">
                          <div className="bi-star-fill"></div>
                          <div className="bi-star-fill"></div>
                          <div className="bi-star-fill"></div>
                          <div className="bi-star-fill"></div>
                          <div className="bi-star-fill"></div>
                        </div>
                        $ {product.price}
                        <p>{product.description}</p>
                      </div>
                    </div>
                    <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                      <div className="text-center">
                        <a className="btn btn-outline-dark mt-auto" href="#">
                          Add to cart
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
