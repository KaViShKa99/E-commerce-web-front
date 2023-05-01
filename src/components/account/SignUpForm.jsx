import React, { useEffect, useState } from "react";
import { reduxForm } from "redux-form";
import { compose } from "redux";
import { Link, useNavigate } from "react-router-dom";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import renderFormField from "../../helpers/renderFormField";
import {
  required,
  maxLength20,
  minLength8,
  maxLengthMobileNo,
  minLengthMobileNo,
  digit,
  name,
} from "../../helpers/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { ReactComponent as IconPhone } from "bootstrap-icons/icons/phone.svg";
import { ReactComponent as IconShieldLock } from "bootstrap-icons/icons/shield-lock.svg";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { register } from "../../slices/auth";
import { clearMessage } from "../../slices/message";

const SignUpForm = (props) => {
  const [successful, setSuccessful] = useState(false);
  let navigate = useNavigate();
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    firstname: Yup.string()
      .test(
        "len",
        "The firstname must be between 3 and 20 characters.",
        (val) =>
          val &&
          val.toString().length >= 3 &&
          val.toString().length <= 20
      )
      .required("This field is required!"),
    lastname: Yup.string()
      .test(
        "len",
        "The lastname must be between 3 and 20 characters.",
        (val) =>
          val &&
          val.toString().length >= 3 &&
          val.toString().length <= 20
      )
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val) =>
          val &&
          val.toString().length >= 6 &&
          val.toString().length <= 40
      )
      .required("This field is required!"),
  });

  const handleRegister = (formValue) => {
    const { firstname, lastname, email, password } = formValue;

    setSuccessful(false);

    dispatch(register({ firstname, lastname, email, password }))
      .unwrap()
      .then((res) => {
        if (res.status === 200) {
          setSuccessful(true);
          navigate("/account/signin");
        } else {
          alert('Sign up failed!')
        }
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleRegister}
      >
        <Form>

          <div>
            <div className="form-group">
              <label htmlFor="firstname">First Name</label>
              <Field name="firstname" type="text" className="form-control" />
              <ErrorMessage
                name="firstname"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastname">Last Name</label>
              <Field name="lastname" type="text" className="form-control" />
              <ErrorMessage
                name="lastname"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" className="form-control" />
              <ErrorMessage
                name="email"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field
                name="password"
                type="password"
                className="form-control"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="alert alert-danger"
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block mt-3">Sign Up</button>
            </div>
          </div>
        </Form>
      </Formik>

      <div className="mt-2">
        <Link className="float-start" to="/account/signin" title="Sign In">
          Sign In
        </Link>
        <Link
          className="float-end"
          to="/account/forgotpassword"
          title="Forgot Password"
        >
          Forgot password?
        </Link>
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
      </div>

    </>
  );
};

export default SignUpForm

// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Formik, Field, Form, ErrorMessage } from "formik";
// import * as Yup from "yup";

// import { register } from "../slices/auth";
// import { clearMessage } from "../slices/message";

// const Register = () => {
//   const [successful, setSuccessful] = useState(false);

//   const { message } = useSelector((state) => state.message);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(clearMessage());
//   }, [dispatch]);

//   const initialValues = {
//     username: "",
//     email: "",
//     password: "",
//   };

//   const validationSchema = Yup.object().shape({
//     username: Yup.string()
//       .test(
//         "len",
//         "The username must be between 3 and 20 characters.",
//         (val) =>
//           val &&
//           val.toString().length >= 3 &&
//           val.toString().length <= 20
//       )
//       .required("This field is required!"),
//     email: Yup.string()
//       .email("This is not a valid email.")
//       .required("This field is required!"),
//     password: Yup.string()
//       .test(
//         "len",
//         "The password must be between 6 and 40 characters.",
//         (val) =>
//           val &&
//           val.toString().length >= 6 &&
//           val.toString().length <= 40
//       )
//       .required("This field is required!"),
//   });

//   const handleRegister = (formValue) => {
//     const { username, email, password } = formValue;

//     setSuccessful(false);

//     dispatch(register({ username, email, password }))
//       .unwrap()
//       .then(() => {
//         setSuccessful(true);
//       })
//       .catch(() => {
//         setSuccessful(false);
//       });
//   };

//   return (
//     <div className="col-md-12 signup-form">
//       <div className="card card-container">
//         <img
//           src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
//           alt="profile-img"
//           className="profile-img-card"
//         />
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleRegister}
//         >
//           <Form>
//             {!successful && (
//               <div>
//                 <div className="form-group">
//                   <label htmlFor="username">Username</label>
//                   <Field name="username" type="text" className="form-control" />
//                   <ErrorMessage
//                     name="username"
//                     component="div"
//                     className="alert alert-danger"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="email">Email</label>
//                   <Field name="email" type="email" className="form-control" />
//                   <ErrorMessage
//                     name="email"
//                     component="div"
//                     className="alert alert-danger"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="password">Password</label>
//                   <Field
//                     name="password"
//                     type="password"
//                     className="form-control"
//                   />
//                   <ErrorMessage
//                     name="password"
//                     component="div"
//                     className="alert alert-danger"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
//                 </div>
//               </div>
//             )}
//           </Form>
//         </Formik>
//       </div>

//       {message && (
//         <div className="form-group">
//           <div
//             className={successful ? "alert alert-success" : "alert alert-danger"}
//             role="alert"
//           >
//             {message}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Register;
