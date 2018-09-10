import React, { Component } from "react";
import Footerr from "../Footer/Footer";
import NavBar from "../Header/NavBar";
import { Row, Col, Modal, Button } from 'react-materialize';
import axios from 'axios';
import FactForm from  './FactForm';
import { Link } from "react-router-dom";
import FactCheck from './FactCheck';
import FactView from './FactView';


class SingleTopic extends React.Component {
   constructor(props) {
    super(props);
    this.state = {
      _id : props._id,
      topic : '',
    };
  }

   componentDidMount() {
    var id = this.props.match.params.id;
    axios.get('/topics/' + id).then(res => {
      this.setState({topic: res.data});
    });
  }


  openLink(){
    const url ="/topic/" + this.state.topic._id
    var mywindow = window.open(url, 'window', "menubar=1, resizable=1, width=700,height=500");
    mywindow.moveTo(100,10);
  }


  render() {
  
    return(
      <div>
        <div className="blue lighten-5">
          <NavBar />
                <h5>Facts for: {this.state.topic.topic}</h5>
                   
                <FactView topic= {this.state.topic._id} />
                   
          <Footerr />
        </div>
      </div>
    );
  }
}


export default SingleTopic;

