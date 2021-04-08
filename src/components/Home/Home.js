import React from "react";
import { useHistory } from "react-router";
import "./Home.css";

function Home() {
  const history = useHistory();

  return (
    <div className="home">
      <div className="home_container">
        <button
          className="btn btn-success"
          onClick={() => history.push("/signin")}
        >
          Sign In
        </button>
        <button
          className="btn btn-success"
          onClick={() => history.push("/signup")}
        >
          Sign Up
        </button>
        <div>Check local storage of browser after sign in</div>
      </div>
    </div>
  );
}

export default Home;
