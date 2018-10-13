
import React, {Component} from 'react';

import {Button, Icon, Label, Menu, Table} from 'semantic-ui-react'
import TodoRow from './todoRow'
import EditTodo from './editTodo'
import StartTodo from './startTodo'
import moment from 'moment';


// TodoTable is a Stateless component

const TodoTable = (props) => {
    var today_date = new moment().format("ddd, MMM DD");
    return (
        <Table celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell>Title</Table.HeaderCell>
                    <Table.HeaderCell>Duration</Table.HeaderCell>
                    <Table.HeaderCell>Date</Table.HeaderCell>
                    <Table.HeaderCell>Options</Table.HeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>

                {/* This maps the todos recieved as a prop */}

                {props
                    .todos
                    .map(t => {
                      if (moment(t.date).format("ddd, MMM DD") == today_date) {
                        // If the todo is being edited, EditTodo Component is rendered here

                        if (t.editing) {
                            return <EditTodo
                                editTodo={props.editTodo}
                                cancelEditing={e => props.cancelEditing(t._id)}
                                key={t._id}
                                todo={t}/>
                        } else if (t.active) {
                            return <StartTodo
                                startTodo={e => props.startTodo(t._id)}
                                stopTodo={e => props.stopTodo(t._id)}
                                key={t._id}
                                todo={t}/>
                        } else {

                            // Is the todo is not being edited the TodoRow stateless component is returned

                            return <TodoRow
                                todo={t}
                                key={t._id}
                                startTodo={e => props.startTodo(t._id)}
                                stopTodo={e => props.stopTodo(t._id)}
                                completeTodo={e => props.completeTodo(t)}
                                startEditing={e => props.startEditing(t._id)}
                                deleteTodo={e=> props.deleteTodo(t)}
                            />
                        }
                      }
                    })}

                {/* This EditTodo component is used as a Create new Todo Component */}
                {/* Thus by using the same component for both use, we can reuse a lot of the codes */}

                <EditTodo createTodo={props.createTodo} />
            </Table.Body>

        </Table>
    )
}

export default TodoTable;
