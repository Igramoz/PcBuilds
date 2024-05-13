import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import React from "react";

function App() {

  if(localStorage.getItem('name') === null || localStorage.getItem('email') === null || localStorage.getItem('picture') === null){
    return (
      
      <Router>
        <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="*" element={<Login/>} />
        </Routes>
      </Router>
      
    );
    
  }else{
    return (
      
      <Router>
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/home/builds" element={<Home path = '/builds'/>} />
          <Route path="/" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="*" element={<Login/>} />
          <Route path="/home/profile" element={<Home path='/profile' />} /> 
          <Route path="/home/mybuilds" element={<Home path='/mybuilds' />} />
        </Routes>
      </Router>
      
    );
  }
  
}

export default App;