import {React} from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import ProfileImage from './ProfileImage';
import { useNavigate } from "react-router-dom";
import DisplayError from './DisplayErrors';



const NavbarComponent = ({Name, Picture, }) => {

  const Navigate = useNavigate();

  function Logout(){
    
    localStorage.clear();
    Navigate('/');
  }

  function Home(){
    Navigate('/home');
  }

  function AllComponents(){
    Navigate('/home/builds');
  }

  function MyBuilds(){
    Navigate('/home/mybuilds');
  }


  const home = {
    cursor: 'pointer'
  }



  return (
    <div>
        <Navbar bg="gray" expand="lg" style={{marginLeft: '1%'}}>
          
          <Navbar.Brand onClick={Home} style={home}>Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={AllComponents}>All Components</Nav.Link>
              <Nav.Link onClick={MyBuilds}>My Builds</Nav.Link>
              <Nav.Link onClick={Logout}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
            
            <span style={{marginRight: '1%'}} >{Name}</span>
            <ProfileImage Picture={Picture} />
            

        </Navbar>
      
    </div>
  );
};

export default NavbarComponent;