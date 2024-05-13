import React from 'react';
import Background from '../components/background';
import Oauth from '../components/googleoauth';

function LoginPage() {
  const imageSrc = '/assets/pcbuilds.png';


  return (
    <Background imageSrc={imageSrc} children = {<Oauth DocumentTitle = {"Accedi - PcBuilds"} SignInUp={"login"}/>} TitleText = {"Accedi a PcBuilds"} SignText = {"Devi registrarti ? Clicca Qui"} link = {"/register"}>
      
    </Background>
  );
}

export default LoginPage;