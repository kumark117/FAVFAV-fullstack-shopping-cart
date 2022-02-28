import React, { useState } from "react";

import API from "./mockAPI";
import { ListedItems } from "./ListedItems";
import { CartDetails } from "./CartDetails";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import './bootstrap-dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Nav";

import { Login, Logout } from "./components/LoginLogout";
import Register from "./components/Register";
import {SaveCart, LoadCart} from "./services/CartService";

const FixedCart = ({ cartItems, onOpen }) => (
<div onClick={onOpen} style={{float:"right", color:"green", marginRight:"30px"}}>
Cimpress Cart
<div>
  <FontAwesomeIcon size="2x" icon={faShoppingCart} />
  <b>{cartItems || 0}</b>
</div>
</div>
);

const numberFormat = val =>
  Number.isInteger(val) ? val : val.toFixed(2);
  
export default function App() {
  const [cart, setCart] = useState([]);
  const [loadedCart, setLoadedCart] = useState(null);

  const [items, setItems] = useState(API);
  const [cartOpen, isCartOpen] = useState(false);
  const [userData, setUserData] = useState({});

  const [loggedIn, setLoggedIn] = useState(false);

  const addToCart = i => {
    setItems(state =>
      state.map((item, p) => {
        if (i === p) {
          setCart([
            ...cart,
            { name: item.name, price: numberFormat(item.price*(1-item.discount/100)), quantity: 1/*item.quantity*/ }
          ]);
          return { ...item, inCart: true };
        }
        return item;
      })
    );
  };

  const increaseQuantity = i => {
      setCart(state =>
        state.map((item, o) => {
          if (i === o && item.quantity < 10) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        })
      );
    };

  const decreaseQuantity =  i => {
      setCart(prevCart =>
        prevCart.map((item, o) => {
          if( item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
           }
           else if (item.quantity === 1) { //PATCH_KUMAR 
              removeFromCart(i);
           }
          return item;
        })
      );
    };

  const removeFromCart = i => {
    let chosenItem, index;
    index = 0;
    while (index < cart.length) {
      if (index === i) {
        chosenItem = cart[index].name;
        break;
      }
      index++;
    }
    setCart(state => state.filter(item => chosenItem !== item.name));
    setItems(state =>
      state.map(item => {
        if (item.name === chosenItem) {
          return { ...item, inCart: false /*, quantity: 1*/ };
        }
        return item;
      })
    );
  };

  if (loadedCart) {
  setCart(loadedCart);
  setLoadedCart(null);
  }
  const cartCountTotal = cart.reduce((acc, item) => acc + item.quantity, 0);

  //const cartCountTotal=123.456;

  return (
    <Router>
        <div className="App">
        <Nav loggedIn={loggedIn}/>
        <Routes>  
        <Route path="/register" element={<Register cbUserData={setUserData}/>} />
          {!loggedIn && <Route path="/login" element={<Login cbUserData={setUserData} cbSetLoadedCart={setLoadedCart} cbSetLoggedIn={setLoggedIn}/>} /> }
          {loggedIn && <Route path="/logout" element={<Logout cart={cart} cbUserData={setUserData} cbSetLoggedIn={setLoggedIn}/>} /> }          
          {loggedIn && <Route path="/savecart"
                    element={<SaveCart userData={userData} cbSetLoadedCart={setLoadedCart} cart={cart} cbSetUserData={setUserData}/>} />}
          {loggedIn && <Route path="/loadcart"
                    element={<LoadCart userData={userData} cbSetLoadedCart={setLoadedCart} cbSetUserData={setUserData}/>} />}
        
          <Route
      path="*"
      element={
        <>
      <CartDetails
        open={cartOpen}
        onClose={() => isCartOpen(false)}
        cart={loadedCart? loadedCart: cart}
        increaseQ={increaseQuantity}
        decreaseQ={decreaseQuantity}
        cartCountTotal={cartCountTotal}
        removeFromCart={removeFromCart}
      />

        <h1 style={{color: "green", textAlign:"center"}}>Interview: MERN: Full Stack Shopping Cart App</h1>
        <h2 style={{color: "green", textAlign:"center"}}>Welcome {loggedIn ? userData.name :""}!!</h2>

        <FixedCart onOpen={() => isCartOpen(true)} cartItems={cartCountTotal} />

        <ListedItems
          items={items}
          addToCart={addToCart}
        />
      </>}></Route>
        </Routes>
        </div>
    </Router>
  );
}