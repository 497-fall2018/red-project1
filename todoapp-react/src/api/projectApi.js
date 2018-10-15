// browser (input request) -> router -> call back function (controller) -> services (output request) -> HTTPClient request to mongoDB

import {HttpClient} from './httpClient'

// This is the API. The backend root URL can be set from here.

const API = 'http://localhost:3000/api'

//Setting the project URI

const PROJECT_API = `${API}/projects`

// The CRUD Operations of the Todo Resource.


//Create
const createProject = project => {
    return HttpClient.post(PROJECT_API, project)
}

//Read
const getProject = () => {
    return HttpClient.get(PROJECT_API)
}

//Update
const updateProject = project => {
    return HttpClient.put(PROJECT_API, project)
}


//Delete
const removeProject = project => {
    return HttpClient.delete(`${PROJECT_API}/${project._id}`)
}


//Encapsulating in a JSON object

const ProjectApi = {createProject, getProject, updateProject, removeProject}

export {ProjectApi}
