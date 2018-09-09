import React, { Component } from "react";
import { Row, Col, CardPanel } from 'react-materialize';

import Footerr from "../Footer/Footer";
import NavBar from "../Header/NavBar";



class About extends Component {
	render() {
		return(
			<div>
				<div className="blue lighten-5">
					<NavBar />
						<Row>
    						<Col className="blue lighten-5" s={6} m={12}>
       		 
      							<h2>About</h2>
      							<p>Welcome to our community based fact-checking website!
      							We believe that in order to fight fake news the most important skill to develop 
      							is critical thinking. This website wants to encourage meaningful conversations
      							where people go to consider different sides of the story by exploring supporting 
      							and conflicting material provided by other users. In this way we encourage mindful
      							browsing, to double-check the site sources, and question your beliefs and bias.
      							</p>

      							<h5>FAQ</h5>
                    


      							<strong>How has this project come about?</strong>
      							<p>After extensive research on different
      							fact checking websites, the creators of this web page have decided to 
      							create a community based fact-checking website.
      							The project is still in its development stages trying to make sure that
      							we can bring the users the best possible experience.</p>

      							<strong>Why do I need to register with my name and last name?</strong>
      							<p>We want to encourage a dialogue and have respectful communication
      							on this platform. That is why we encourage our users to express themselves
      							using their real name and last name.</p>

      							<strong>How can you get ensure no bias?</strong>
      							<p>We are aiming to have people of all different beliefs, countries and backgrounds join us and
      							help us create an interesting and thought-provoking discussion on this platform.</p>

      							<strong>Who are your moderators?</strong>
      							<p>Our modetors are users who have shown initiative to help this cause by ensuring
      							that any suspicious or disrespectful activity is detected asap. Want to join the team? Please 
   								send us a message.</p>

      							<h5>Any other questions questions?</h5>
      							<p>Please drop us an <a href="mailto:kurakvile@gmail.com" target="_top">e-mail</a> or find us on social media.</p>
    						</Col>
    						<Col className="blue lighten-5 black-text" s={12} m={6}>
    	
    						</Col>
						</Row>
					<Footerr />
				</div>
			</div>
		);
	}
}

export default About;