import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_BE_URL;

const register = (firstName, lastName, email, password) => {
    return axios.post(API_URL + "/user/signup", {
        fname: firstName,
        lname: lastName,
        email,
        password,
    });
};

const login = (email, password) => {
    return axios
        .post(API_URL + "/user/login", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            } else {
                alert("Error")
            }

            return response?.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};

const authService = {
    register,
    login,
    logout,
};

export default authService;