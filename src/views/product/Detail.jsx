import React, { Component, lazy, useEffect, useState } from "react";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartPlus,
  faHeart,
  faShoppingCart,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { data } from "../../data";
import axiosInstance from "../../axios";
import { useNavigate, useParams, withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";
const CardFeaturedProduct = lazy(() =>
  import("../../components/card/CardFeaturedProduct")
);
const CardServices = lazy(() => import("../../components/card/CardServices"));
const Details = lazy(() => import("../../components/others/Details"));
const RatingsReviews = lazy(() =>
  import("../../components/others/RatingsReviews")
);
const QuestionAnswer = lazy(() =>
  import("../../components/others/QuestionAnswer")
);
const ShippingReturns = lazy(() =>
  import("../../components/others/ShippingReturns")
);
const SizeChart = lazy(() => import("../../components/others/SizeChart"));


const ProductDetailView = () => {

  const url = process.env.REACT_APP_BE_URL;
  const [product, setProduct] = useState()
  const [count, setCount] = useState(1)
  const productId = useParams();
  const { user: currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await axiosInstance.get(`${url}/user/getproductdetails/${productId.id}`);
      setProduct(res.data.userDetails[0])

    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    getData()
  }, [])

  const handleCount = (type) => {
    if (type === "increment") {
      setCount(count + 1)
    } else {
      if (count === 1) return
      setCount(count - 1)
    }

  }

  const handleAddToCart = async () => {
    if (currentUser) {
      try {
        const res = await axiosInstance.post(`${url}/user/addtocart`, {
          productId: productId.id,
          productName: product.name,
          productPrice: product.price,
          productCategory: product.category,
          quantity: count,
          userEmail: currentUser.email,
          description: product.description

        })
        if (res) {
          alert("Product added to cart succesfully")
          navigate("/")
        }
      } catch (err) {
        console.log(err)
      }
    } else {
      alert("Please login first")
    }
  }

  return (
    <div className="container-fluid mt-3 " style={{ height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
      <div className="row d-flex justify-content-center">
        <div className="col-md-8" >
          <div className="row mb-3">
            <div className="col-md-5 text-center">
              <img
                src="../../images/products/tshirt_red_480x400.webp"
                className="img-fluid mb-3"
                alt=""
              />
              <img
                src="../../images/products/tshirt_grey_480x400.webp"
                className="border border-secondary me-2" width="75"
                alt="..."
              />
              <img
                src="../../images/products/tshirt_black_480x400.webp"
                className="border border-secondary me-2" width="75"
                alt="..."
              />
              <img
                src="../../images/products/tshirt_green_480x400.webp"
                className="border border-secondary me-2" width="75"
                alt="..."
              />
            </div>
            <div className="col-md-7">
              <h1 className="h5 d-inline me-2">
                {product?.name}
              </h1>
              <span className="badge bg-success me-2">New</span>
              <span className="badge bg-danger me-2">Hot</span>
              <div className="mb-3">
                <IconStarFill className="text-warning me-1" />
                <IconStarFill className="text-warning me-1" />
                <IconStarFill className="text-warning me-1" />
                <IconStarFill className="text-warning me-1" />
                <IconStarFill className="text-secondary me-1" />|{" "}
                <span className="text-muted small">
                  42 ratings and 4 reviews
                </span>
              </div>
              <dl className="row small mb-3">
                <dt className="col-sm-3">Availability</dt>
                <dd className="col-sm-9">In stock</dd>
                <dt className="col-sm-3">Sold by</dt>
                <dd className="col-sm-9">Authorised Store</dd>
                <dt className="col-sm-3">Category</dt>
                <dd className="col-sm-9">{product?.category}</dd>

              </dl>

              <div className="mb-3">
                <span className="fw-bold h5 me-2">${parseInt(product?.price)}</span>
                <del className="small text-muted me-2">${parseInt(product?.price) + 100}</del>
                <span className="rounded p-1 bg-warning  me-2 small">
                  -$100
                </span>
              </div>
              <div className="mb-3">
                <div className="d-inline float-start me-2">
                  <div className="input-group input-group-sm mw-140">
                    <button
                      className="btn btn-primary text-white"
                      type="button"
                      onClick={() => handleCount("decrement")}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                    <div style={{ width: "50px", textAlign: 'center', verticalAlign: "center", padding: 'auto', border: "1px black solid" }}>
                      {count}
                    </div>
                    <button
                      className="btn btn-primary text-white"
                      type="button"
                      onClick={() => handleCount("increment")}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-sm btn-primary me-2"
                  title="Add to cart"
                  onClick={handleAddToCart}
                >
                  <FontAwesomeIcon icon={faCartPlus} /> Add to cart
                </button>
                {/* <button
                  type="button"
                  className="btn btn-sm btn-warning me-2"
                  title="Buy now"
                >
                  <FontAwesomeIcon icon={faShoppingCart} /> Buy now
                </button> */}
                {/* <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  title="Add to wishlist"
                >
                  <FontAwesomeIcon icon={faHeart} />
                </button> */}
              </div>
              <div>
                <p className="fw-bold mb-2 small">
                  Product Highlights
                </p>
                <ul className="small">
                  <li>
                    {product?.description}
                  </li>

                </ul>
              </div>
            </div>
          </div>
          {/* <div className="row">
              <div className="col-md-12">
                <nav>
                  <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a
                      className="nav-link active"
                      id="nav-details-tab"
                      data-bs-toggle="tab"
                      href="#nav-details"
                      role="tab"
                      aria-controls="nav-details"
                      aria-selected="true"
                    >
                      Details
                    </a>
                    <a
                      className="nav-link"
                      id="nav-randr-tab"
                      data-bs-toggle="tab"
                      href="#nav-randr"
                      role="tab"
                      aria-controls="nav-randr"
                      aria-selected="false"
                    >
                      Ratings & Reviews
                    </a>
                    <a
                      className="nav-link"
                      id="nav-faq-tab"
                      data-bs-toggle="tab"
                      href="#nav-faq"
                      role="tab"
                      aria-controls="nav-faq"
                      aria-selected="false"
                    >
                      Questions and Answers
                    </a>
                    <a
                      className="nav-link"
                      id="nav-ship-returns-tab"
                      data-bs-toggle="tab"
                      href="#nav-ship-returns"
                      role="tab"
                      aria-controls="nav-ship-returns"
                      aria-selected="false"
                    >
                      Shipping & Returns
                    </a>
                    <a
                      className="nav-link"
                      id="nav-size-chart-tab"
                      data-bs-toggle="tab"
                      href="#nav-size-chart"
                      role="tab"
                      aria-controls="nav-size-chart"
                      aria-selected="false"
                    >
                      Size Chart
                    </a>
                  </div>
                </nav>
                <div className="tab-content p-3 small" id="nav-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="nav-details"
                    role="tabpanel"
                    aria-labelledby="nav-details-tab"
                  >
                    <Details />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-randr"
                    role="tabpanel"
                    aria-labelledby="nav-randr-tab"
                  >
                    {Array.from({ length: 5 }, (_, key) => (
                      <RatingsReviews key={key} />
                    ))}
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-faq"
                    role="tabpanel"
                    aria-labelledby="nav-faq-tab"
                  >
                    <dl>
                      {Array.from({ length: 5 }, (_, key) => (
                        <QuestionAnswer key={key} />
                      ))}
                    </dl>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-ship-returns"
                    role="tabpanel"
                    aria-labelledby="nav-ship-returns-tab"
                  >
                    <ShippingReturns />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="nav-size-chart"
                    role="tabpanel"
                    aria-labelledby="nav-size-chart-tab"
                  >
                    <SizeChart />
                  </div>
                </div>
              </div>
            </div> */}
        </div>
        {/* <div className="col-md-4">
            <CardFeaturedProduct data={data.products} />
            <CardServices />
          </div> */}
      </div>
    </div>
  );
}


export default ProductDetailView;
