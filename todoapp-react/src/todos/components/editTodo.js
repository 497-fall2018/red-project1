
import React, {Component} from 'react';

import {Button, Icon, Label, Menu, Table} from 'semantic-ui-react'
import {Input} from 'semantic-ui-react'

//Import moment library for React Datepicker

import moment from 'moment';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

class EditTodo extends Component {

    constructor(props) {
        super(props);
        // If props.todo exists this component is used to  Edit a Todo,
        // else this is a Create New Todo Component

        if (this.props.todo) {
            this.state = {
                ...this.props.todo
            }
        } else {
            this.state = {
                ...this.emptyTodo(),
                invalidTitle: false,
                invalidDuration: false
            }
        }
    }

    //Initializes a Empty Todo Object

    emptyTodo = () => {
        return {title: "", date: moment(), duration: ""}
    }


    // Input change handling methods

    changeNewTitle = (event) => {
        this.setState({title: event.target.value})
    }


    changeNewDuration = (event) => {
      this.setState({duration: event.target.value})
    }

    changeNewDate = (event) => {
        this.setState({date: event})
    }

    // Form submission methods

    createTodo = (event) => {
        if (this.state.duration != "" && this.state.title != "") {
            if(!this.state.duration.match(/[0-9][0-9]:[0-6][0-9]:[0-6][0-9]/)) {
                this.setState({invalidDuration: true})
            }
            else {
                this.resetTodo()
                this.props.createTodo(this.state)
                this.setState({invalidTitle: false});
                this.setState({invalidDuration: false});
            }
        } else {          
            if ( (this.state.duration == "")) {
              this.setState({invalidDuration: true});
            }

            if (this.state.title == "") {
                this.setState({invalidTitle: true});
            }
        }
    }
    editTodo = (event) => {
        if(this.state.title != "" && this.state.duration != "") {
            if (!this.state.duration.match(/[0-9][0-9]:[0-6][0-9]:[0-6][0-9]/)) {
                this.setState({invalidDuration: true});
            }
            else
            {
                this.resetTodo();
                this.props.editTodo(this.state);
                this.setState({invalidTitle: false});
                this.setState({invalidDuration: false});
            }
        } else {
            if(this.state.title == "") {
                this.setState({invalidTitle: true});
            }
            if(this.setState.duration == "") {
                this.setState({invalidDuration: true});
            }
        }
    }


    // Modifying the inputs indirectly methods

    resetTodo = () => {
        this.setState({title: "", description: "", date: moment(), duration: ""})
    }
    cancelEditing = () => {
        this.props.cancelEditing();
    }

    // Convert the date to moment object for the React DatePicker

    getDateForDatePicker() {
        return moment(this.state.date)
    }

    render() {
        return (
            <Table.Row>

                <Table.Cell>

                    {/* The Value flows the data from the state to the control */}
                    {/* The onChange method pass the value from the Control to the State, It takes a method reference */}
                    {/* In this way a controlled two way binding is established */}

                    {!this.state.invalidTitle && <Input
                        placeholder='Title'
                        value={this.state.title}
                        onChange={this.changeNewTitle}/>}
                    {this.state.invalidTitle && <Input error
                        placeholder='Title'
                        value={this.state.title}
                        onChange={this.changeNewTitle}/>}
                </Table.Cell>

                <Table.Cell>
                    {!this.state.invalidDuration && <Input
                        placeholder='Duration (HH:MM:SS)'
                        value={this.state.duration}
                        onChange={this.changeNewDuration}/>}
                    {this.state.invalidDuration && <Input error
                        placeholder='Duration (HH:MM:SS)'
                        value={this.state.duration}
                        onChange={this.changeNewDuration}/>}
                </Table.Cell>

                <Table.Cell>

                    {/* React Datepicker gets the moment date from the class method */}

                    <DatePicker
                        selected={this.getDateForDatePicker()}
                        onChange={this.changeNewDate}/>
                </Table.Cell>

                {/* The options component takes the inputs and decide if It's an option for a Edit Todo or Add New Todo */}

                <Options
                    todo={this.props.todo}
                    editTodo={this.editTodo}
                    createTodo={this.createTodo}
                    resetTodo={this.resetTodo}
                    cancelEdit={this.cancelEditing}
                />

            </Table.Row>
        )
    }
}

export default EditTodo;


// The option component decides the component usage

const Options = (props) => {
    if (props.todo && props.todo.editing) {
        return EditOptions(props);
    } else {
        return AddOptions(props);
    }
}

// The two local components - EditOptions and AddOptions simply maps their events
// to the state events of their parent compoent through the props


const EditOptions = (props) => {
    return (
        <Table.Cell>
            <Button color='green' onClick={props.editTodo}>
                Edit
            </Button>
            < Button color='blue' onClick={props.cancelEdit}>
                Cancel
            </Button>
        </Table.Cell>
    );
}

const AddOptions = (props) => {
    return (
        <Table.Cell>
            <Button color='green' onClick={props.createTodo}>
                Create
            </Button>
            < Button color='blue' onClick={props.resetTodo}>
                Reset
            </Button>
        </Table.Cell>
    );
}
