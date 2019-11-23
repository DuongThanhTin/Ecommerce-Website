const express = require("express");
const router = express.Router();

const cors = require("cors");
const isAuth = require("../middleware/is-auth");
const UserController = require("../apicontrollers/user");

router.use(cors());

//Sign Up
router.get("/signup", UserController.getSignUp);
router.post("/signup", UserController.postSignUp);

//Login
router.get("/login", UserController.getLogin);
router.post("/login", UserController.postLogin);

//Logout
router.post("/logout", UserController.postLogout);

//Account
router.get("/account/:_id", isAuth, UserController.getAccount);
router.post("/account", isAuth, UserController.postEditUser);
//router.get('/account/:_id',UserController.getEditUser)

//Cart
router.get("/cart", isAuth, UserController.getCartPage);
router.get("/api/cart", isAuth, UserController.getCart);

router.post("/cart", isAuth, UserController.postCart);
router.post("/removecartproduct", isAuth, UserController.postRemoveProductCart);
module.exports = router;
