import React, { useEffect } from 'react';
import Navbar from '../components/navbar';
import CreateBuild from '../components/createbuild';
import ShowComponents from '../components/MostraComponenti';
import Profile from './profile';
import ShowUsersBuilds from '../components/ShowUsersBuilds';



function LoginPage({path}) {

  const name = localStorage.getItem('name');
  const picture = localStorage.getItem('picture');

    useEffect(() => {
        document.title = "Home - PcBuilds";
        
    });

 
    if(path === '/builds'){
      return (
        <div>
          <Navbar Picture = {picture} Name = {name}></Navbar>
          <ShowComponents></ShowComponents>
          
        </div>
      );
    }else if(path === '/profile'){
      return (
        <div>
          <Navbar Picture = {picture} Name = {name}></Navbar>
          <Profile></Profile>
        </div>
      );
    }else if(path === '/mybuilds'){
      return (
        <div>
          <Navbar Picture = {picture} Name = {name}></Navbar>
          <ShowUsersBuilds></ShowUsersBuilds>
          
        </div>
      );
    }
    else{
      return (
        <div>
          <Navbar Picture = {picture} Name = {name}></Navbar>
          <CreateBuild></CreateBuild>
        </div>
      );
    
    }
}

export default LoginPage;
