import React from "react";
import { Button } from "react-materialize";
import axios from 'axios';

class FactForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fact: '',
      tags: [{tag1:'', tag2: '', tag3:''}],
      supporting: [{sup1:'', sup2:''}],
      conflicting: [{con1:'', con2:''}],
      topicID: this.props.topic,
    };

     this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  
  }



  handleSubmit(event) {
    console.log(this.state.fact);

  }


  render() {

    return (
      <form target="_blank" action="/addfact" method="POST" onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" name="fact" value={this.state.fact} onChange={this.handleChange} />
        </label>
        <label>
          Tag 1:
          <input type="text" name="tags" value={this.state.tags.tag1} onChange={this.handleChange} />
        </label>
        <label>
          Tag 2: 
          <input type="text" name="tags" value={this.state.tags.tag2} onChange={this.handleChange} />
        </label>
        <label>
          Tag 3: 
          <input type="text" name="tags" value={this.state.tags.tag3} onChange={this.handleChange} />
        </label>
        <label>
          Supporting:
          <input type="text" name="supporting" value={this.state.supporting.sup1} onChange={this.handleChange} />
        </label>
        <label>
          Supporting:
          <input type="text" name="supporting" value={this.state.supporting.sup2} onChange={this.handleChange} />
        </label>
        <label>
          Conflicting:
          <input type="text" name="conflicting" value={this.state.conflicting.con1} onChange={this.handleChange} />
        </label>
        <label>
          Conflicting:
          <input type="text" name="conflicting" value={this.state.conflicting.con2} onChange={this.handleChange} />
        </label>
        <label>
          <input type="hidden" name="topicID" value={this.props.topic} />
        </label>
        <Button waves='light' type="submit" onClick="">Submit</Button>
      </form>
    );
  }
}

export default FactForm;