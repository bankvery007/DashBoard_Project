import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import SignIn_Admin from './Signin_Admin';
import Signin_Teacher from './Signin_Teacher';
import Card from 'react-bootstrap/Card';

function SignInHome() {
  return (
    
    <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="home" title="แอดมิน">
        <SignIn_Admin />
      </Tab>
      <Tab eventKey="profile" title="Profile">
        <Signin_Teacher />
      </Tab>
     
    </Tabs>

    
  );

  
}

export default SignInHome;