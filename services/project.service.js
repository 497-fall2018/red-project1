var Project = require('../models/project.model')

_this = this


exports.getProjects = async function(query, page, limit){
    var options = {
        page,
        limit
    }
    try {
        var projects = await Project.paginate(query, options)
        return projects;
    } catch (e) {
        throw Error('Error while Paginating Projects')
    }
}


exports.createProject = async function(project){
    var newProject = new Project({
        name: project.name
    })

    try{
        var savedProject = await newProject.save()
        return savedProject;
    }catch(e){
        throw Error("Error while Creating Project")
    }
}

exports.updateProject = async function(project){
    var id = project.id

    try{
        var oldProject = await Project.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Project")
    }

    if(!oldProject){
        return false;
    }

    oldProject.name = project.name


    try{
        var savedProject = await oldProject.save()
        return savedProject;
    }catch(e){
        throw Error("And Error occured while updating the Project");
    }
}


exports.deleteProject = async function(id){

    try{
        var deleted = await Project.remove({_id: id})
        if(deleted.result.n === 0){
            throw Error("Project Could not be deleted")
        }
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Project")
    }
}
