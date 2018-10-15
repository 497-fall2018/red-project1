import {combineReducers} from 'redux'
import {TodoListReducer} from '../todos/reducers/todoReducer'
import {ProjectListReducer} from '../projects/reducers/projectReducer'


//One root reducer for the whole app. This is done so that the app will have one single reducer to manage lots of other resources.
// And also communication between the reducers will be easier to maintain.

const rootReducer = combineReducers({
    todos: TodoListReducer,
    projects: ProjectListReducer
})

export default rootReducer
