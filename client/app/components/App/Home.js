import React, { Component } from "react";
import { Row, Col, CardPanel } from 'react-materialize';


import Footerr from "../Footer/Footer";
import NavBar from "../Header/NavBar";
import FactCheck from "./FactCheck";
import GoogleSearch from "./GoogleSearch";
import Topics from './Topics';




const Home = ({ children }) => (

<div className="blue lighten-5">
  <NavBar />
    <Row>
      <Col className="blue lighten-5" s={12} m={6}>
        <GoogleSearch />
      </Col>
      <Col className="blue lighten-5 black-text" s={12} m={6}>
         <Topics/>
      </Col>
    </Row>
  <Footerr />
</div>
);

export default Home;
