import React, { Component } from 'react';
import { Icon, Modal, Button } from 'react-materialize';
import $ from 'jquery';
import DataRow from './DataRow';
import axios from 'axios';
import FactForm from './FactForm';
import TopicForm from './TopicForm';



class FactView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [], 
      /*topic: props.topic, */ 
      topic: '', 
    } ;
    
  }
  

  //get all the results
  componentDidMount() {
  console.log(this.props.params.id);
   /* var id = this.state.topic*/
   console.log("cia mano state " + this.props.topic)
   console.log("cia mano antra state" + this.state.topic)
  /* console.log(this.props.match.params.id);
   console.log(this.props.match.params.topic);*/
    axios.get('/tagspath', {
      params:{
        topicID: props.topic,
      }
    }).then(res => {
    
    const items = res.data
    var factCards = []

    items.forEach((fact) => {
    const singleFact = <DataRow key={fact.id} info = {fact}/>
    factCards.push(singleFact)
    })

    this.setState({facts: factCards});
    
    });
    
  }

 

render() {

return (
      <div>
        
        <table className="titleBar">
          <tbody>
              <td width="4"/>
             {this.state.facts}
          </tbody>
        </table>
     
      </div>
      )
  }
}

export default FactView;

