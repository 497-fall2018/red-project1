var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ToDoSchema = new mongoose.Schema({
    title: String,
    duration: String,
    date: Date,
    status: String,
    project: String
})

ToDoSchema.plugin(mongoosePaginate)
const ToDo = mongoose.model('Todo', ToDoSchema)

module.exports = ToDo;
