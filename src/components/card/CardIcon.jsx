import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconTrash } from "bootstrap-icons/icons/trash.svg";
import axiosInstance from "../../axios";
import axios from "axios";
import { useSelector } from "react-redux";

const CardIcon = (props) => {

  const { user: currentUser } = useSelector((state) => state.auth);

  const handleClick = (id) => {
    props.setDeleteId(id)
  }


  return (
    <div className="card">
      {currentUser?.isAdmin === 1 && (
        <button className="btn btn-sm btn-outline-danger" onClick={() => handleClick(props.to)}>
          <IconTrash className="i-va" />
        </button>)}
      <Link to={`product/detail/${props.to}`} className="text-decoration-none">
        <div className="card text-center">

          <div className="card-body">
            {props.children}
            <h6 className="card-title text-capitalize">{props.title}</h6>
            <div className="card-text text-success">{props.text}</div>
            <small className="text-muted">${props.tips}</small>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardIcon;
