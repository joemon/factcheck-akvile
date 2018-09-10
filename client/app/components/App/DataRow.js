import React from 'react';
import { Button, Modal, Input, Row, Col, Card, Tag, Chip} from 'react-materialize';
import Opinion from './Opinion';
import CircularProgressbar from 'react-circular-progressbar';

const percentage = Math.floor(Math.random() * Math.floor(100));


class DataRow extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			tags: [],
			supporting: [],
			conflicting: [],
			topicId: props.topic,
		};
		 this.handleChange = this.handleChange.bind(this);

	}


	handleChange(event) {
		this.setState({[event.target.name]: event.target.value});
	}

	onChange(event){
		console.log(event.target.name);
		console.log(event.target.value);
	}


	readMore(){

		const url = "http://localhost:8080/fact/" + this.props.info._id
		var mywindow = window.open(url, 'window', "menubar=1, resizable=1, width=700,height=500");
		mywindow.moveTo(100,10);
	}

	openLinkSupporting() {
		const url = this.props.info.supporting
		var mywindow = window.open(url, 'window', "menubar=1, resizable=1, width=700,height=500");
		mywindow.moveTo(100,10);
	}

	openLinkConf(){
		const url = this.props.info.conflicting
		var mywindow = window.open(url, 'window', "menubar=1, resizable=1, width=700,height=500");
		mywindow.moveTo(100,10);
	}

	openForm(){
		const url = "/tagform";
		var mywindow = window.open(url, 'window', "resizable=1, width=300,height=200");
		mywindow.moveTo(100,10);
	}

	render() {
		return ( 
			<div>
			<table key={this.props.info._id}>
			
  					<Col className="blue lighten-5" m={12} s={6} >
					    <Card className='red lighten-5' 
					    	textClassName='black-text' 
					    	title={this.props.info.fact} 
					     	actions={[<a href={this.props.info.topicID}>Comments</a>]}
					     	>
					    	<Button onClick={this.openForm.bind(this)}>Add a tag</Button>
					    	<Button>Add supporting link</Button>
					    	<Button>Add conflicting link</Button>
					    	
					    	<hr />
					    	 
							 <strong>Tags:</strong>
							 	<ul>{this.props.info.tags.map(item =>
                       				 <li key={item._id}>
                            		<Chip>	{item} </Chip>
                      				</li>
                      				)}
                     		</ul>

		                     <strong>Supporting links:</strong>
							<a href={this.props.info.supporting[0]} target="_blank"><p>{this.props.info.supporting[0]}</p></a>
							<a href={this.props.info.supporting[1]} target="_blank"><p>{this.props.info.supporting[1]}</p></a>
							
					


							<strong>Conflicting links:</strong>
							<a href={this.props.info.conflicting[0]} target="_blank"><p>{this.props.info.conflicting[0]}</p></a>
							<a href={this.props.info.conflicting[1]} target="_blank"><p>{this.props.info.conflicting[1]}</p></a>


							
					    </Card>
					</Col>
				</table>
		</div>
	
		);
		
	}
}

export default DataRow;

