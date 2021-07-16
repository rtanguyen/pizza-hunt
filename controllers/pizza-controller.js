const { Pizza } = require('../models');
const { createCollection } = require('../models/Pizza');

//functions created as methods of pizzaController object 
//methods will be used as callback functions for express routes
const pizzaController = {
    //get all pizzas --  callback function for the GET /api/pizzas route
    getAllPizza(req, res) {
        Pizza.find({})
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //get one pizza by id
    //destructure params out of req object
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
          .then(dbPizzaData => {
            //if no pizza found, send 404
            if(!dbPizzaData) {
                res.status(404).json({ message: 'no pizza found with this id '});
                return;
            }
            res.json(dbPizzaData);  
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //create pizza -- POST /api/pizzas
    createPizza({ body }, res) {
        //In MongoDB, the methods for adding data to a collection are .insertOne() or .insertMany(). But in Mongoose, we use the .create() method, which will actually handle either one or multiple inserts
        Pizza.create(body)
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.status(400).json(err));
    },

    //update pizza by id -- PUT /api/pizzas/:id
    updatePizza({ params, body }, res) {
        //findOneAndUpdate returns a document, updateOne doesn't (it just returns the id if it has created a new document)
        //third parameter, { new: true }, returns new version of document instead of original
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
            .then(dbPizzaData => {
                if(!dbPizzaData) {
                    res.status(404).json({ message: 'no pizza found with this id '});
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    },

    //delete pizza -- DELETE /api/pizzas/:id
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
            .then(dbPizzaData => {
                if(!dbPizzaData) {
                    res.status(404).json({ message: 'no pizza found with this id '});
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.status(400).json(err));
    }


    
    
};

module.exports = pizzaController;


