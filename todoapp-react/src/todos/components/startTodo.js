
import React, {Text, Component} from 'react';

import {Button, Icon, Label, Menu, Table} from 'semantic-ui-react'
import {Input} from 'semantic-ui-react'

class StartTodo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTime: this.props.todo.duration
        }
        //setInterval(this.diminishTime, 1000);
    }

    diminishTime = () => {
      //hrs_string = this.state.currentTime[0:2]
    }

    // Start and Stop
    startTodo = () => {
      this.props.startTodo();
    }

    stopTodo = () => {
      this.props.stopTodo();
    }

    render() {
        return (
            <Table.Row>
                <Table.Cell>{this.props.todo.title}</Table.Cell>
                <Table.Cell>{this.props.todo.description}</Table.Cell>
                <Table.Cell>{this.props.todo.duration}</Table.Cell>
                <Table.Cell>{this.props.todo.date}</Table.Cell>
                <Table.Cell>
                  <Label size="huge">{this.state.currentTime}</Label>
                  <Button className="option-buttons" color='red' onClick={this.stopTodo}>STOP</Button>
                  <Button className="option-buttons" color='red' onClick={this.stopTodo}>DONE</Button>
                </Table.Cell>
            </Table.Row>
        )
    }
}

export default StartTodo;
