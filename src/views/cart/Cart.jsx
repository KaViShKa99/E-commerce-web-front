import React, { Component, lazy, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconHeartFill } from "bootstrap-icons/icons/heart-fill.svg";
import { ReactComponent as IconTrash } from "bootstrap-icons/icons/trash.svg";
import { ReactComponent as IconChevronRight } from "bootstrap-icons/icons/chevron-right.svg";
import { ReactComponent as IconChevronLeft } from "bootstrap-icons/icons/chevron-left.svg";
import { ReactComponent as IconTruck } from "bootstrap-icons/icons/truck.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../axios";
import { useDispatch, useSelector } from "react-redux";
import { addCartItemAction } from "../../slices/cartSlice";
import axios from "axios";
const CouponApplyForm = lazy(() =>
  import("../../components/others/CouponApplyForm")
);

const CartView = () => {

  const url = process.env.REACT_APP_BE_URL;
  const { user: currentUser } = useSelector((state) => state.auth);
  const [cartData, setCartData] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();

  const getData = async () => {
    console.log('sdfsd')
    const res = await axios.get(`${url}/user/getcartitems/${currentUser.email}`)

    if (res.status === 201) {
      setCartData(res?.data?.cartDetails)
      dispatch(addCartItemAction(res?.data?.cartDetails))
      setLoading(false)
    }
    console.log(res)
  }

  useEffect(() => {
    getData()

  }, [])


  const getTotalPrice = () => {
    let total = 0;

    if (cartData?.length > 0) {
      cartData?.map((item) => {
        total += (item?.productPrice * item?.quantity)
      });
      setTotalPrice(total)
    } else {
      setTotalPrice(0)
    }
  }

  useEffect(() => {
    getTotalPrice()
    console.log(totalPrice)
  }, [cartData])

  const handleDelete = async (id) => {
    setLoading(true)
    const res = await axiosInstance.post(`${url}/user/deletecartitem`, { email: currentUser.email, id: id })
    if (res.status === 201) {
      console.log(res)
      getData()
    }
  }


  return (
    <React.Fragment>
      <div className="bg-secondary border-top p-4 text-white mb-3">
        <h1 className="display-6">Shopping Cart</h1>
      </div>
      <div className="container mb-3">
        <div className="row">
          <div className="col-md-9">
            <div className="card">
              <div className="table-responsive">
                <table className="table table-borderless">
                  <thead className="text-muted">
                    <tr className="small text-uppercase">
                      <th scope="col">Product</th>
                      <th scope="col" width={120}>
                        Quantity
                      </th>
                      <th scope="col" width={150}>
                        Price
                      </th>
                      <th scope="col" className="text-end" width={130}></th>
                    </tr>
                  </thead>
                  <tbody >
                    {cartData?.map((item) => {
                      return (
                        <tr key={item?.productId}>
                          <td>
                            <div className="row">
                              <div className="col-3 d-none d-md-block">
                                <img
                                  src="../../images/products/tshirt_red_480x400.webp"
                                  width="80"
                                  alt="..."
                                />
                              </div>
                              <div className="col">
                                <Link
                                  to={`/product/detail/${item?.productId}`}
                                  className="text-decoration-none"
                                >
                                  {item?.productName}
                                </Link>
                                <p className="small text-muted">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="input-group input-group-sm mw-140">
                              <div>
                                {item?.quantity}
                              </div>
                            </div>
                          </td>
                          <td>
                            <var className="price">${parseInt(item?.productPrice) * item?.quantity}</var>
                            <small className="d-block text-muted">
                              ${item?.productPrice} each
                            </small>
                          </td>
                          <td className="text-end">
                            {/* <button className="btn btn-sm btn-outline-secondary me-2">
                          <IconHeartFill className="i-va" />
                        </button> */}
                            {!loading &&
                              <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item?.productId)}>
                                <IconTrash className="i-va" />
                              </button>}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>

                </table>
              </div>
              <div className="card-footer">
                {/* <Link to="/checkout" className="btn btn-primary float-end" aria-disabled={true}>
                  Make Purchase <IconChevronRight className="i-va" />
                </Link> */}
                <Link to="/" className="btn btn-secondary">
                  <IconChevronLeft className="i-va" /> Continue shopping
                </Link>
              </div>
            </div>
            <div className="alert alert-success mt-3">
              <p className="m-0">
                <IconTruck className="i-va me-2" /> Free Delivery within 1-2
                weeks
              </p>
            </div>
          </div>
          <div className="col-md-3">
            {/* <div className="card mb-3">
                <div className="card-body">
                  <CouponApplyForm onSubmit={this.onSubmitApplyCouponCode} />
                </div>
              </div> */}
            <div className="card">
              <div className="card-body">
                <dl className="row border-bottom">
                  <dt className="col-6">Total price:</dt>
                  {totalPrice !== 0 &&
                    <dd className="col-6 text-end">${(totalPrice + 58).toFixed(2)}</dd>}

                  {totalPrice !== 0 ? (<>
                    <dt className="col-6 text-success">Discount:</dt>
                    <dd className="col-6 text-success text-end">-$58</dd>
                  </>) : null
                  }
                  {/* <dt className="col-6 text-success">
                      Coupon:{" "}
                      <span className="small text-muted">EXAMPLECODE</span>{" "}
                    </dt>
                    <dd className="col-6 text-success text-end">-$68</dd> */}
                </dl>
                <dl className="row">
                  <dt className="col-6">Total:</dt>
                  <dd className="col-6 text-end  h5">
                    <strong>${totalPrice.toFixed(2)}</strong>
                  </dd>
                </dl>
                <hr />
                <p className="text-center">
                  <img
                    src="../../images/payment/payments.webp"
                    alt="..."
                    height={26}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-light border-top p-4">
        <div className="container">
          <h6>Payment and refund policy</h6>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
    </React.Fragment >
  );
}

export default CartView;
