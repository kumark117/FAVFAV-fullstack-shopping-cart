import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

export default function Nav(){

  return(
        <div className="navbar">
           <ul className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/register">Sign Up</Link>
              <Link to="/login">Log In</Link>
              <Link to="/savecart">Save Cart</Link>
              <Link to="/loadcart">Load Cart</Link>
           </ul>
        </div>
  );

}