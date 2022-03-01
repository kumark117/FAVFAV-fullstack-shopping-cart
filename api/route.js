const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();

let Registration = require('./schema/User');
let Cart = require('./schema/Cart');

const bcrypt = require('bcryptjs');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// add router in the Express app.
app.use("/", router);

/*
router.post("/posts", async (req, res) => {
	const post = new Post({
		title: req.body.title,
		content: req.body.content,
	})
	await post.save()
	res.send(post)
})
*/

//NOTE  Registration route
router.post("/register", async (req,res) => {
console.log("REQ: ", req.body);
    let register = new Registration(req.body);
    register.save()
        .then(reg => {
            console.log("SAVED REG: ", register);
            res.sendStatus(200);
        })
        .catch(err => {
            console.log("ERROR SAVING REG: ", register);
            res.status(400).send("Failed to store to database");
        });
});

// Login Router
router.post("/login", function(req, res) {
    Registration.findOne({ user_name: req.body.user_name })
        .then(user => {
            console.log("User from login", user)
            if (!user) res.sendStatus(204);
            else {
                bcrypt.compare(req.body.password, user.password)
                    .then(passwordMatch => passwordMatch ? res.sendStatus(200) : res.sendStatus(204))
            }
        });
});

/*********** 
// Username validation Router
router.post("/validate", function(req, res) {
        Registration.findOne({ user_name: req.body.user_name })
            .then(user => user ? res.sendStatus(204) : res.sendStatus(200))
    });

// Get allData
router.get("/data", function(req, res) {
    Registration.find((err, data) => err ? res.status(400).send("Error occured") : res.json(data));
});
*************/

// Get Cart Data for login
router.get("/loadcart", function(req, res) {
    console.log("SERVER: ROUTER GET: req.query", req.query, "req.params", req.params);
    Cart.findOne({ userName: req.query.userName })
    .then(cart => {console.log("AFTER Cart.findOne cart=", cart); 
                   cart ? res.json(cart) : res.sendStatus(200)});
});

//NOTE  Registration route
router.post("/savecart", async (req,res) => {
    console.log("REQ: ", req.body);
        //let cart = new Cart(req.body);
        const result01 = await Cart.updateOne(
            { userName: req.body.userName },
            { $set: req.body },
            { upsert: true } // Make this update into an upsert
          );
          /**
        cart.save()
            .then(reg => {
                console.log("SAVED CART: ", cart);
                res.sendStatus(200);
            })
            .catch(err => {
                console.log("ERROR SAVING CART: ", cart);
                res.status(400).send("Failed to store to database");
            });
            **/
            res.sendStatus(200);
    });


module.exports = router;
