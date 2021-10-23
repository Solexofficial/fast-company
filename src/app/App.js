import React from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Login from './layouts/login';
import Users from './layouts/users';
import Main from './layouts/main';
import NavBar from './components/ui/navBar';

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/users/:userId?" component={Users} />
        <Route exact path="/" component={Main} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default App;
