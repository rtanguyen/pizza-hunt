const { Comment, Pizza } = require('../models');

const commentController = {
    //add comment to pizza
    addComment({ params, body }, res) {
        console.log(body);
        Comment.create(body)
          .then(({ _id }) => {
            return Pizza.findOneAndUpdate(
                { _id: params.pizzaId },
                //add the comment's _id to the specific pizza we want to update
                { $push: { comments: _id }},
                { new: true }
            );
          })
          .then(dbPizzaData => {
              if(!dbPizzaData) {
                  res.status(404).json({ message: 'no pizza found with this id'});
                  return;
              }
              res.json(dbPizzaData)
          })
          .catch(err => res.json(err));
      },

    //remove comment
    removeComment({ params }, res) {
        Comment.findOneAndDelete({ _id: params.commentId })
            .then(deletedComment => {
                if(!deletedComment) {
                    return res.status(404).json({ message: 'no comment with this id' });
                }
                return Pizza.findOneAndUpdate(
                    { _id: params.pizzaId },
                    //identify/remove comment from pizza
                    { $pull: { comments: params.commentId }},
                    { new: true }
                );
            })
            .then(dbPizzaData => {
                if(!dbPizzaData) {
                    res.status(404).json({ message: 'no pizza found with this id '});
                    return;
                }
                res.json(dbPizzaData);
            })
            .catch(err => res.json(err));
        }
};

module.exports = commentController;