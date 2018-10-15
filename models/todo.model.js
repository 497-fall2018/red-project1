var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var ToDoSchema = new mongoose.Schema({
    title: String,
    duration: String,
    date: Date,
    status: String,
    //project: String,
    project_id: String // refers to mongoDB's unique ID for a project
})

ToDoSchema.plugin(mongoosePaginate)
const ToDo = mongoose.model('Todo', ToDoSchema)

module.exports = ToDo;
