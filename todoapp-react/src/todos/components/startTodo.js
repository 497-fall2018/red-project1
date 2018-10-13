
import React, {Text, Component} from 'react';

import {Button, Icon, Label, Menu, Table} from 'semantic-ui-react'
import {Input} from 'semantic-ui-react'
import moment from 'moment';

class StartTodo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTime: this.props.todo.duration,
            interval: setInterval(this.diminishTime, 1000)
        }
    }



    diminishTime = () => {
      if(this.state.currentTime=="00:00:00"){
          clearInterval(this.state.interval);
          this.setState({currentTime :"00:00:00"});
      }
      else{
      var time = this.state.currentTime.split(":");

      var totalseconds = (parseInt(time[0]) * 3600) + (parseInt(time[1]) * 60) + parseInt(time[2]);
      totalseconds--;

      var hours = (Math.floor(totalseconds / 3600)).toString();
      var minutes = (Math.floor((totalseconds - (3600 * hours)) / 60)).toString();
      var seconds = (Math.floor(totalseconds - (3600 * hours) - (60 * minutes))).toString();

      if (hours.length == 1) { hours = "0" + hours; }
      if (minutes.length == 1) { minutes = "0" + minutes; }
      if (seconds.length == 1) { seconds = "0" + seconds; }
      this.setState({currentTime : hours+":"+minutes+":"+seconds});}

    }

    // Start and Stop
    startTodo = () => {
      this.props.startTodo();
    }

    stopTodo = () => {
      clearInterval(this.state.interval);
      this.props.stopTodo();
      //this.props.completeTodo();

    }

    pause = () =>{
        this.setState({currentTime : this.state.currentTime});
        clearInterval(this.state.interval);
    }

    continue=()=>{
        this.setState({interval:setInterval(this.diminishTime, 1000) })
    }




    render() {
        return (
            <Table.Row>
                <Table.Cell>{this.props.todo.title}</Table.Cell>
                <Table.Cell>{this.props.todo.duration}</Table.Cell>
                <Table.Cell>{moment(this.props.todo.date).format("ddd, MMM DD")}</Table.Cell>
                <Table.Cell>
                  <Label size="huge">{this.state.currentTime}</Label>
                  <Button className="option-buttons" color='red' onClick={this.pause}>PAUSE</Button>
                  <Button className="option-buttons" color='red' onClick={this.continue}>CONTINUE</Button>
                  <Button className="option-buttons" color='red' onClick={this.stopTodo}>DONE</Button>
                </Table.Cell>
            </Table.Row>
        )
    }

}

export default StartTodo;
