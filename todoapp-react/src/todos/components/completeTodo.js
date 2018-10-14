
import React, {Component} from 'react';
import Popup from "reactjs-popup";
import moment from 'moment'

import {Button, Table} from 'semantic-ui-react'

// The Complete Todo component is a simple stateless component, It simply takes the props
// and maps the specific events to the methods of parent component

const CompleteTodo = (props) => {

    // format: Sat, Oct 13
    // currently, props.todo.date is a string
    // convert it to a moment for formatting
    var displayDate = moment(props.todo.date).format("ddd, MMM DD")

    return (

        // getClass Name assigns the class names of this element

        <Table.Row className={getClassName(props)}>
            <Table.Cell>{props.todo.title}</Table.Cell>
            <Table.Cell>{props.todo.duration}</Table.Cell>
            <Table.Cell>{displayDate}</Table.Cell>
            <Table.Cell className="options">
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

export default CompleteTodo;
