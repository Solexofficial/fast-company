import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { ToastContainer } from 'react-toastify';

import Login from './layouts/login';
import Users from './layouts/users';
import Main from './layouts/main';
import NavBar from './components/ui/navBar';
import { ProfessionProvider } from './hooks/useProfession';
import { QualitiesProvider } from './hooks/useQuality';

const App = () => {
  return (
    <>
      <NavBar />
      <QualitiesProvider>
        <ProfessionProvider>
          <Switch>
            <Route path="/users/:userId?/:edit?" component={Users} />
            <Route path="/login/:type?" component={Login} />
            <Route exact path="/" component={Main} />
            <Redirect to="/" />
          </Switch>
        </ProfessionProvider>
      </QualitiesProvider>
      <ToastContainer />
    </>
  );
};

export default App;
