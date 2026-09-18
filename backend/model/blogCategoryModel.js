const mongoose = require('mongoose')
const schema = mongoose.Schema

const categorySchema = new schema({
    category: {type: [String]}
})

const Category = mongoose.model('catgeory',categorySchema)

module.exports = Category