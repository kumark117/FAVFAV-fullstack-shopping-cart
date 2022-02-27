import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

export default function Nav(){

  return(
        <div className="navbar">
           <ul className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/SignUp">Sign Up</Link>
              <Link to="/login">Log In</Link>
           </ul>
        </div>
  );

}