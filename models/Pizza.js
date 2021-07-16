const { Schema, model } = require('mongoose');

//MongoDB automatically provides an _id so that you don't have to worry about setting it up like you would have to do in SQL
const PizzaSchema = new Schema({
    pizzaName: {
        type: String    
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date, 
        default: Date.now
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: []
});

//create Pizza model using PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

//export Pizza model
module.exports = Pizza;