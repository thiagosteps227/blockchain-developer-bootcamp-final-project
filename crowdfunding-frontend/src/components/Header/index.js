import React from 'react';

import { Link } from 'react-router-dom';

//components 

import { Wrapper, Content, LogoImg, TMDBLogoImg } from './Header.styles';


const Header = () => (

  <Wrapper>
    <Content>
      <Link to='/'>
          <h1>Crowdfunding Application</h1>
      </Link>
    </Content>
  </Wrapper>
);

export default Header;