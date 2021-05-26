const { model, Schema } = require("mongoose");

const bookSchema = Schema({
    title: {
        type     : String,
        required : true,
        unique   : true
    },
    author: {
        type     : String,
        required : true,
    }
});

module.exports = Book = model('Book', bookSchema);