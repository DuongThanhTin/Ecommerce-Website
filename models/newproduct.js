const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newProductSchema = new Schema({
    productname: {
        type: String,
        require: true
    },
    imagePath: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price:
    {
        type: String,
        require: true
    },
    category:{
        type: String,
        require: true,
    },

    quantity:{
        type: Number,
        require: true,
    },

    created:{
        type: String,
        default: Date.now
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',

    }
   
})

const newProductMongoose = mongoose.model('newproduct',newProductSchema);


//Module.exports

module.exports = newProductMongoose;

