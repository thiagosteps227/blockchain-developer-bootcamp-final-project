import React from 'react';
import { Link } from 'react-router-dom';
//styles
import { Wrapper, Content } from './BreadCrumb.styles';


const BreadCrumb = () => (
  <Wrapper>
    <Content>
      <Link to='/'>
        <span>Home</span>  
      </Link>
        <span>|</span>
      <Link to='/admin'>
        <span>Admin</span> 
      </Link>  
    </Content> 
  </Wrapper>
);


export default BreadCrumb;


