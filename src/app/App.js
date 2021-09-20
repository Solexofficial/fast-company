import React from 'react';
import Users from './layouts/users';
import Login from './layouts/login';
import Main from './layouts/main';

import { Switch, Route } from 'react-router';
import NavBar from './components/navBar';

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/users" component={Users} />
        <Route exact path="/" component={Main} />
      </Switch>
      ;
    </>
  );
};

export default App;
