import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/common/protectedRoute';
import AppLoader from './components/ui/hoc/appLoader';
import NavBar from './components/ui/navBar';
import AuthProvider from './hooks/useAuth';
import { ProfessionProvider } from './hooks/useProfession';
import { QualitiesProvider } from './hooks/useQuality';
import Login from './layouts/login';
import LogOut from './layouts/logOut';
import Main from './layouts/main';
import Users from './layouts/users';

const App = () => {
  return (
    <>
      <AppLoader>
        <AuthProvider>
          <NavBar />
          <QualitiesProvider>
            <ProfessionProvider>
              <Switch>
                <ProtectedRoute path="/users/:userId?/:edit?" component={Users} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/logout" component={LogOut} />
                <Route exact path="/" component={Main} />
                <Redirect to="/" />
              </Switch>
            </ProfessionProvider>
          </QualitiesProvider>
        </AuthProvider>
      </AppLoader>
      <ToastContainer />
    </>
  );
};

export default App;
