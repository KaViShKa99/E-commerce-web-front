import React, { useEffect, useState } from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import renderFormGroupField from "../../helpers/renderFormGroupField";
import renderFormFileInput from "../../helpers/renderFormFileInput";
import {
  required,
  maxLengthMobileNo,
  minLengthMobileNo,
  digit,
  name,
  email,
} from "../../helpers/validation";
import { ReactComponent as IconPerson } from "bootstrap-icons/icons/person.svg";
import { ReactComponent as IconPhone } from "bootstrap-icons/icons/phone.svg";
import { ReactComponent as IconEnvelop } from "bootstrap-icons/icons/envelope.svg";
import { ReactComponent as IconGeoAlt } from "bootstrap-icons/icons/geo-alt.svg";
import { ReactComponent as IconCalendarEvent } from "bootstrap-icons/icons/calendar-event.svg";
import { ReactComponent as IconPersonSquareFill } from "bootstrap-icons/icons/person-lines-fill.svg";
import axiosInstance from "../../axios";
import { useSelector } from "react-redux";

const ProfileForm = (props) => {
  const {
    handleSubmit,
    submitting,
    onSubmit,
    submitFailed,
    onImageChange,
    imagePreview,
  } = props;

  const url = process.env.REACT_APP_BE_URL;
  const [userDetails, setUserDetails] = useState({})
  const { user: currentUser } = useSelector((state) => state.auth);
  console.log(currentUser.email)

  const getData = async () => {
    const res = await axiosInstance.get(`${url}/user/getuserdetails/${currentUser.email}`,)
    console.log(res)
    if (res) {
      setUserDetails(res.data.message[0])
    }
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`needs-validation ${submitFailed ? "was-validated" : ""}`}
      noValidate
    >
      <div className="card border-primary">
        <h6 className="card-header">
          <IconPersonSquareFill /> Profile Detail
        </h6>
        <img
          src={imagePreview ? imagePreview : "../../images/NO_IMG.png"}
          alt=""
          className="card-img-top rounded-0 img-fluid bg-secondary"
        />
        <div className="card-body">
          <Field
            name="formFile"
            component={renderFormFileInput}
            onImageChange={onImageChange}
            validate={[required]}
            tips="You don't allow uploading a photo more than 5MB"
          />
          {/* <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p> */}
        </div>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <Field
              name="firstName"
              type="text"
              component={renderFormGroupField}
              placeholder={userDetails.fname}
              icon={IconPerson}
              validate={[required, name]}
              required={true}
              value={userDetails.fname}
            />
          </li>
          <li className="list-group-item">
            <Field
              name="lastName"
              type="text"
              component={renderFormGroupField}
              placeholder={userDetails.lname}
              icon={IconPerson}
              validate={[required, name]}
              required={true}
              defaultValue={userDetails.lname}
            />
          </li>
          <li className="list-group-item">
            <Field
              name="email"
              type="email"
              component={renderFormGroupField}
              placeholder={userDetails.email}
              icon={IconEnvelop}
              validate={[required, email]}
              required={true}
              defaultValue={userDetails.email}
            />
          </li>
          {/* <li className="list-group-item">
            <Field
              name="location"
              type="text"
              component={renderFormGroupField}
              placeholder="Your location"
              icon={IconGeoAlt}
              validate={[required]}
              required={true}
            />
          </li>
          <li className="list-group-item">
            <Field
              name="dob"
              type="date"
              component={renderFormGroupField}
              placeholder="Your birthdate"
              icon={IconCalendarEvent}
              validate={[required]}
              required={true}
            />
          </li> */}
        </ul>
        <div className="card-body">
          <button
            type="submit"
            className="btn btn-primary  d-flex"
            disabled={true}
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default compose(
  reduxForm({
    form: "profile",
  })
)(ProfileForm);
