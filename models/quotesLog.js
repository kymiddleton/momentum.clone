const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuoteSchema = new Schema({
    quoteID: {
        type: Schema.Types.ObjectId,
    },
    quoteDate: {
        type: String,
        trim: true,
        required: "Quote Date is Required"
    },
    quoteText: {
        type: String,
        trim: true,
        required: "Quote Item is Required"
    },
    quoteAuthor: {
        type: String,
        trim: true,
        required: "Quote Author is Required"
    }
});
// This creates our model from the above schema, using Mongoose's model method
const quote = mongoose.model("quotesLog", QuoteSchema);
// Export the Quote model
module.exports = quote;
