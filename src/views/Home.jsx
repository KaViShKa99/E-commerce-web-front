import React, { lazy, Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { link45, file, check2all } from "../npm/icon";
import { data } from "../data";
import { ReactComponent as IconLaptop } from "bootstrap-icons/icons/laptop.svg";
import { ReactComponent as IconHeadset } from "bootstrap-icons/icons/headset.svg";
import { ReactComponent as IconPhone } from "bootstrap-icons/icons/phone.svg";
import { ReactComponent as IconTv } from "bootstrap-icons/icons/tv.svg";
import { ReactComponent as IconDisplay } from "bootstrap-icons/icons/display.svg";
import { ReactComponent as IconHdd } from "bootstrap-icons/icons/hdd.svg";
import { ReactComponent as IconUpcScan } from "bootstrap-icons/icons/upc-scan.svg";
import { ReactComponent as IconTools } from "bootstrap-icons/icons/tools.svg";
import axiosInstance from "../axios";
import { useDispatch, useSelector } from "react-redux";
import { addProductsAction, productSelector } from "../slices/productSlice";
import axios from "axios";
import { Dropdown } from "react-bootstrap";

const Support = lazy(() => import("../components/Support"));
const Banner = lazy(() => import("../components/carousel/Banner"));
const Carousel = lazy(() => import("../components/carousel/Carousel"));
const CardIcon = lazy(() => import("../components/card/CardIcon"));
const CardLogin = lazy(() => import("../components/card/CardLogin"));
const CardImage = lazy(() => import("../components/card/CardImage"));
const CardDealsOfTheDay = lazy(() =>
  import("../components/card/CardDealsOfTheDay")
);


const HomeView = () => {
  let components = {
    IconLaptop: IconLaptop,
    IconHeadset: IconHeadset,
    IconPhone: IconPhone,
    IconTv: IconTv,
    IconDisplay: IconDisplay,
    IconHdd: IconHdd,
    IconUpcScan: IconUpcScan,
    IconTools: IconTools,
  };

  const url = process.env.REACT_APP_BE_URL;
  const [products, setProducts] = useState([])
  const dispatch = useDispatch();
  const { filterdProducts } = useSelector((state) => state.product);
  const [sort, setSort] = useState([])
  const [category, setCategory] = useState("")
  const { user: currentUser } = useSelector((state) => state.auth);
  const [deleteId, setDeleteId] = useState(null)



  const getData = async () => {
    try {
      const res = await axios.get(`${url}/user/getallproducts`);
      if (res.status === 201) {
        setProducts(res?.data?.productList)
      }
    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    if (products.length > 0) {
      dispatch(addProductsAction(products));
    }
  }, [products])


  useEffect(() => {
    getData()
  }, [])


  const iconProducts = data.iconProducts
  const rows = [...Array(Math.ceil(iconProducts.length / 4))];
  // chunk the products into the array of rows
  const productRows = rows.map((row, idx) =>
    iconProducts.slice(idx * 4, idx * 4 + 4)
  );
  // map the rows as div.row
  const carouselContent = productRows.map((row, idx) => (
    <div className="row g-3">
      {products?.map((product, idx) => {
        const ProductImage = components["IconLaptop"];
        return (
          <div key={product.id} className="col-lg-3 col-sm-6">
            <CardIcon
              title={product.name}
              text={product.description}
              tips={product.price}
              to={product.id}
              setDeleteId={setDeleteId}
            >
              <ProductImage width="80" height="80" />
            </CardIcon>
          </div>
        );
      })}
    </div>
  ));




  const handleSort = (Category) => {
    if (Category === "All Products") {
      setSort([])
      setCategory(Category)
    } else {
      let sortedList = products.filter((item) => item.category === Category)
      setSort(sortedList)
      setCategory(Category)
    }
  }

  const sortContent = productRows.map((row, idx) => (
    <div className="row g-3">
      {sort?.map((product, idx) => {
        const ProductImage = components["IconLaptop"];
        return (
          <div key={product.id} className="col-lg-3 col-sm-6">
            <CardIcon
              title={product.name}
              text={product.description}
              tips={product.price}
              to={product.id}
              setDeleteId={setDeleteId}
            >
              <ProductImage width="80" height="80" />
            </CardIcon>
          </div>
        );
      })}
    </div>
  ));

  const handleDelete = async () => {
    const res = await axiosInstance.post(`${url}/admin/deleteproductitem`, { id: deleteId })
    if (res.status === 201) {
      getData()
    }
  }

  useEffect(() => {
    if (deleteId) {
      handleDelete()
    }
  }, [deleteId])



  return (
    <React.Fragment>
      <Banner className="mb-3" id="carouselHomeBanner" data={data.banner} />
      <div className="container-fluid bg-light mb-3">
        <div className="row g-3">
          <div className="col-md-">
            {currentUser?.isAdmin === 1 && (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div style={{ marginRight: '20px', marginBottom: '20px' }}>
                  <h4>
                    Sort By Category
                  </h4>
                </div>
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Category
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#action-8" onClick={() => handleSort("All Products")}>All Products</Dropdown.Item>
                    <Dropdown.Item href="#action-1" onClick={() => handleSort('Accessories')} >Accessories</Dropdown.Item>
                    <Dropdown.Item href="#action-2" onClick={() => handleSort('Home')}>Home</Dropdown.Item>
                    <Dropdown.Item href="#action-3" onClick={() => handleSort('Computer')}>Computer</Dropdown.Item>
                    <Dropdown.Item href="#action-4" onClick={() => handleSort('Games')}>Games</Dropdown.Item>
                    <Dropdown.Item href="#action-5" onClick={() => handleSort('Electronics')}>Electronics</Dropdown.Item>
                    <Dropdown.Item href="#action-6" onClick={() => handleSort('Phone')}>Phone</Dropdown.Item>
                    <Dropdown.Item href="#action-7" onClick={() => handleSort('Health')}>Health</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <div style={{ marginLeft: '20px' }}>
                  <h4>
                    {category}
                  </h4>
                </div>
              </div>)}

            <Carousel id="elect-product-category" className="mb-3">
              {sort.length > 0 ? sortContent : carouselContent}
            </Carousel>
            {/* <Support /> */}
          </div>
          {/* <div className="col-md-3">
              <CardLogin className="mb-3" />
              <CardImage src="../../images/banner/Watches.webp" to="promo" />
            </div> */}
        </div>
      </div>
      {/* <div className="container-fluid bg-light mb-3">
          <div className="row">
            <div className="col-md-12">
              <CardDealsOfTheDay
                endDate={Date.now() + 1000 * 60 * 60 * 14}
                title="Deals of the Day"
                to="/"
              >
                <Carousel id="elect-product-category1">
                  {carouselContent}
                </Carousel>
              </CardDealsOfTheDay>
            </div>
          </div>
        </div> */}

      {/* <div className="bg-info bg-gradient p-3 text-center mb-3">
          <h4 className="m-0">Explore Fashion Collection</h4>
        </div> */}
      {/* <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Link to="/" className="text-decoration-none">
                <img
                  src="../../images/category/male.webp"
                  className="img-fluid rounded-circle"
                  alt="..."
                />
                <div className="text-center h6">Men's Clothing</div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/" className="text-decoration-none">
                <img
                  src="../../images/category/female.webp"
                  className="img-fluid rounded-circle"
                  alt="..."
                />
                <div className="text-center h6">Women's Clothing</div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/" className="text-decoration-none">
                <img
                  src="../../images/category/smartwatch.webp"
                  className="img-fluid rounded-circle"
                  alt="..."
                />
                <div className="text-center h6">Smartwatch</div>
              </Link>
            </div>
            <div className="col-md-3">
              <Link to="/" className="text-decoration-none">
                <img
                  src="../../images/category/footwear.webp"
                  className="img-fluid rounded-circle"
                  alt="..."
                />
                <div className="text-center h6">Footwear</div>
              </Link>
            </div>
          </div>
        </div> */}
    </React.Fragment>
  );
}

export default HomeView;
