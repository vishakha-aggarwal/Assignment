const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Category Name"],
    }
});

module.exports = mongoose.model("Category", categorySchema);