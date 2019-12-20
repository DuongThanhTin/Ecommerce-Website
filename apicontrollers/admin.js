const bodyParser = require("body-parser");

//Model
const UserModel = require("../models/user");
const NewProductModel = require("../models/newproduct");

module.exports = {
  //Admin
  getAdmin: function(req, res, next) {
    var count = 0; 
    UserModel.find().then(user => {
      var data = user.filter(i => i.productNewOrder.order.length > 0);
      for (var i = 0; i < data.length; i++) {
        var js = JSON.parse(JSON.stringify(data[i].productNewOrder.order));
        console.log("data", js[0].sum);
      }
      res
        .render("admin/adminmanager", {
          path: "/admin",
          count: count,
          listusers: user,
          listorders: data,
        })
        .catch(err => {
          console.log(err);
        });
    });
  },

  //Manager Users
  getManagerUsers: function(req, res, next) {
    req.session.isManager = false;
    var count = 0;
    UserModel.find().then(user => {
      var data = user.filter(i => i.productNewOrder.order.length > 0);
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
        res.redirect("/adminTin")
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

  /*List Order*/
  getListOrder: function(req, res, next) {
    req.session.isManager = false;
    var count = 0;
    UserModel.find()
      .then(user => {
        var data = user.filter(i => i.productNewOrder.order.length > 0);
        //Filter Order Year
        // var data2 = data.filter(i=>i.productNewOrder.createdOrder.indexOf('2018')>0)
        //console.log("TCL: data2", data2)
        res.render("admin/list-order", {
          path: "/admin/list-order",
          count: count,
          listorder: data
        });
      })
      .catch(err => {
        console.log(err);
      });
  },

  postlistOrder: function(req, res, next) {
    req.session.isManager = false;
    var {year} = req.body;
    console.log("TCL: year", year)
    
    var count = 0;
    UserModel.find()
      .then(user => {
        var data = user.filter(i => i.productNewOrder.order.length > 0);
        //Filter Order Year
         var data2 = data.filter(i=>i.productNewOrder.createdOrder.indexOf(year)>0)
        //console.log("TCL: data2", data2)
        res.render("admin/list-order", {
          path: "/admin/list-order",
          yearorder: year,
          count: count,
          listorder: data2
        });
      })
      .catch(err => {
        console.log(err);
      });
  },

  /* New DB*/
  getListNewProduct: function(req, res, next) {
    req.session.isManager = false;
    var count = 0;
    NewProductModel.find()
      .then(products => {
        res.render("admin/list-product", {
          path: "/admin/list-product",
          count: count,
          kind: 'allproducts',
          listproducts: products
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
          kind: 'iphone',
          listproducts: data
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
        res.render("admin/list-product", {
          path: "/admin/list-product",
          count: count,
          kind: 'macbook',
          listproducts: data
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
        res.render("admin/list-product", {
          path: "/admin/list-product",
          count: count,
          kind: 'applewatch',
          listproducts: data
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
        var data = products.filter(i => i.category == "AirPods");
        console.log('alo ',data);
        res.render("admin/list-product", {
          path: "/admin/list-product",
          count: count,
          kind: 'airpods',
          listproducts: data
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
        res.redirect('/adminTin/managerproducts')
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
        res.render("admin/update-product", {
          airpods: newproduct,
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
        res.redirect("/adminTin/managerproducts");
      })
      .catch(function(err) {
        console.log("TCL: ", err);
      });
  }

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
