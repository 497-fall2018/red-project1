//Import the Todo API

import { ProjectApi } from "../../api/projectApi";
//import { TodoApi } from "../../api/todoApi";


// These are the action type constants. Ordered by CRUD order.
// There is a pattern of Action, Action_Success, Action_Error action types for the Async actions.



//Create
export const CREATE_PROJECT = '[Project] CREATE_PROJECT'
export const CREATE_PROJECT_SUCCESS = '[Project] CREATE_PROJECT_SUCCESS'
export const CREATE_PROJECT_ERROR = '[Project] CREATE_PROJECT_ERROR'


//Read
export const GET_PROJECTS = '[Project] GET_PROJECTS'
export const GET_PROJECTS_SUCCESS = '[Project] GET_PROJECTS_SUCCESS'
export const GET_PROJECTS_ERROR = '[Project] GET_PROJECTS_ERROR'


//Update
export const START_EDITING ='[Project] START_EDITING'
export const CANCEL_EDITING = '[Project] CANCEL_EDITING'

export const UPDATE_PROJECT = '[Project] UPDATE_PROJECT'
export const UPDATE_PROJECT_SUCCESS = '[Project] UPDATE_PROJECT_SUCCESS'
export const UPDATE_PROJECT_ERROR = '[Project] UPDATE_PROJECT_ERROR'



//Delete
export const DELETE_PROJECT = '[Project] DELETE_PROJECT'
export const DELETE_PROJECT_SUCCESS = '[Project] DELETE_PROJECT_SUCCESS'
export const DELETE_PROJECT_ERROR = '[Project] DELETE_PROJECT_ERROR'



//These are the action types Also ordered in CRUD Order.

//Create

//The dispatch and getstate function is provided by the Redux-Thunk middleware, we can dispatch actions with it.

export function CreateProject(project){
    return (dispatch, getState) => {
        return ProjectApi.createProject(project).then(res => {
            dispatch(CreateProjectSuccess(res.data.data))
        })
    }
}

export function CreateProjectSuccess(project){
    return {
        type:CREATE_PROJECT_SUCCESS,
        project
    }
}


//Read
export function GetProjects(){
    return (dispatch, getState) => {
        return ProjectApi.getProject().then(res => {
            dispatch(GetProjectSuccess(res))
        })
    }
}

export function GetProjectSuccess(projects){
    return {
        type:GET_PROJECTS_SUCCESS,
        projects
    }
}


//Update
export function StartEditing(_id) {
    return {
        type: START_EDITING,
        _id
    }
}
export function CancelEditing(_id) {
    return {
        type: CANCEL_EDITING,
        _id
    }
}


export function UpdateProject(project) {
    return (dispatch, getState) => {

        //Multiple actions can be sent usign the Redux-Thunk middleware

        dispatch({
            type: UPDATE_PROJECT,
            project
        })
        ProjectApi.updateProject(project).then(res => {
            dispatch(UpdateProjectSuccess(res.data.data))
        })
    }
}
export function UpdateProjectSuccess(project) {
    return {
        type: UPDATE_PROJECT_SUCCESS,
        project,
        _id: project._id
    }
}


//Delete
export function DeleteProject(project) {
    return (dispatch, getState) => {
        dispatch({
            type: DELETE_PROJECT,
            project
        })
        ProjectApi.removeProject(project).then(res => {
            if (res.status == 204) {
                dispatch(DeleteProjectSuccess(project))
            }
        })
    }
}
export function DeleteProjectSuccess(project) {
    return {
        type: DELETE_PROJECT_SUCCESS,
        project,
        _id: project._id
    }
}
