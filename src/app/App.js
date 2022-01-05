import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { ToastContainer } from 'react-toastify';

import Login from './layouts/login';
import Users from './layouts/users';
import Main from './layouts/main';
import NavBar from './components/ui/navBar';
import { ProfessionProvider } from './hooks/useProfession';
import { QualitiesProvider } from './hooks/useQuality';
import AuthProvider from './hooks/useAuth';
import ProtectedRoute from './components/common/protectedRoute';
import LogOut from './layouts/logOut';
import { useDispatch } from 'react-redux';
import { loadQualitiesList } from './store/qualities';
import { loadProfessionsList } from './store/professions';
import { loadUsersList } from './store/users';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadQualitiesList());
    dispatch(loadProfessionsList());
    dispatch(loadUsersList());
  }, []);

  return (
    <>
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
      <ToastContainer />
    </>
  );
};

export default App;
