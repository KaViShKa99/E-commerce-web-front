import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import { ReactComponent as IconCart3 } from "bootstrap-icons/icons/cart3.svg";
import { ReactComponent as IconPersonBadgeFill } from "bootstrap-icons/icons/person-badge-fill.svg";
import { ReactComponent as IconStarFill } from "bootstrap-icons/icons/star-fill.svg";
import { ReactComponent as IconListCheck } from "bootstrap-icons/icons/list-check.svg";
import { ReactComponent as IconDoorClosedFill } from "bootstrap-icons/icons/door-closed-fill.svg";
import { ReactComponent as IconHeartFill } from "bootstrap-icons/icons/heart-fill.svg";
import { ReactComponent as IconBellFill } from "bootstrap-icons/icons/bell-fill.svg";
import { ReactComponent as IconInfoCircleFill } from "bootstrap-icons/icons/info-circle-fill.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/auth";
import axiosInstance from "../axios";
import { cartSelector } from "../slices/cartSlice";

const Header = () => {
  const url = process.env.REACT_APP_BE_URL;
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const [cartData, setCartData] = useState([])
  const { cartItems } = useSelector(cartSelector)

  const getData = async () => {
    const res = await axiosInstance.get(`${url}/user/getcartitems/${currentUser.email}`)

    if (res.status === 201) {
      setCartData(res?.data?.cartDetails)
    }
  }

  useEffect(() => {
    getData()
  }, [])


  const logOut = useCallback(() => {
    dispatch(logout());
    navigate("/account/signin")

  }, [dispatch]);

  useEffect(() => {
    setCartData(cartItems)
  }, [cartItems])


  return (
    <React.Fragment>
      <header className="p-3 border-bottom bg-light">
        <div className="container-fluid">
          <div className="row g-3">
            <div className="col-md-6 text-center">
              <Link to="/" style={{ textDecoration: 'none' }}>
                <h1 style={{ textDecoration: 'none', fontWeight: 'bold' }}>E-Commerce Shop</h1>
              </Link>
            </div>
            {/* <div className="col-md-5">
              <Search />
            </div> */}
            <div className="col-md-6">
              <div className="position-relative d-inline me-3">
                <Link to="/cart" className="btn btn-primary">
                  <IconCart3 className="i-va" />
                  {currentUser &&
                    <div className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-circle">
                      {cartData?.length}
                    </div>}
                </Link>
              </div>
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-secondary rounded-circle border me-3"
                  aria-expanded="false"
                  aria-label="Profile"
                  data-bs-toggle="dropdown"
                  onClick={() => navigate("/account/profile")}
                >
                  <FontAwesomeIcon icon={faUser} className="text-light" />
                </button>
                {/* <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/account/profile">
                      <IconPersonBadgeFill /> My Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/star/zone">
                      <IconStarFill className="text-warning" /> Star Zone
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/account/orders">
                      <IconListCheck className="text-primary" /> Orders
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/account/wishlist">
                      <IconHeartFill className="text-danger" /> Wishlist
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/account/notification">
                      <IconBellFill className="text-primary" /> Notification
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/support">
                      <IconInfoCircleFill className="text-success" /> Support
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li style={{ cursor: "pointer" }}>
                    <div onClick={logOut} className="m-3">
                      <IconDoorClosedFill className="text-danger" /> Logout
                    </div>
                  </li>
                </ul> */}
              </div>
              {/* <a
                href="https://www.buymeacoffee.com/bhaumik"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
                  alt="BuyMeACoffee" width="120"
                />
              </a> */}
              {currentUser ? (<button onClick={logOut} style={{ background: 'lightblue', borderRadius: '6px' }}>
                Log out
              </button>) : (
                <>
                  <button onClick={() => navigate("/account/signin")} style={{ background: 'lightblue', borderRadius: '6px', marginRight: '10px', width: '100px' }}>
                    Log In
                  </button>
                  <button onClick={() => navigate("/account/signup")} style={{ background: 'lightblue', borderRadius: '6px', marginLeft: '10px', width: '100px' }}>
                    Sign Up
                  </button>
                </>)}
            </div>
          </div>
        </div>
      </header>
    </React.Fragment >
  );
};
export default Header;
