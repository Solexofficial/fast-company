import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { ToastContainer } from 'react-toastify';

import Login from './layouts/login';
import Users from './layouts/users';
import Main from './layouts/main';
import NavBar from './components/ui/navBar';

const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/users/:userId?/:edit?" component={Users} />
        <Route path="/login/:type?" component={Login} />
        <Route exact path="/" component={Main} />
        <Redirect to="/" />
      </Switch>
      <ToastContainer />
    </>
  );
};

export default App;
