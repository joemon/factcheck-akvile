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
      topic: '',
    } ;
  }
  

  //get all the results by the topic
  componentDidUpdate() {
    axios.get('/tagspath', {
      params:{
        topicID: this.props.topic,
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

