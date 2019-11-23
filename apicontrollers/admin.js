const bodyParser = require("body-parser");

//Model
const UserModel = require("../models/user");
const NewProductModel = require("../models/newproduct");

module.exports = {
  //Admin
  getAdmin: function(req, res, next) {
    res.render("admin/adminmanager", {
      path: "/admin"
    });
  },

  //Manager Users
  getManagerUsers: function(req, res, next) {
    req.session.isManager = false;
    var count = 0;
    UserModel.find().then(user => {
      res
        .render("admin/list-user", {
          path: "/admin/list-user",
          count: count,
          listusers: user
        })
        .catch(err => {
          console.log(err);
        });
    });
  },

  //Update USer
  getUpdate: function(req, res, next) {
    const userID = req.params._id;
    console.log("TCL: ", userID);
    UserModel.findById(userID)
      .then(function(user) {
        if (!user) {
          return res.redicter("/adminTin");
        }
        res.render("admin/updateusers", {
          user: user,
          alo: console.log(user.username)
        });
      })
      .catch(function(err) {
        console.log("TCL: ", err);
      });
  },

  postUpdateUser: function(req, res, next) {
    const userID = req.body._id;
    const username = req.body.username;
    const age = req.body.age;
    const phone = req.body.phone;
    const role = req.body.role;
    const email = req.body.email;
    const address = req.body.address;
    const created = req.body.created;
    console.log("TCL: ", req.body._id);
    console.log("TCL: ", username);
    UserModel.findById(userID)
      .then(function(user) {
        user.username = username;
        user.age = age;
        user.phone = phone;
        user.role = role;
        user.email = email;
        user.address = address;
        user.created = created;
        return user.save();
      })
      .then(function(result) {
        console.log("Complete Updated Completed user!");
        return res.render("admin/adminmanager", {
          path: "/adminTin/adminmanager",
          alo: console.log("hihi")
        });
      })
      .catch(function(err) {
        console.log("TCL: ", err);
      });
  },

  //Remove
  getRemoveUser: function(req, res, next) {
    const userID = req.params._id;
    console.log("ALOALO: " + userID);
    UserModel.deleteOne({
      _id: userID
    })
      .then(function(result) {
        console.log("Complete Delete Completed user!");
        res.redirect("/adminTin/managerusers");
      })
      .catch(function(err) {
        console.log("TCL: ", err);
      });
  },

  /* New DB*/
  getListNewProduct: function(req, res, next) {
    req.session.isManager = false;
    var count = 0;
    NewProductModel.find()
      .then(products => {
        res.json({
          listiphone: products
        });
      })
      .catch(err => {
        console.log(err);
      });
  },

  //List iPhone
  getListiPhone: function(req, res, next) {
    req.session.isManager = false;
    var count = 0;
    NewProductModel.find()
      .then(products => {
        var data = products.filter(i => i.category == "iPhone");
        console.log(data);
        res.render("admin/list-product", {
          path: "/admin/list-product",
          count: count,
          listiphone: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  },

  //-------------------------------------------------------------------
  //List Macbook
  getListMacbook: function(req, res, next) {
    req.session.isManager = false;
    var count = 0;
    NewProductModel.find()
      .then(products => {
        var data = products.filter(i => i.category == "Macbook");
        console.log(data);
        res.render("admin/list-macbook", {
          path: "/admin/list-macbook",
          count: count,
          listmacbooks: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  },

  //-------------------------------------------------------------------
  //List Apple Watch
  getListAppleWatch: function(req, res, next) {
    req.session.isManager = false;
    var count = 0;
    NewProductModel.find()
      .then(products => {
        var data = products.filter(i => i.category == "AppleWatch");
        console.log(data);
        res.render("admin/list-applewatch", {
          path: "/admin/list-applewatch",
          count: count,
          listapplewatch: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  },

  //-------------------------------------------------------------------
  //List Airpod
  getListAirpod: function(req, res, next) {
    req.session.isManager = false;
    var count = 0;
    NewProductModel.find()
      .then(products => {
        var data = products.filter(i => i.category == "AipPods");
        console.log(data);
        res.render("admin/list-airpod", {
          path: "/admin/list-airpod",
          count: count,
          listairpods: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  },

  getRemoveNewProduct: function(req, res, next) {
    const newproductID = req.params._id;
    console.log("Product ID: " + newproductID);
    req.session.isManager = false;
    NewProductModel.deleteOne({
      _id: newproductID
    })
      .then(function(result) {
        console.log("Complete Delete Product!");
      })
      .catch(function(err) {
        console.log("TCL: ", err);
      });
  },

  getUpdateNewProduct: function(req, res, next) {
    const newproductID = req.params._id;
    console.log("TCL: ", newproductID);
    NewProductModel.findById(newproductID)
      .then(function(newproduct) {
        if (!newproduct) {
          return res.redicter("/adminTin");
        }
        res.render("admin/update-airpods", {
          newproduct: newproduct,
          alo: console.log(newproduct.productname)
        });
      })
      .catch(function(err) {
        console.log("TCL: ", err);
      });
  },

  postUpdateNewProduct: function(req, res, next) {
    const newproductID = req.body._id;
    const newproductname = req.body.productname;
    const imagePath = req.body.imagePath;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;
    const quantity = req.body.quantity;
    const created = req.body.created;
    console.log("TCL: ", newproductID);
    NewProductModel.findById(newproductID)
      .then(function(newproduct) {
        newproduct.productname = newproductname;
        newproduct.imagePath = imagePath;
        newproduct.description = description;
        newproduct.price = price;
        newproduct.quantity = quantity;
        newproduct.category = category;
        newproduct.created = created;
        return newproduct.save();
      })
      .then(function(result) {
        console.log("Complete Updated Completed Product!");
        res.redirect("/adminTin/managerairpod");
      })
      .catch(function(err) {
        console.log("TCL: ", err);
      });
  },

 
  /*






















    //Khoong dung forEach duoc
    getManagerUsersTest: function(req,res,next){
        mongoClient.connect('mongodb+srv://admin:admin@web-nodejs-zrtjg.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true}, function(err, db) {
            if (err) throw err;

            //Important Connect Data
            
            UserModel.find(function (err,data) {
             
            })
       
            db.close();
        });
        
    },


    postTest: function(req,res,next){
        //https://smartjob.vn/node-js-va-mongodb-huong-dan-ket-noi/
    }
    */
};
