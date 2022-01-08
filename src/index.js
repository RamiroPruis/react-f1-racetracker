import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './App';
import Home from './pages/Home';
import View from './pages/View';
import Error from './pages/Error'


ReactDOM.render(
  <Router>
    <Routes>
      <Route path='/' element={<App/>}>
        <Route index element={<Home/>}/>  
      </Route>
      <Route path='view' element={<View/>} />
      <Route path='error' element={<Error/>} />
      <Route path='*' element={<Navigate replace to='/'/>} />
    </Routes>
  </Router>,
  document.getElementById('root')
);

