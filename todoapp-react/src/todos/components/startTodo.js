
import React, {Text, Component} from 'react';

import {Button, Icon, Label, Menu, Table, Modal} from 'semantic-ui-react'
import {Input} from 'semantic-ui-react'
import moment from 'moment';

class StartTodo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTime: "00:00:00",
            interval: setInterval(this.addTime, 1000),
            inProgress: true,
            overTime: false
        }
    }



    addTime = () => {
        var time = this.state.currentTime.split(":");
        var totalseconds = (parseInt(time[0]) * 3600) + (parseInt(time[1]) * 60) + parseInt(time[2]);
        totalseconds++;

        var hours = (Math.floor(totalseconds / 3600)).toString();
        var minutes = (Math.floor((totalseconds - (3600 * hours)) / 60)).toString();
        var seconds = (Math.floor(totalseconds - (3600 * hours) - (60 * minutes))).toString();

        if (hours.length == 1) { hours = "0" + hours; }
        if (minutes.length == 1) { minutes = "0" + minutes; }
        if (seconds.length == 1) { seconds = "0" + seconds; }
        var newTime = hours+":"+minutes+":"+seconds;
        this.setState({currentTime : newTime});

        if (newTime == this.props.todo.duration) {
          this.setState({overTime: true});
        }
    }

    // Start and Stop
    startTodo = () => {
      this.props.startTodo();
    }

    stopTodo = () => {
      clearInterval(this.state.interval);
      this.props.stopTodo();
    }

    completeTodo = () => {
      clearInterval(this.state.interval);
      this.props.stopTodo();
      this.props.completeTodo();
    }

    pause = () =>{
      this.setState({inProgress : false});
      this.setState({currentTime : this.state.currentTime});
      clearInterval(this.state.interval);
    }

    continue=()=>{
      this.setState({inProgress : true});
      this.setState({interval:setInterval(this.addTime, 1000) })
    }

    render() {
      if (this.state.overTime) {
        return (
          <Table.Row negative>
              <Table.Cell>{this.props.todo.title}</Table.Cell>
              <Table.Cell>{this.props.todo.duration}</Table.Cell>
              <Table.Cell>{moment(this.props.todo.date).format("ddd, MMM DD")}</Table.Cell>
              <Table.Cell>
                <Label size="huge">{this.state.currentTime}</Label>
                {this.state.inProgress && <Button className="option-buttons" color='red' onClick={this.pause}>PAUSE</Button>}
                {!this.state.inProgress && <Button className="option-buttons" color='red' onClick={this.continue}>CONTINUE</Button>}
                <Button className="option-buttons" color='red' onClick={this.stopTodo}>STOP</Button>
                <Button className="option-buttons" color='red' onClick={this.completeTodo}>DONE</Button>
              </Table.Cell>
          </Table.Row>
        )
      } else {
        return (
          <Table.Row positive>
              <Table.Cell>{this.props.todo.title}</Table.Cell>
              <Table.Cell>{this.props.todo.duration}</Table.Cell>
              <Table.Cell>{moment(this.props.todo.date).format("ddd, MMM DD")}</Table.Cell>
              <Table.Cell>
                <Label size="huge">{this.state.currentTime}</Label>
                {this.state.inProgress && <Button className="option-buttons" color='red' onClick={this.pause}>PAUSE</Button>}
                {!this.state.inProgress && <Button className="option-buttons" color='red' onClick={this.continue}>CONTINUE</Button>}
                <Button className="option-buttons" color='red' onClick={this.stopTodo}>STOP</Button>
                <Button className="option-buttons" color='red' onClick={this.completeTodo}>DONE</Button>
              </Table.Cell>
          </Table.Row>
        )
      }
    }

}

export default StartTodo;
