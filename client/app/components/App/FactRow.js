import React from 'react';
import { Button, Modal } from 'react-materialize';

class FactRow extends React.Component {

	//display the google link in a separate window
	readMore(){
	
		const url = this.props.fact.link
		var mywindow = window.open(url, 'window', "menubar=1, resizable=1, width=700,height=500");
		mywindow.moveTo(700,10);
	}


	render() {
		return  <table key={this.props.fact.id}>
			  <tbody>
				<tr>
					<td>
					<h5>{this.props.fact.title}</h5>
					<p>{this.props.fact.link}</p>
					<p>{this.props.fact.snippet}</p>
					<p>{this.props.fact.overview}</p>
					</td>
					 <div>
			
    				<Button waves='light' onClick={this.readMore.bind(this)} type='submit' target='_blank'> Read </Button>
    				</div>
				</tr>
			  </tbody>
			</table>
		
	}
}

export default FactRow;