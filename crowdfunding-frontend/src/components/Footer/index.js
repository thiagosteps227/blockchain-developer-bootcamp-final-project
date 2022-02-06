import React from 'react';

import { Link } from 'react-router-dom';

//components 
import { Wrapper, Content } from './Footer.styles.js';


const Footer = () => (

  <Wrapper>
    <Content>
      <a color="white" href="https://www.ait.ie"  >TUS</a><p>&reg; MSc in Software Engineering 2022</p>
    </Content>
  </Wrapper>
);

export default Footer;