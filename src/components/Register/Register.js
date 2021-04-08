import React, { useEffect, useState } from "react";
import "./Register.css";
import { Link, useHistory } from "react-router-dom";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import LockRoundedIcon from "@material-ui/icons/LockRounded";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import CallRoundedIcon from "@material-ui/icons/CallRounded";
import axios from "axios";

function Register() {
  const history = useHistory();

  const [user, setUser] = useState({
    email: "",
    first_name: "",
    last_name: "",
    mobile: "",
    password: "",
    password2: "",
  });

  const [passwordError, setPasswordError] = useState(null);
  const [password2Error, setPassword2Error] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [mobileError, setMobileError] = useState(null);

  useEffect(() => {
    document.title = "Sign Up | Nemesis";
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }, []);

  const register = (e) => {
    if (!emailError && !mobileError && !passwordError && !password2Error) {
      if (
        user.mobile &&
        user.password &&
        user.email &&
        user.password2 &&
        user.first_name &&
        user.last_name
      ) {
        e.preventDefault();
        const url = "https://jwtdjango.herokuapp.com/api/register/";
        let data = user;
        axios
          .post(url, data)
          .then((response) => {
            if (response.status === 201) {
              history.push("/");
            } else if (response.data.hasOwnProperty("email")) {
              setEmailError(response.data.email);
            } else if (response.data.hasOwnProperty("mobileError")) {
              setMobileError(response.data.mobileError);
            } else if (response.data.hasOwnProperty("non_field_errors")) {
              setPasswordError(response.data.non_field_errors);
            } else if (response.data.hasOwnProperty("password2Error")) {
              setPassword2Error(response.data.password2Error);
            }
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error.message);
          });
      }
    } else {
      e.preventDefault();
    }
  };

  return (
    <div className="register">
      <form className="register_container">
        <span className="register_header">Sign Up</span>

        <div className="form-group">
          <label
            htmlFor="email"
            className={`form-label ${emailError ? "errorLabel" : ""} `}
          >
            Email
          </label>
          <input
            className={`form-control ${emailError ? "errorField" : ""} `}
            id="email"
            type="text"
            placeholder="Email"
            onChange={(data) => {
              setUser({ ...user, email: data.target.value });
              setEmailError("");
            }}
            value={user.email}
            autoComplete="off"
            required
          />
          <span className="register_container_span">
            <EmailRoundedIcon />
          </span>
          <span className="errorMsg">{emailError && emailError}</span>
        </div>

        <div className="form-group">
          <label htmlFor="first_name" className="form-label">
            First Name
          </label>
          <input
            className="form-control"
            id="first_name"
            type="text"
            placeholder="First Name"
            onChange={(data) => {
              setUser({ ...user, first_name: data.target.value });
            }}
            value={user.first_name}
            autoComplete="off"
            required
          />
          <span className="register_container_span">
            <PersonRoundedIcon />
          </span>
        </div>

        <div className="form-group">
          <label htmlFor="last_name" className="form-label">
            Last Name
          </label>
          <input
            className="form-control"
            id="last_name"
            type="text"
            placeholder="Last Name"
            onChange={(data) => {
              setUser({ ...user, last_name: data.target.value });
            }}
            value={user.last_name}
            autoComplete="off"
            required
          />
          <span className="register_container_span">
            <PersonRoundedIcon />
          </span>
        </div>

        <div className="form-group">
          <label
            htmlFor="mobile"
            className={`form-label ${mobileError ? "errorLabel" : ""} `}
          >
            Mobile Number
          </label>
          <input
            className={`form-control ${mobileError ? "errorField" : ""} `}
            id="mobile"
            type="tel"
            placeholder="Mobile Number"
            onChange={(data) => {
              setUser({ ...user, mobile: data.target.value });
              setMobileError("");
            }}
            value={user.mobile}
            autoComplete="off"
            required
          />
          <span className="register_container_span">
            <CallRoundedIcon />
          </span>
          <span className="errorMsg">{mobileError && mobileError}</span>
        </div>

        <div className="form-group">
          <label
            htmlFor="password"
            className={`form-label ${passwordError ? "errorLabel" : ""} `}
          >
            Password
          </label>
          <input
            className={`form-control ${passwordError ? "errorField" : ""} `}
            id="password"
            type="password"
            placeholder="Password"
            onChange={(data) => {
              setUser({ ...user, password: data.target.value });
              setPasswordError("");
            }}
            value={user.password}
            autoComplete="off"
            required
          />
          <span className="register_container_span">
            <LockRoundedIcon />
          </span>
          <span className="errorMsg">{passwordError && passwordError}</span>
        </div>

        <div className="form-group">
          <label
            htmlFor="confirm_password"
            className={`form-label ${password2Error ? "errorLabel" : ""} `}
          >
            Confirm Password
          </label>
          <input
            className={`form-control ${password2Error ? "errorField" : ""} `}
            id="confirm_password"
            type="password"
            placeholder="Confirm Password"
            onChange={(data) => {
              setUser({ ...user, password2: data.target.value });
              setPassword2Error("");
            }}
            value={user.password2}
            autoComplete="off"
            required
          />
          <span className="register_container_span">
            <LockRoundedIcon />
          </span>
          <span className="errorMsg">{password2Error && password2Error}</span>
        </div>
        <button
          type="submit"
          onClick={register}
          className="btn btn-secondary btn-block mt-4"
        >
          Sign Up
        </button>

        <div className="register_signin">
          <span>Already have an account?&nbsp;&nbsp;</span>
          <Link to="/signin">Sign In</Link>
        </div>
      </form>
    </div>
  );
}

export default Register;
