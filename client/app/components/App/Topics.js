import React, { Component } from "react";
import { Row, Col, CardPanel, Modal, Button, Card } from 'react-materialize';
import { Link } from 'react-router-dom';
import FactRow from "./FactRow";
import axios from 'axios';
import SingleTopic from  './SingleTopic';
import TopicForm from './TopicForm';
import FactForm from './FactForm';


class Topics extends React.Component {
   constructor(props) {
    super(props);

  
    this.state = {
      topics: []
    };
  }

   componentDidMount() {
    axios.get('/tagsabc')
    .then(res => {
      this.setState({topics: res.data});
   
    });
  }


  render() {

    return(
      <div>
        <div className="blue lighten-5">
                <ul>
                    <h3>Topics</h3>

                    
                      {this.state.topics.map(item =>
                        <li key={item.id}>
                          
                          <div>
                            <strong>
                              <a href={"/topic/"+ item._id}>{item.topic}</a>
                                
                                <Modal
                                  header='Add a fact to check'
                                  fixedFooter
                                  trigger={<Button>Add a fact for {item.topic}</Button>}>
                                <FactForm topic = {item._id} />
                                </Modal>
                               

                                <hr />
                            </strong> 
                          </div>
                        </li>       
                      )}

                </ul>
                
                      <Modal
                          header='Add a topic'
                          fixedFooter
                          trigger={<Button>Add a topic</Button>}>
                            <TopicForm />
                      </Modal>
                              
        </div>
      </div>
    );
  }
}

export default Topics;

