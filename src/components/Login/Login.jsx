import React from "react";
// import HeadPhone from "../assets/img/headphones.svg";
import "./Login.css";
import { Link } from "react-router-dom";

export const Login = () => {
  return (
    <section id="main">
      <div className="nav-item">
        <a className="navbar-brand" href="/">
          Vusic
        </a>
      </div>
      <div className="main-row">
        <div className="main-row-img">
          <img className="head-phone-img" alt="" />
        </div>
        <div className="main-row-text">
          <h1>Music for everyone</h1>
          <p>Without music, life would be a mistake</p>
          <Link to={"/home"} className="btn">
            Start Listening
          </Link>
        </div>
      </div>
    </section>
  );
};
