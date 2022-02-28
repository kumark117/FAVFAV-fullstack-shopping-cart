const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: [1,'Quantity can not be less than 1'],
        max: [10,'Quantity can not be more than 10']
    },
    price: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
    }
}, {
    timestamps: true
})
const CartSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    items: [ItemSchema],
},
{
    collection: 'Cart'
})

module.exports = mongoose.model('Cart', CartSchema);
