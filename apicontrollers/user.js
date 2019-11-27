const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const UserModel = require("../models/user");
const ProductModel = require("../models/newproduct");

const jwt = require("jsonwebtoken");
const url = require("url")

const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = {
  //Sign Up new User
  //Render

  getSignUp: function(req, res, next) {
    let message = req.flash("error");
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }
    res.render("user/signup", {
      path: "/signup",
      pageTitle: "signup",
      errorMessage: message,
      userr: null
    });
  },

  postSignUp: function(req, res, next) {
    const {
      username,
      password,
      email,
      age,
      phone,
      address,
      confirmpassword
    } = req.body;

    const today = new Date();
    var date_format = new Date(today).toDateString("yyyy-MM-dd");
    const created = date_format;
    UserModel.findOne({
      username: username
    })
      //Render Signup nếu sai
      .then(function(user) {
        if (user) {
          return res.render("user/signup", {
            path: "/signup",
            errorMessage: "Username exists already~!",
            error: console.log("Already"),
            userr: null
          });
        }
        if (username == "" || password == "") {
          return res.render("user/signup", {
            path: "/signup",
            errorMessage: "Invalid Username or Password",
            error: console.log("Invalid")
          });
        }
        if (password != confirmpassword) {
          return res.render("user/signup", {
            path: "/signup",
            errorMessage: "Password and Confirmpassword not same",
            error: console.log("Not same")
          });
        }
        //Mã hóa password với bcrypt
        return bcrypt
          .hash(password, 12)
          .then(function(hashpassword) {
            const userData = new UserModel({
              username: username,
              password: hashpassword,
              email: email,
              age: age,
              phone: phone,
              address: address,
              created: created
            });
            return userData.save({
              alo: console.log("Save Done")
            });
          })
          .then(function(result) {
            res.redirect("/login");
          });
      })

      .catch(function(err) {
        res.send("error: " + err);
      });
  },

  //Login User
  getLogin: function(req, res, next) {
    let message = req.flash("error");
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }
    res.render("user/login", {
      path: "/login",
      pageTitle: "Login",
      errorMessage: message,
      userr: null
    });
  },

  postLogin: function(req, res, next) {
    UserModel.findOne({
      username: req.body.username
    }).then(function(user) {
      if (!user) {
        return res.render("user/login", {
          path: "/login",
          errorMessage: "Username or password wrong",
          userr: null
        });
      }
      if (req.body.username == "" || req.body.password == "") {
        return res.render("user/login", {
          path: "/login",
          errorMessage: "Invailid username or password",
          userr: null
        });
      }

      bcrypt.compare(req.body.password, user.password, function(err, result) {
        if (result) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          if (user.role == "admin") {
            const token = jwt.sign(
              {
                email: user.email,
                userID: user._id,
                role: user.role
              },
              process.env.SECRETKEY_TOKEN
            );
            req.session.token = token;
            req.session.role = user.role;
            return req.session.save(err => {
             res.redirect("/adminTin");
            });
          } else {
            const token = jwt.sign(
              {
                email: user.email,
                userID: user._id,
                role: user.role
              },
              process.env.SECRETKEY_TOKEN
            );
            req.session.token = token;
            req.session.role = user.role;
            console.log(user)
            return req.session.save(err => {
              res.redirect(url.format({
                pathname:"/",
                user: user,
              }));
            });
          }
        } else {
          return res.render("user/login", {
            path: "/login",
            errorMessage: "Invailid username or password",
            userr: null
          });
        }
      });
    });
  },

  //Logout
  postLogout: function(req, res, next) {
    // huy session khi user dang xuat
    req.session.destroy(err => {
      console.log(err);
      res.redirect("/");
    });
  },

  //Account
  getAccount: function(req, res, next) {
    res.render("user/account", {});
  },

  //Edit User
  postEditUser: function(req, res, next) {
    const userID = req.body._id;
    const age = req.body.age;
    const phone = req.body.phone;
    console.log("TCL: ", userID);
    UserModel.findById(userID)
      .then(function(user) {
        if (!user) {
          res.render("/login");
        }
        if (req.body.age == "" || req.body.phone == "") {
          return res.render("user/login", {
            path: "/login",
            errorMessage: "Age or Phone is Empty",
            userr: null
          });
        }

        user.age = age;
        user.phone = phone;
        console.log(user);
        return user.save();
      })

      .then(function(result) {
        console.log("Complete Updated Completed user!");
        req.session.isLoggedIn = false;
        return res.redirect("/");
      })
      .catch(function(err) {
        console.log("TCL: ", err);
      });
  },

  //Cart
  getCartPage: function(req,res,next){
    UserModel.findById(req.session.user._id)
    .then(user=>{
     user.populate("cart.items.productId")
     .execPopulate()
     .then(user => {
      let products = user.cart.items;
      console.log(products);
      res.render("product/page-cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: products,
        sum: user.cart.sum,
        userr: user
      });
     })
   })
     .catch(err => console.log(err));
  },

  //API show cart
  getCart: function(req,res,next){
   UserModel.findById(req.session.user._id)
   .then(user=>{
    user.populate("cart.items.productId")
    .execPopulate()
    .then(user => {
      console.log("TCL: user.cart.sum", user.cart.sum)
        res.json({
            "sumPrice" : user.cart.sum,        
            "products": user.cart.items
        })
    })
  })
    .catch(err => console.log(err));
  },
  
  //Add Product
  postCart: function(req,res,next){
    console.log("Add Product to Cart");
    const productId = req.body.productId;
    console.log("TCL: productId", productId)
    var newQuantity = req.body.productNumber; 
    console.log("TCL: newQuantity", newQuantity) 
    ProductModel.findById(productId)
    .then(product => {
        UserModel.findById(req.session.user._id)
        .then(user=>{
          return user.addToCart(product, newQuantity);
        })
    })
    .then(result => {
        res.redirect("/");
    })
  },


   //Remove Product in Cart
   postRemoveProductCart: function(req, res, next) {
    const productID = req.body.productId;
    console.log("TCL: productID", productID)
    UserModel.findById(req.session.user._id)
    .then(user=>{
      ProductModel.findById(productID)
      .then(productDetail=>{
        return user.removeProductCart(productID,productDetail);
      })
     
    })
    .then(result => {
      res.redirect("/");
    })
     .catch(err => console.log(err));
    },

  //Update Cart
  postUpdateCart: function(req,res,next){
    var {productQuantity,productId,btnUpdateCart,btnCheckOut, name, mobilenumber,address} = req.body;
    console.log("TCL: btnCheckOut", btnCheckOut)
    console.log("TCL: btnUpdateCart", btnUpdateCart)
    var newQuantityArr = []
    var productIdArr = []
    var newUpdateItems=[]
  
    if (typeof productId == 'string') {
      newQuantityArr = productQuantity.split(",");
      productIdArr = productId.split(",");
      
    } 
    else {
        newQuantityArr = productQuantity;
        productIdArr = productId;
  
    }
    console.log("TCL: newQuantityArr", newQuantityArr)
    console.log("TCL: productIdArr", productIdArr)
    UserModel.findById(req.session.user._id)
    .then(user=>{
      for(var i=0;i<productIdArr.length;i++){
        newUpdateItems.push({
          ID: productIdArr[i],
          Quantity: newQuantityArr[i],
        })
      }
      if(btnUpdateCart=="btnUpdateCart"){
        var promiseUpdateCart = new Promise((resolve,reject)=>{
          resolve( user.updatedCart(newUpdateItems))
        })
        promiseUpdateCart.then(result=>{
          setTimeout(function () {
            return res.redirect("/cart");
        }, 3000)
        })
      }
      else if(btnCheckOut=="btnCheckOut"){
        var promiseCheckOut = new Promise((resolve,reject)=>{
          resolve( user.CheckOut(name,mobilenumber,address))
        })
        promiseCheckOut.then(result=>{
          setTimeout(function () {
            return res.redirect("/cart");
        }, 3000)
        })
      }
    })
  },

};


//Update cart Post
/*  var productID = req.params._id;
    var action = req.query.action;
    UserModel.findById(req.session.user._id)
    .then(user=>{
      ProductModel.findById(productID)
      .then(productDetail=>{
        console.log(action)
        return user.updatedCart(productID,productDetail,action);
      })
    })
    .then(result => {
      res.redirect("/");
    })
     .catch(err => console.log(err));
     */