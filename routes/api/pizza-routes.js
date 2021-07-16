const router = require('express').Router();
//destructure the method names out of the imported object and use those names directly instead of having to do pizzaController.getAllPizza()
const {
    getAllPizza,
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza
} = require('../../controllers/pizza-controller');

// /api/pizzas
router
    .route('/')
    .get(getAllPizza)
    .post(createPizza);

// /api/pizzas/:id
router
  .route('/:id')
  .get(getPizzaById)
  .put(updatePizza)
  .delete(deletePizza);

module.exports = router;