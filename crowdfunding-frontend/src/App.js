import React from 'react';

import './App.css';
import Home from './components/Home';

//routing
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//styles
import { GlobalStyle } from './GlobalStyle';

//components
import Header from './components/Header';
import BreadCrumb from './components/BreadCrumb';
import Admin from './components/Admin';

const App = () => (
  <Router>
    <Header />
    <BreadCrumb/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
    <GlobalStyle />
  </Router>
  );

export default App;
