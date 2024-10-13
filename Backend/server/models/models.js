
const BookModel = require("./Books")
const BookMockModel = require("./BooksMock")

const BookModel = mongoose.model("books", BookSchema)
const BookMockModel = mongoose.model("books_mock", BookMockSchema)
module.exports = {
    BookModel,
    BookMockModel

}