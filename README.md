<div align=center>

# PcBuilds

</div>


<h3>General Info<h3>

PcBuilds is a WebApp that enables users to create a customized computer.

<br>

<div align=center>

## Architecture

</div>

<!-- react -->

<div align=center>
<img alt='React logo' src='https://avatars.githubusercontent.com/u/6412038?s=280&v=4' width='60' height='60'>
</div>
<br>

[React](https://react.dev/) a Javascript FrameWork for frontend development.
<br>
<br>

<!-- nodejs -->

<div align=center>
<img alt='Node logo' src='https://nodejs.org/static/images/logo.svg' width='80' height='80'>
</div>
<br>

[Node.js](https://nodejs.org/en/) a Javascript runtime for backend development.
<br>
<br>

<!-- Express -->

<div align=center>
<img alt='Express logo' src='https://expressjs.com/images/express-facebook-share.png' width='110' height='60'>
</div>
<br>

[Express](https://expressjs.com/) a Node.js framework for backend development (Api).
<br>
<br>

<!-- mysql -->

<div align=center>
<img alt='Mysql logo' src='https://www.mysql.com/common/logos/logo-mysql-170x115.png' width='110' height='90'>
</div>
<br>

[Mysql](https://www.mysql.com/) a relational database management system.
<br>
<br>

<!-- bootstrap -->

<div align=center>
<img alt='Bootstrap logo' src='https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-social-logo.png' width='60' height='60'>
</div>
<br>

[Bootstrap](https://getbootstrap.com/) a css framework for frontend development.
<br>
<br>

<div align=center>

## Login/Register System

</div>
<br>

<!-- google login  -->

<div align=center>
<img alt='Google logo' src='https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png' width='200' height='70'>
</div>

<br>

[Google Login](https://developers.google.com/identity/sign-in/web/sign-in) is a google authentication service for login and register users in the app, it uses OAuth 2.0 protocol to authenticate users and get their information from google account providing a secure and easy way to login in the app, it also provides a way to get the user's email, name and profile picture.

<br>

<!-- google login in react -->
```
    import { GoogleLogin } from 'react-google-login';

    <GoogleOAuthProvider clientId="300229583546-cngao9upouq4souc4tree2umffabf9h5.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={credentialResponse => {

                    // the user is logged in and the credentialResponse contains the user's information
                
                }}
                onError={() => {
                
                    // an error occurred while trying to login the user

                }}
            />
    </GoogleOAuthProvider>
```
<br>

<div align=center>

```mermaid
graph TD;
    WebAppLogin-->GoogleApi;
    GoogleApi-->ReturnSuccess;
    GoogleApi-->ReturnError;
    ReturnError-->DisplayError;
    ReturnSuccess-->Api/login;
    Api/login-->ReturnToken;
    ReturnToken-->WebAppHome;
```



</div>

