
import React, { Component } from 'react';
import * as TodoActions from '../actions/todoActions'
import * as ProjectActions from '../../projects/actions/projectActions'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import TodoTable from '../components/todoTable';
import TodoTableAll from '../components/todoTableAll';
import CreateProject from '../../projects/components/createProject'
import { Input, Header, Menu, Label } from 'semantic-ui-react'


var titleStyle = {
  marginTop: "50px",
  marginBottom: "20px",
};

export class TodoContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
          activePage: 'today',
          activeProject: 'all'
        }
    }

    handleItemClick = (e, { name }) => this.setState({ activePage: name })
    handleProjectClick = (e, { name }) => this.setState({ activeProject: name })

    // Todo Container methods dispatch the actions to the reducer functions. Ordered by CRUD Order

    //Create
    createTodo = (todo) => {
        this.props.actions.CreateTodo(todo)
    }

    createProject = (project) => {
        this.props.projectActions.CreateProject(project)
    }


    // No methods for reading, the first loading of data is done in App.js where the
    // getTodo Action is dispatched

    //Update
    startEditing = (id) => {
        this.props.actions.StartEditing(id)
    }
    cancelEditing = (id) => {
        this.props.actions.CancelEditing(id)
    }
    editTodo = (todo) => {
        this.props.actions.UpdateTodo(todo)
    }
    completeTodo = (todo) => {
        this.props.actions.UpdateTodo({...todo, status: 'done'})
    }

    //Start and Stop
    startTodo = (id) => {
      this.props.actions.StartTodo(id)
    }
    stopTodo = (id) => {
      this.props.actions.StopTodo(id)
    }

    //Delete
    deleteTodo = (todo) => {
        this.props.actions.DeleteTodo(todo)
    }

    render() {
        const { activePage } = this.state

        if (this.state.activePage == "today") {
          return (
            <div>
              <div style={titleStyle}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <Header as='h2' textAlign='left'>
                    <Header.Content>JustDoIt</Header.Content>
                  </Header>
                </div>
                <Menu secondary style={{display: 'flex', justifyContent: 'center'}}>
                  <Menu.Item
                    name='today'
                    active={activePage === 'today'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name='projects'
                    active={activePage === 'projects'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name='add'
                    active={activePage === 'add'}
                    onClick={this.handleItemClick}
                  />
                </Menu>
              </div>

              <div className="todo-container">
                  <TodoTable
                      todos={this.props.todos}
                      createTodo={this.createTodo}
                      startEditing={this.startEditing}
                      cancelEditing={this.cancelEditing}
                      editTodo={this.editTodo}
                      startTodo={this.startTodo}
                      stopTodo={this.stopTodo}
                      completeTodo = {this.completeTodo}
                      deleteTodo = {this.deleteTodo}
                  />
              </div>
            </div>
          );
        } else if (this.state.activePage == "projects") {
          // Implement this
          return (
            <div>
              <div style={titleStyle}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <Header as='h2' textAlign='left'>
                    <Header.Content>JustDoIt</Header.Content>
                  </Header>
                </div>
                <Menu secondary style={{display: 'flex', justifyContent: 'center'}}>
                  <Menu.Item
                    name='today'
                    active={activePage === 'today'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name='projects'
                    active={activePage === 'projects'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name='add'
                    active={activePage === 'add'}
                    onClick={this.handleItemClick}
                  />
                </Menu>
                
              </div>
              
              <div>
                {/* This maps the projects recieved as a prop */}
                <Menu>
                  {this.props.projects.map(p => {
                    return <Menu.Item
                      name = {p.name}
                      //active={activePage === 'add'}
                      onClick = {this.handleProjectClick}
                    />
                  })}
                </Menu>
              </div>

              <div className="todo-container">
                  <TodoTableAll
                      todos={this.props.todos}
                      createTodo={this.createTodo}
                      startEditing={this.startEditing}
                      cancelEditing={this.cancelEditing}
                      editTodo={this.editTodo}
                      startTodo={this.startTodo}
                      stopTodo={this.stopTodo}
                      completeTodo = {this.completeTodo}
                      deleteTodo = {this.deleteTodo}
                  />
              </div>
            </div>
          );
        }
        else if (this.state.activePage == "add") {
          return (
            <div>
              <div style={titleStyle}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <Header as='h2' textAlign='left'>
                    <Header.Content>JustDoIt</Header.Content>
                  </Header>
                </div>
                <Menu secondary style={{display: 'flex', justifyContent: 'center'}}>
                  <Menu.Item
                    name='today'
                    active={activePage === 'today'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name='projects'
                    active={activePage === 'projects'}
                    onClick={this.handleItemClick}
                  />
                  <Menu.Item
                    name='add'
                    active={activePage === 'add'}
                    onClick={this.handleItemClick}
                  />
                </Menu>
              </div>

              <CreateProject createProject={this.createProject}/>
            </div>
          );
        }
    }
}

// Define the property types of this Container Component

TodoContainer.propTypes = {
    actions: PropTypes.object.isRequired,
    projectActions: PropTypes.object.isRequired,
    todos: PropTypes.array.isRequired,
    projects: PropTypes.array.isRequired

}

// This maps the state to the property of the component

function mapStateToProps(state, ownProps) {
    return {
        todos: state.todos,
        projects: state.projects
    }
}

// This maps the dispatch to the property of the component

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(TodoActions, dispatch),
        projectActions: bindActionCreators(ProjectActions, dispatch)
    }
}

// The connect function connects the Redux Dispatch and state to the Todo Container Component.
// Without this the Component wont be functional.

export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);
