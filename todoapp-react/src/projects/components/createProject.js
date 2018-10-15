import React, {Component} from 'react';
import {Input, Button} from 'semantic-ui-react'

class CreateProject extends Component {

    constructor(props) {
        super(props);
        // If props.todo exists this component is used to  Edit a Todo,
        // else this is a Create New Todo Component

        this.state = {
            ...this.emptyProject(),
        }
    }

    //Initializes a Empty Project Object

    emptyProject = () => {
        return {name: ""}
    }

    changeNewProject = (event) => {
        this.setState({name: event.target.value})
    }

    createProject = (event) => {
        
        if (this.state.name != "") {
            //this.resetProject();
            this.props.createProject(this.state);
        }
    }

    // Modifying the inputs indirectly methods

    resetProject = () => {
        this.setState({name: ""})
    }

    render() {
        return (
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <Input
                  placeholder='New Project Name'
                  value={this.state.name}
                  onChange={this.changeNewProject}
                  />
                  <Button color='green' onClick={this.createProject}>Create</Button>
              </div>
        )
    }
}

export default CreateProject;