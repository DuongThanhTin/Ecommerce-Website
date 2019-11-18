const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
    },
    age: {
        type: Number,
        require: true
    },
    phone:
    {
        type: String,
        require: true
    },
    address:
    {
        type: String,
        require: true,
    },
    role:
    {
        type: String,
        default: 'customer'
    }, 
    created:{
        type: String,
        default: Date.now
    },
    cart: {
        items: [
          {
            productId: {
              type: Schema.Types.ObjectId,
              ref: 'newproduct',
              required: true
            },
            quantity: { type: Number}
          }
        ],
        sum: {
          type: Number,
          default: 0
        }
    },
    productOrder: []
   
})

userSchema.methods.addToCart = function(product, newQuantity) {
  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.productId.toString() === product._id.toString();
  });
  
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = parseFloat(this.cart.items[cartProductIndex].quantity) + parseFloat(newQuantity);
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      productId: product._id,
      quantity: newQuantity
    });
  }
  this.cart.sum = this.cart.sum + product.price * newQuantity;
  console.log("TCL: userSchema.methods.addToCart -> updatedCartItems", updatedCartItems)
  const updatedCart = {
    items: updatedCartItems,
    sum: this.cart.sum
  };
  this.cart = updatedCart;
  return this.save();
};


const userMongoose = mongoose.model('user',userSchema);


//Module.exports

module.exports = userMongoose;

