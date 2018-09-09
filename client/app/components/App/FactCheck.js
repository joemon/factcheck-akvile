import React from 'react';
import { Icon, Modal, Button } from 'react-materialize';
import $ from 'jquery';
import DataRow from './DataRow';
import axios from 'axios';
import FactForm from './FactForm';
import TopicForm from './TopicForm';



class FactCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	items: []
    } ;
    this.search('');

  }

  //get all the results
  search(query) {
    axios.get('/tagpath', {
      params:{
        tags: query,
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

    
  handleChange(event) {
      const query = event.target.value
      this.search(query)
  }

  render() {

 return (
      <div>
        
        <table className="titleBar">
          <tbody>
              <td width="4"/>
                <h4>Search our fact database</h4>
          </tbody>
        </table>

        <input onChange={this.handleChange.bind(this)} placeholder="Search our community database"/>
        	<div>
            <Modal
              header='Add a topic'
              fixedFooter
              trigger={<Button>Add a topic</Button>}>
                <TopicForm />
            </Modal>
      		</div>
     {this.state.facts}
      </div>
      )
  }
}

export default FactCheck;
