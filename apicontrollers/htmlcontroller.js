const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const mongoClient = require("mongodb").MongoClient;
const UserModel = require("../models/user");
const ProductModel = require("../models/newproduct");

const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {
 
  app.get("/", function(req, res, next) {
    req.session.isManager = false;

    ProductModel.find()
      .then(products => {
        var dataiPhone = products.filter(i => i.category == "iPhone");
        var dataMacbook = products.filter(i => i.category == "Macbook");
        var dataAppleWatch = products.filter(i => i.category == "AppleWatch");
        var dataAirpods = products.filter(i => i.category == "Airpods");
        res.render("homepage", {
          listproducts: dataiPhone,
          listmacbooks: dataMacbook,
          listapplewatch: dataAppleWatch,
          listairpod: dataAirpods
        });
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.get("/contact", function(req, res, next) {
    res.render("general/contact", {
      userr: req.user
    });
  }),
    app.get("/about", function(req, res, next) {
      res.render("general/about", {
        userr: req.user
      });
    });

  app.get("/blog", function(req, res, next) {
    res.render("general/blog", {
      userr: req.user
    });
  });

  //iPhone
  app.get("/iPhone", function(req, res, next) {
      req.session.isManager = false;
      ProductModel.find()
        .then(products => {
          var data = products.filter(i => i.category == "iPhone");
          res.render("product//page-iPhone", {
                userr: req.user,
                listproducts: data
            });
        })
        .catch(err => {
          console.log(err);
        });
  });

  //Macbook
  app.get("/macbook", function(req, res, next) {
    req.session.isManager = false;
    ProductModel.find()
      .then(products => {
        var data = products.filter(i => i.category == "Macbook");
        res.render("product//page-macbook", {
              userr: req.user,
              listmacbooks: data
          });
      })
      .catch(err => {
        console.log(err);
      });
  });

  //Apple Watch
  app.get("/applewatch", function(req, res, next) {
    req.session.isManager = false;
    ProductModel.find()
      .then(products => {
        var data = products.filter(i => i.category == "AppleWatch");
        res.render("product//page-applewatch", {
              userr: req.user,
              listapplewatch: data
          });
      })
      .catch(err => {
        console.log(err);
      });
  });

  //airpod
  app.get("/airpod", function(req, res, next) {
    req.session.isManager = false;
    ProductModel.find()
      .then(products => {
        var data = products.filter(i => i.category == "Airpods");
        res.render("product//page-airpod", {
              userr: req.user,
              listairpod: data
          });
      })
      .catch(err => {
        console.log(err);
      });
  });
};
