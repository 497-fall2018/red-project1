var express = require('express')

var router = express.Router()
var todoRouter = require('./api/todos.route')
var todos = require('./api/projects.route')


router.use('/todos', todoRouter);
router.use('/projects',todos);


module.exports = router;