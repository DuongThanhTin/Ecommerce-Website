const bodyParser = require("body-parser");
//Model

const ProductModel = require("../models/newproduct");
const UserModel = require("../models/user");
const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = {
  /* NEW DB*/
  getAddProduct: function (req, res, next) {
    let message = req.flash("error");
    if (message.length > 0) {
      message = message[0];
    } else {
      message = null;
    }
    req.session.isManager = false;
    res.render("product/addproduct", {
      errorMessageProduct: message
    });
  },

  postAddProduct: function (req, res, next) {
    const {
      productname,
      price,
      imagePath,
      description,
      quantity,
      category
    } = req.body;
    const today = new Date();
    var date_format = new Date(today).toDateString("yyyy-MM-dd");
    const created = date_format;
    console.log(created);
    ProductModel.findOne({
      imagePath: imagePath
    })

      .then(function (product) {
        if (product) {
          return res.render("product/addproduct", {
            errorMessageProduct: console.log("PRoduct is Exists"),
            productt: null
          });
        }
        if (
          productname == "" ||
          price == "" ||
          imagePath == "" ||
          description == ""
        ) {
          return res.render("product/addproduct", {
            path: "/signup",
            errorMessageProduct:
              "Product name or Price or Imagepath or Description is Empty",
            error: console.log("Empty")
          });
        } else {
          const newproductData = new ProductModel({
            productname: productname,
            imagePath: imagePath,
            price: price,
            description: description,
            quantity: quantity,
            category: category,
            created: created
          });
          newproductData
            .save({
              alo: console.log("Save new Product  Done")
            })
            .then(function (product) {
              console.log(product);
            });
        }
      })
      .then(function (result) {
        res.redirect("/adminTin");
      })
      .catch(function (err) {
        res.send("error: " + err);
      });
  },

  getProductDetail: function (req, res, next) {
    const productId = req.params.productId;
    console.log("TCL: productId", productId)
    UserModel.find()
      .then(users => {
        ProductModel.find()
          .then(products => {
            ProductModel.findById(productId)
              .then((product) => {
                res.redirect("/")
              })
              .catch(err => {
                console.log(err);
              });
          });
      })
      .catch(err => {
        console.log(err);
      });
  },

  getProductDetailView: function (req, res, next) {
    const productId = req.params.productId;
    console.log("TCL: productId", productId)
    UserModel.find()
      .then(users => {
        ProductModel.find()
          .then(products => {
            ProductModel.findById(productId)
              .then((product) => {
                res.render("product/page-detailProducts")
              })
              .catch(err => {
                console.log(err);
              });
          });
      })
      .catch(err => {
        console.log(err);
      });
  },

  getAllProducts: function (req, res, next) {
    req.session.isManager = false;
    var count = 0;
    ProductModel.find()
      .then(products => {
        res.render("product/page-AllProducts", {
          listproducts: products
        });
      })
      .catch(err => {
        console.log(err);
      });
  },
};
