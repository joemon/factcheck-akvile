import React from "react";
import { Button } from "react-materialize";
import axios from 'axios';

class TagForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: [],
    
    };

     this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }



  handleSubmit(event) {
   /* alert('A fact was submitted: ' + this.state.fact);*/
    event.preventDefault();
    this.setState({
        tags: ''
    })
  }


  render() {

    return (
      <form target="_blank" action="/addtag" method="POST" onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" placeholder="tag" name="tags" value={this.state.tags} onChange={this.handleChange} />
        </label>
        <Button waves='light' type="submit" onClick="">Submit</Button>
      </form>
    );
  }
}

export default TagForm;