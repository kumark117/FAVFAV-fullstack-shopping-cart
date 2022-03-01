import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import LoginService from '../services/LoginService';
import { SaveCart, LoadCart } from "../services/CartService";

import Message from '../elements/Message';
import Error from '../elements/Error';
import {
  COMMON_FIELDS,
  LOGIN_FIELDS,
  LOGIN_MESSAGE,
  ERROR_IN_LOGIN,
} from '../MessageBundle';

export const Logout = (props) => {
  props.cbSetLoggedIn(false); //TODO_KK: move this into SaveCart, conditionally..
  return (
  <SaveCart userData={props.userData} cbSetLoadedCart={props.setLoadedCart} cart={props.cart} cbUserData={props.setUserData}/>
   );
};

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_name: '',
      password: '',
      error: false,
      loginSuccess: false,
      cbSetLoggedIn : props.cbSetLoggedIn,
      cbUserData: props.cbUserData
    };
  }

  handleOnChangeUserName = (e) => {
    this.setState({
      user_name: e.target.value,
    });
  };

  handleOnChangePassword = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  onSubmit = async (e) => {
    const data = {
      user_name: this.state.user_name,
      password: this.state.password,
    };
    const loginResult = await LoginService(data);
    if (loginResult !== 200) {
      this.setState({
        error: true,
        loginSuccess: false,
      });
    } else {
      this.setState({
        loginSuccess: true,
        error: false,
      });
    //inform PARENT THAT A NEW USER HAS LOGGED IN!
    //alert("onSUbmit: this.state:"+JSON.stringify(this.state));
    this.state.cbUserData({name: this.state.user_name, password: this.state.password});
    this.state.cbSetLoggedIn(true);
    }
  };

  render() {
    const { loginSuccess, error } = this.state;

    return (
      <div className="Login">
        <h1> {LOGIN_FIELDS.LOGIN_HEADING} </h1> {' '}
        <form onSubmit={this.onSubmit}>
          <div>
            <div className="fields">
              <p> {COMMON_FIELDS.USER_NAME} </p>    {' '}
              <input
                type="text"
                name="Username"
                onChange={this.handleOnChangeUserName}
                autoComplete="Username"
                required
              />
            </div>{' '}
            {' '}
            <div className="fields">
              {' '}
              <p> {COMMON_FIELDS.PASSWORD} </p>    {' '}
              <input
                type="password"
                name="Password"
                onChange={this.handleOnChangePassword}
                autoComplete="Password"
                required
              />{' '}
                  {' '}
            </div>{' '}
            {' '}
            <div className="buttons">
              {' '}
              <button
                type="button"
                onClick={this.onSubmit}
                className="btn btn-primary"
              >
                {' '}
                  {LOGIN_FIELDS.LOGIN}    {' '}
              </button>{' '}
                  <Link to="/Home">
                     Cancel </Link>  {' '}
               {' '}
            </div>{' '}
               {' '}
          </div>{' '}
           {' '}
        </form>{' '}
        {error && <Error message={ERROR_IN_LOGIN} />}    {' '}
       {loginSuccess && <Message message={LOGIN_MESSAGE} /> &&  
             <LoadCart userData={{name: this.state.user_name}} cbSetLoadedCart={this.props.cbSetLoadedCart} />}
      {' '}
      </div>
    );
  }
}
