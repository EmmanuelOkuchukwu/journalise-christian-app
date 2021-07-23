import React, { useState, useEffect } from 'react';
import './components/scss/app.scss';
import Navbar from './components/layout/Navbar';
import { Switch, Route, useHistory } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Profile from './components/pages/Profile';
import Feed from './components/pages/Feed';
import { AuthService } from './services/AuthenticationService';
import { PrivateRoute } from './PrivateRoute';

function App() {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
      const getUser = () => {
          AuthService.currentUser.subscribe(user => {
              setUserInfo(user);
          })
      }
      return getUser();
  }, [])
  const history = useHistory();
  return (
    <div className="App">
      <Navbar history={history} userInfo={userInfo} />
      <Switch history={history}>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <PrivateRoute path='/profile' component={Profile} />
        <PrivateRoute path='/feed' component={Feed} />
      </Switch>
    </div>
  );
}

export default App;
