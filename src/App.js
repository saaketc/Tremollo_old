import React, { useState, useEffect } from 'react';
import {  ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {Route, Switch} from 'react-router-dom';
import Feed from './components/feed';
import Welcome from './components/welcome';
import Navbar from './components/common/navbar';
// import { Logo } from './logo/tremollo_logo.svg';
import CreateStudio from './components/studio/createStudio';
import Studio from './components/studio/studio';
import Login from './components/auth/login';
import Signup from './components/auth/signup';

function App() {
  const [user, setUser] = useState({});
  
  useEffect(() => {
    try {
      let userData = JSON.parse(localStorage.getItem('user'));
      setUser(userData);
    }
    catch (e) {
      setUser(null);
    }
  }, [])
  
  return (
  <>
      <Navbar
        user={user}
      />
  <br/>
  <br/>
 <ToastContainer/>
      <Switch>
        <Route path='/studio/:studioName' render={(props) => <Studio {...props} user={user} />}/>
        <Route  path='/auth/signup/join' component={Signup}/>
        <Route  path='/auth/signup' component={Signup}/>
        <Route  path='/auth/login' component={Login}/>
        <Route path='/feed' render={(props) => <Feed {...props} user={user}/>} />

        <Route path='/create-new-studio' render={(props) => <CreateStudio {...props} user={user} />}/>
        <Route exact path='/' component={Welcome}/>
        </Switch>
    </>
  );
}

export default App;
