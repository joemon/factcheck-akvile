import React from 'react';
import { Footer } from 'react-materialize'; 

const Footerr = () => (
  	<Footer className="teal" copyrights="2018 Akvile Kurilaite © Glasgow University"
  links={
    <ul>
      <li><a className="black-text text-lighten-3" href="http://www.instagram.com">Instagram</a></li>
      <li><a className="black-text text-lighten-3" href="http://www.twitter.com">Twitter</a></li>
      <li><a className="black-text text-lighten-3" href="http://www.facebook.com">Facebook</a></li>
      <li><a className="black-text text-lighten-3" href="mailto:kurakvile@gmail.com">Contact us</a></li>
    </ul>
  }
  className='example'
>
    <h5 className="black-text">FactCheck</h5>
    <p className="lighten-4 black-text text-lighten-4">Community based fact-checking website. Please join us today!</p>
</Footer>
);

export default Footerr;
