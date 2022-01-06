import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/common/protectedRoute';
import AppLoader from './components/ui/hoc/appLoader';
import NavBar from './components/ui/navBar';
import Login from './layouts/login';
import LogOut from './layouts/logOut';
import Main from './layouts/main';
import Users from './layouts/users';

const App = () => {
  return (
    <>
      <AppLoader>
        <NavBar />
        <Switch>
          <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
          <Route path="/login/:type?" component={Login} />
          <Route path="/logout" component={LogOut} />
          <Route exact path="/" component={Main} />
          <Redirect to="/" />
        </Switch>
      </AppLoader>
      <ToastContainer />
    </>
  );
};

export default App;
