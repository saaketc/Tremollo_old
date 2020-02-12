import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Feed from './components/feed';
import Welcome from './components/welcome';
function App() {
  return (
  
 
      <Switch>
        <Route  path='/feed' component={Feed}/>
        <Route exact path='/' component={Welcome}/>
        </Switch>
      
  );
}

export default App;
