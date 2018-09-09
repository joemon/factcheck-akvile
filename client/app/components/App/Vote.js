import React, { Component } from "react";
import { Row, Input } from 'react-materialize';

class Vote extends React.Component {
	render() {
		return(
			<div>
				
       		 <Row>
				  <Input s={12} type='select' label="Materialize Select" defaultValue='Please Vote'>
				    <option value='1'>True</option>
				    <option value='2'>Almost True</option>
				    <option value='3'>Hard to Tell</option>
				    <option value='4'>Mostly False</option>
				    <option value='5'>False</option>
				  </Input>
			</Row>
			</div>
		);
	}
}

export default Vote;