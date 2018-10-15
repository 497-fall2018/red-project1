var ProjectService = require('../services/project.service')
var TodoService = require('../services/todos.service')

_this = this


exports.getProjects = async function(req, res, next){

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    console.log(page, limit)

    try{
        var projects = await ProjectService.getProjects({}, page, limit)
        return res.status(200).json({status: 200, data: projects, message: "Succesfully Projects Recieved"});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}


exports.createProject = async function(req, res, next){
    if (!req.body.name) {
        return res.status(400).json({status: 400, message: "Project Name required"})
    }
    
    var project = {
        name: req.body.name
    }

    try{
        var createdProject = await ProjectService.createProject(project)
        return res.status(201).json({status: 201, data: createdProject, message: "Succesfully Created Project"})
    }catch(e){
        return res.status(400).json({status: 400, message: "Project Creation was Unsuccesfull"})
    }
}

exports.updateProject = async function(req, res, next){
    var id = req.body._id;
    
    if(!id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var project = {
        id,
        name: req.body.name ? req.body.name : null,
    }

    try{
        var updatedProject = await ProjectService.updateProject(project)
        return res.status(200).json({status: 200, data: updatedProject, message: "Succesfully Updated Project"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}


exports.removeProject = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await ProjectService.deleteProject(id)
        return res.status(204).json({status:204, message: "Succesfully Project Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}



exports.getProjectTodos = async function(req, res, next){

    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;

    console.log(page, limit)

    var id = req.params.id;

    try{
        // will query only the todos with the correct project_id
        // can query on any attribute of the schema
        var todos = await TodoService.getTodos({project_id: id}, page, limit) 
        return res.status(200).json({status: 200, data: todos, message: "Succesfully Recieved Todos in Project"});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}

exports.createProjectTodo = async function(req, res, next){

    var id = req.params.id;

    var todo = {
        title: req.body.title,
        duration: req.body.duration,
        date: req.body.date,
        status: req.body.status,
        project_id: id
    }

    try{
        var todos = await TodoService.createTodo(todo)
        return res.status(200).json({status: 200, data: todos, message: "Succesfully Created Todo in Project"});
    }catch(e){
        return res.status(400).json({status: 400, message: e.message});
    }
}