import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { login } from "../../slices/auth";
import { clearMessage } from "../../slices/message";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";


const SignInForm = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
  });

  const handleLogin = (formValue) => {
    const { email, password } = formValue;
    setLoading(true);

    dispatch(login({ email, password }))
      .unwrap()
      .then((res) => {
        if (res?.user?.status === 200) {
          navigate("/");
        } else {
          alert("Login failed!")
        }
      })
      .catch(() => {
        alert("Login failed!")
        setLoading(false);
      });
  };


  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        <Form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field name="email" type="text" className="form-control" />
            <ErrorMessage
              name="email"
              component="div"
              className="alert alert-danger"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" className="form-control" />
            <ErrorMessage
              name="password"
              component="div"
              className="alert alert-danger"
            />
          </div>

          <div className="form-group mt-3">
            <button type="submit" className="btn btn-primary btn-block">
              Log in
            </button>
          </div>
        </Form>
      </Formik>
      <Link className="float-start mt-2" to="/account/signup" title="Sign Up">
        Create your account
      </Link>
      {/* <Link
        className="float-end"
        to="/account/forgotpassword"
        title="Forgot Password"
      >
        Forgot password?
      </Link> */}
      <div className="clearfix"></div>
      <hr></hr>
      <div className="row">
        <div className="col- text-center">
          <p className="text-muted small">Or you can join with</p>
        </div>
        <div className="col- text-center">
          <Link to="/" className="btn btn-light text-white bg-twitter me-3">
            <FontAwesomeIcon icon={faTwitter} />
          </Link>
          <Link to="/" className="btn btn-light text-white me-3 bg-facebook">
            <FontAwesomeIcon icon={faFacebookF} className="mx-1" />
          </Link>
          <Link to="/" className="btn btn-light text-white me-3 bg-google">
            <FontAwesomeIcon icon={faGoogle} className="mx-1" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignInForm;


