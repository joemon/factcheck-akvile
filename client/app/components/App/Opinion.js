import React, { Component } from "react";
import { Row, Input } from 'react-materialize';
import CircularProgressbar from 'react-circular-progressbar';

const percentage = Math.floor(Math.random() * Math.floor(100));

//component showing a visual reprentation of people's ratings
class Opinion extends React.Component {
	render() {
		return(
			 <div style={{ width: '85px' }}>
		<h3>True</h3>
 		<CircularProgressbar
  		percentage={percentage}
  		text={`${percentage}% `}
  		styles={{
    	path: { stroke: `rgba(62, 152, 199, ${percentage / 100})` },
    	text: { fill: '#f88', fontSize: '20px' },
  		}}
		/>
			</div>
		);
	}
}

export default Opinion;