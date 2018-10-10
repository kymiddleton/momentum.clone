const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    todoID: {
        type: Schema.Types.ObjectId,
      },
    todoItem: {
        type: String,
        trim: true,
        required: "Todo Item is Required"
    },
    todoStatus: {
        type: Boolean
    }
});
    // This creates our model from the above schema, using Mongoose's model method
    const todo = mongoose.model("todoLog", TodoSchema);
    // Export the Todo model
    module.exports = todo;
