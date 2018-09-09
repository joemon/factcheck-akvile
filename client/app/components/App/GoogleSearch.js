import React from 'react';
import { Icon } from 'react-materialize';
import $ from 'jquery';
import FactRow from './FactRow';

//based on https://www.youtube.com/watch?v=bqSSLr8A8PU&t=2071s tutorial

class GoogleSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.search("");

  }

  search(query) {
    const urlString = "https://www.googleapis.com/customsearch/v1?cx=004679158218604084037%3Ae7yynzeus6c&key=AIzaSyBzd1ByqUcvrq9pDViftUQLMDE3NqzbjyE&q=" + query
    $.ajax({
        url: urlString,
        success: (searchResults) =>{
        console.log("Data has been fetched successfully")
        const items = searchResults.items
        var factRows = []

          items.forEach((fact) => {
          const factRow = <FactRow key={fact.id} fact= {fact}/>
          factRows.push(factRow)
          })

          this.setState({facts: factRows})
        },
        error: (xhr, status, err) => {
          console.error("Error fetching data")
        }
    })
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
              <td>
                <img alt="app icon" width="30" src="binoculars.svg"/>
              </td>
              <td width="4"/>
                <h4>Search the Web</h4>
          </tbody>
        </table>

        <input onChange={this.handleChange.bind(this)} placeholder="Search the web"/>

        {this.state.facts}

      </div>
      )
  }
}

export default GoogleSearch;

