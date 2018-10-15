var express = require('express')

var router = express.Router()

var ProjectController = require('../../controllers/project.controller');

router.get('/', ProjectController.getProjects)
router.post('/', ProjectController.createProject)
router.put('/:id', ProjectController.updateProject)
router.delete('/:id',ProjectController.removeProject)

// link todos to projects
router.get('/:id/todos', ProjectController.getProjectTodos)   // get all the todos under an object
router.post('/:id/todos', ProjectController.createProjectTodo) // add a todo to a project

module.exports = router;