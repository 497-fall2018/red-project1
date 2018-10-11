
import React, {Text, Component} from 'react';

import {Button, Icon, Label, Menu, Table} from 'semantic-ui-react'
import {Input} from 'semantic-ui-react'

class StartTodo extends Component {

    constructor(props) {
        super(props);
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
                <Table.Cell>
                  <Button className="option-buttons" color='red' onClick={this.stopTodo}>DONE</Button>
                </Table.Cell>
            </Table.Row>
        )
    }
}

export default StartTodo;
