import React, { useState } from "react";

import API from "./mockAPI";
import { ListedItems } from "./ListedItems";
import { CartDetails } from "./CartDetails";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

import './bootstrap-dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./Nav";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";

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
  const [items, setItems] = useState(API);
  const [cartOpen, isCartOpen] = useState(false);

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

  const cartCountTotal = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
        <div className="App">
        <Nav />
        <Routes>
          <Route path="/SignUp" element={<SignUp/>} />
          <Route path="/login" element={<Login/>} />
          <Route
      path="*"
      element={
        <>
      <CartDetails
        open={cartOpen}
        onClose={() => isCartOpen(false)}
        cart={cart}
        increaseQ={increaseQuantity}
        decreaseQ={decreaseQuantity}
        cartCountTotal={cartCountTotal}
        removeFromCart={removeFromCart}
      />

      <FixedCart onOpen={() => isCartOpen(true)} cartItems={cartCountTotal} />

        <h1 style={{color: "green", textAlign:"center"}}>Interview: Shopping Cart App</h1>
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