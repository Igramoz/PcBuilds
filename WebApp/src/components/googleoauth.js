import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";



function Oauth({DocumentTitle, SignInUp}) {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = DocumentTitle;
  });

  const checkDb = (gToken) => {

    if(SignInUp === "login"){

      fetch(`http://localhost:3001/login`, {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: gToken,
        })
      }).then(response => {
        if (response.status === 200) {
          // user is in db redirect to home
          
          navigate('/home');  
          
          
        } else if (response.status === 404) {
          
          // user is not in db
          DisplayError("Utente non registrato");

        } else {
          // error
          DisplayError("Errore durante il login");
        }
      });
    }else if(SignInUp === "register"){
      fetch(`http://localhost:3001/users`, {
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: gToken,
        })
      }).then(response => {
        if (response.status === 201) {
          // user is in db redirect to home
  
          navigate('/login');
          
        } else if (response.status === 401) {
          
          // user is not in db
          DisplayError("Errore di autenticazione, riprova a fare il login");
  
        } else {
          // error
          DisplayError("Errore durante la registrazione");
        }
      }); 
    }   
  }

  const DisplayError = (message) => {
    // add <div class="alert alert-danger" role="alert"> message </div>
    document.getElementById('error').innerHTML = message;
    
  }


  return (
    <GoogleOAuthProvider clientId="300229583546-cngao9upouq4souc4tree2umffabf9h5.apps.googleusercontent.com">
      <div className="container">
        <div className="row justify-content-center">
          <GoogleLogin
            onSuccess={credentialResponse => {
              const token = credentialResponse.credential;
                const decoded = jwtDecode(token);
                localStorage.setItem('email', decoded.email);
                localStorage.setItem('name', decoded.name);
                localStorage.setItem('picture', decoded.picture);

              checkDb(token);
            }}
            onError={() => {
              // add in span error message

              document.getElementById('error').innerHTML = "Errore durante il login";
            }}
            
          />
        </div>
        <br></br>
        <span id = "error"></span>
      </div>
    </GoogleOAuthProvider>
    

  );
}

export default Oauth;