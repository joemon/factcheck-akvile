import React from "react";
import { Button } from "react-materialize";
import axios from 'axios';

class TopicForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: '',
    };

    /*this.addTopic = this.addTopic.bind(this);*/
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value.toUpperCase()});
  }


  handleSubmit(event) {
    alert('A topic has been submitted: ' + this.state.topic);
   /* event.preventDefault();*/
    console.log(this.state.topic);
    addTopic();
 }

  render() {
    return (
      <form action="/addtopic" method="POST" onSubmit={this.handleSubmit}>
        <label>
          <input type="text" placeholder="topic" name="topic" value={this.state.topic} onChange={this.handleChange} />
        </label>
              <Button waves='light' type="submit" onClick="">Submit</Button>
      </form>
    );
  }
}

export default TopicForm;