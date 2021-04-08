import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import EmailRoundedIcon from "@material-ui/icons/EmailRounded";
import LockRoundedIcon from "@material-ui/icons/LockRounded";
import axios from "axios";
import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const history = useHistory();

  useEffect(() => {
    document.title = "Sign In | Nemesis";
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  }, []);

  const login = (e) => {
    if (user.email && user.password) {
      e.preventDefault();

      const url = "https://jwtdjango.herokuapp.com/api/token/";
      let data = user;

      axios
        .post(url, data)
        .then((response) => {
          localStorage.setItem("access", response.data.access);
          localStorage.setItem("refresh", response.data.refresh);
          history.push("/");
        })
        .catch((error) => {
          console.log(error.message);
          setError("Invalid Credentials");
        });
    }
  };

  return (
    <div className="login">
      <form className="login_container">
        <span className="login_header">Sign In</span>
        <div className="login_error">{error && error}</div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            className="form-control"
            id="email"
            type="text"
            placeholder="Email"
            onChange={(data) => {
              setUser({ ...user, email: data.target.value });
              setError(null);
            }}
            value={user.email}
            required
            autoFocus
          />
          <span className="login_container_span">
            <EmailRoundedIcon />
          </span>
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            className="form-control"
            id="password"
            type="password"
            placeholder="Password"
            onChange={(data) => {
              setUser({ ...user, password: data.target.value });
              setError(null);
            }}
            value={user.password}
            required
          />
          <span className="login_container_span">
            <LockRoundedIcon />
          </span>
        </div>

        <button
          onClick={login}
          type="submit"
          className="btn btn-secondary btn-block mt-4"
        >
          Sign In
        </button>

        <div className="login_signup">
          <span>Don't have an account?&nbsp;&nbsp;</span>
          <Link to="/signup">Sign Up</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
