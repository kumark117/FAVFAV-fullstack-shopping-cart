import axios from 'axios';
import { Navigate } from 'react-router-dom';

export const SaveCart = 	(props) => {
    const data = {userData: props.userData, cart: props.cart};
    if (data.userData === undefined|| data.userData.name === undefined) {
      data.userData = {name :"Interview-Guest",
              password : "guest-password"};
      if (props && props.cbSetUserData) props.cbSetUserData(data.userData);
    }
    const cartAsPerSchema = {userName: data.userData.name, items: (data.cart ?data.cart:[]) };
    axios.post('http://localhost:4000/savecart', cartAsPerSchema)
          .then(res => 
            { 
              if (res.status !== 200) {
                  alert("Error: Saving cart for user="+data.userData.name);
                  return res.status;
              }
            }
        );
        return(<Navigate to="/Home" replace={true}/>);
        
  }

  export const LoadCart = (props) => {
    const data = {userData: props?props.userData:undefined};
    if (data.userData === undefined|| data.userData.name === undefined) {
      data.userData = {name :"Interview-Guest",
              password : "guest-password"};
      if (props && props.cbSetUserData) props.cbSetUserData(data.userData);
    }
    
    const getURL = "http://localhost:4000/loadcart/?userName="+data.userData.name;
    //alert("getURL: "+ getURL);
    fetch(getURL)
     .then(response => {
      return response.json();
    })
    .then(data => {
      let ArrayOfObjects = data.items;
      const myCart = ArrayOfObjects.map(item => {return {name:item.name, price:item.price, quantity: item.quantity}; });
    
      alert("loadcart: from server-DB: myCart = "+ JSON.stringify(myCart));
      if (props)
        props.cbSetLoadedCart(myCart);
    });

    return(<Navigate to="/Home" replace={true}/>);
  
  }
  