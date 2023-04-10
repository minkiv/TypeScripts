import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IProduct from "../interfaces/product";
interface IProps {
  products: IProduct[];
}
const ProductDetail = (props: IProps) => {
  let { id } = useParams();
  // console.log(props.products);
  const currentProduct = props.products.find(
    (product) => product._id === String(id)
  );

  const relatedProducts = currentProduct?.categoryId.products.map((element) => {
    console.log(element);

    const products = props.products.find((product) => product._id == element);

    if (products) return products;
  });
  console.log(relatedProducts);

  return (
    <div>
      <section className="py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="row gx-4 gx-lg-5 align-items-center">
            <div className="col-md-6">
              <img
                className="card-img-top mb-5 mb-md-0"
                src={currentProduct?.images}
                alt="https://dummyimage.com/600x700/dee2e6/6c757d.jpg"
              />
            </div>
            <div className="col-md-6">
              <div className="small mb-1">SKU: BST-498</div>
              <h1 className="display-5 fw-bolder">{currentProduct?.name}</h1>
              <div className="fs-5 mb-5">
                <span className="text-decoration-line-through">$40.00</span>
                <span> $ {currentProduct?.price}</span>
              </div>
              <p className="lead">
                {currentProduct?.description}
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Praesentium at dolorem quidem modi. Nam sequi consequatur
                obcaecati excepturi alias magni, accusamus eius blanditiis
                delectus ipsam minima ea iste laborum vero?
              </p>
              <div className="d-flex">
                <input
                  className="form-control text-center me-3"
                  id="inputQuantity"
                  type="num"
                  defaultValue={1}
                />
                <button
                  className="btn btn-outline-dark flex-shrink-0"
                  type="button"
                >
                  <i className="bi-cart-fill me-1"></i>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-5 bg-light">
        <div className="container px-4 px-lg-5 mt-5">
          <h2 className="fw-bolder mb-4">Related products</h2>
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {relatedProducts?.map((product, index) => {
              return (
                <div className="col mb-5" key={index + 1}>
                  <div className="card h-100">
                    <div className="badge bg-dark text-white position-absolute">
                      Sale
                    </div>
                    <a href={product?._id}>
                      <img
                        className="card-img-top"
                        src={product?.images}
                        alt="..."
                      />
                    </a>
                    <div className="card-body p-4">
                      <div className="text-center">
                        <h5 className="fw-bolder">{product?.name}</h5>
                        <div className="d-flex justify-content-center small text-warning mb-2">
                          <div className="bi-star-fill"></div>
                          <div className="bi-star-fill"></div>
                          <div className="bi-star-fill"></div>
                          <div className="bi-star-fill"></div>
                          <div className="bi-star-fill"></div>
                        </div>
                        <span className="text-muted text-decoration-line-through">
                          $20.00
                        </span>
                        $ {product?.price}
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
export default ProductDetail;
