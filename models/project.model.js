var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var ProjectSchema = new mongoose.Schema({
    name: String
})

const Project = mongoose.model('Project', ProjectSchema)
module.exports = Project;