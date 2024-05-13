import React from 'react';
import Background from '../components/background';
import Oauth from '../components/googleoauth';

function LoginPage() {
  const imageSrc = '/assets/pcbuilds.png';
  
  

  return (
    <Background imageSrc={imageSrc} children = {<Oauth DocumentTitle = {"Registrati - PcBuilds"} SignInUp={"register"} />} TitleText = {"Registrati a PcBuilds"} SignText = {"Devi accedere ? Clicca Qui"} link = {"/"}>
      
    </Background>
  );
}

export default LoginPage;