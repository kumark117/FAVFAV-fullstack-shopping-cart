import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

export default function Nav(props){

  return(
        <div className="navbar">
           <ul className="nav-links">
              <Link to="/">Home &nbsp;</Link>
              <Link to="/register"> Sign Up </Link>
              { !props.loggedIn && <Link to="/login"> Log In </Link> }
              { props.loggedIn && <Link to="/savecart"> Save Cart </Link> }
              { props.loggedIn && <Link to="/loadcart"> Load Cart </Link> }
              { props.loggedIn && <Link to="/logout"> Logout </Link> }
           </ul>
        </div>
  );

}