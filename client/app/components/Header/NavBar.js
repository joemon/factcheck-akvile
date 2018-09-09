import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Button, NavItem, Icon, Modal} from 'react-materialize';
import User from '../App/User';



class NavBar extends Component {
  render() {
   		return(
       <nav>
        <div className="teal lighten-2">
        <div className = "row">
        <a href="/" className="brand-logo col s3 offset-s1 black-text text-darken-2 ">FactCheck</a>
        <ul id="nav-mobile" className="right hide-on-med-and-down col s5">
        <li><a href="/">Home</a></li>
        <li><a href="./about">About us</a></li>
        <User />
        
      </ul>

    
     
    </div>
    </div>
  </nav>
      );
  }
}

export default NavBar;