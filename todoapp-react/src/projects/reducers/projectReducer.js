
// Import the ProjectAction Creators and ProjectActionTypes

import * as ProjectActions from '../actions/projectActions'



// We are dividing the reducers using a technique called Reducer composition.
// By doing this we are seperating the reducer for the Collection and the Individual Item


//The collection Reducer, It handles only the collection

export function ProjectListReducer(state = [], action) {
    switch (action.type) {

        // The cases ordered in CRUD order.

        // Create
        case ProjectActions.CREATE_PROJECT_SUCCESS: {
                return [
                    ...state,
                    action.project
                ];
        }

        //Read
        case ProjectActions.GET_PROJECTS_SUCCESS: {

            return action.projects.data.data.docs;

        }

        // The following Cases handle the data by mapping it. Mostly because they are related with the modification of a single Data

        //Update
        case ProjectActions.START_EDITING: {

            return state.map(s => project(s, action))

        }
        case ProjectActions.CANCEL_EDITING: {

            return state.map(s => project(s, action))

        }
        case ProjectActions.UPDATE_PROJECT: {

            return state.map(s => project(s, action))

        }
        case ProjectActions.UPDATE_PROJECT_SUCCESS: {

            return state.map(s => project(s, action))

        }


        //Delete
        case ProjectActions.DELETE_PROJECT: {

            return state.map(s => project(s, action))

        }
        case ProjectActions.DELETE_PROJECT_SUCCESS: {

            return state.filter(s => project(s, action))

        }

        default:
            return state
    }
}


//The individual Reducer. It handles only one Project Object.


const project = (state, action) => {

    // If the mapped project of the previous state matches with the new ID of the action,
    // Only then proceed to the Reducer Switch case

    if (state._id != (action._id || action.project._id)) {
        return state;
    }

    switch (action.type) {

        // Edit/modifies the individual Projects using ES6 spread operator. The cases are self explanatory.

        case ProjectActions.START_EDITING:
            {
                return {
                    ...state,
                    editing: true
                }
            }

        case ProjectActions.CANCEL_EDITING:
            {
                return {
                    ...state,
                    editing: false
                }
            }

        case ProjectActions.UPDATE_PROJECT:
            {
                return {
                    ...state,
                    editing: false,
                    updating: true
                }
            }

        case ProjectActions.UPDATE_PROJECT_SUCCESS:
            {
                return {
                    ...state,
                    ...action.project,
                    updating: false
                }
            }

        case ProjectActions.DELETE_PROJECT:
            {
                return {
                    ...state,
                    deleting: true
                }
            }

        case ProjectActions.DELETE_PROJECT_SUCCESS:
            {
                return false
            }

        default:
            {
                return state;
            }
    }
}
