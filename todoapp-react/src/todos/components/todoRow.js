
import React, {Component} from 'react';
import Popup from "reactjs-popup";
import moment from 'moment'

import {Button, Table} from 'semantic-ui-react'

// The Todo Row component is a simple stateless component, It simply takes the props
// and maps the specific events to the methods of parent component

const TodoRow = (props) => {

    // format: Sat, Oct 13
    var displayDate = moment(props.todo.date).format("ddd, MMM DD")

    return (

        // getClass Name assigns the class names of this element
        <Table.Row>
            <Table.Cell>{props.todo.title}</Table.Cell>
            <Table.Cell>{props.todo.duration}</Table.Cell>
            <Table.Cell>{displayDate}</Table.Cell>
            {/*<Table.Cell>{props.todo.date}</Table.Cell>*/}
            <Table.Cell className="options">
                <Button className="option-buttons" color='blue' onClick={props.startTodo}>START</Button>
                {props.todo.status != 'done' && <Button className="option-buttons" color='green' onClick={props.completeTodo}>
                    <i className="fa fa-check"></i>
                </Button>}
                <Button className="option-buttons" color='blue' onClick={props.startEditing}>
                    <i className="fa fa-pencil"></i>
                </Button>
                <Button className="option-buttons" color='red' onClick={props.deleteTodo}>
                    <i className="fa fa-trash"></i>
                </Button>
            </Table.Cell>
        </Table.Row>
    );
}


// Right now Updating, done and deleting these three states are represented with different Class Name

const getClassName = (props) => {
    return `

    ${props.todo.updating
        ? "updating"
        : ""}
    ${props.todo.status == 'done'
            ? "done"
            : ""}
    ${props.todo.deleting
                ? "deleting"
                : ""}
    `
}

export default TodoRow;
