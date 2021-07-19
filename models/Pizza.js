const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//MongoDB automatically provides an _id so that you don't have to worry about setting it up like you would have to do in SQL
const PizzaSchema = new Schema(
    {
        pizzaName: {
            type: String    
        },
        createdBy: {
            type: String
        },
        createdAt: {
            type: Date, 
            default: Date.now,
            get: (createdAtVal) => dateFormat(createdAtVal)
        },
        size: {
            type: String,
            default: 'Large'
        },
        toppings: [],
        comments: [
            {
                //tell Mongoose to expect an ObjectId and to tell it that its data comes from the Comment model
                type: Schema.Types.ObjectId,
                ref: 'Comment'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        //we don’t need id since virtual.
        id: false
    }
);

// get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});

//create Pizza model using PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

//export Pizza model
module.exports = Pizza;