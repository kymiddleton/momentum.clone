const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const LinksSchema = new Schema({

    linkName: {
        type: String,
        trim: true,
        required: "Please enter website name"
    },
    saveurl: {
        type: String,
        trim: true,
        required: "Please enter url"
    }
});
    // This creates our model from the above schema, using Mongoose's model method
    const links = mongoose.model("linksLog", LinksSchema);
    // Export the links model
    module.exports = links;
