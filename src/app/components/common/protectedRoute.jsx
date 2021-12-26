import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        console.log(props);
        if (!currentUser) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
        // if (props.match.params.userId !== currentUser._id && !!props.match.params.edit) {
        //   return (
        //     <Redirect
        //       to={{
        //         pathname: `/users/${currentUser._id}/edit`,
        //         state: {
        //           from: props.location
        //         }
        //       }}
        //     />
        //   );
        // }
        return Component ? <Component {...props} /> : children;
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  component: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  location: PropTypes.object,
  match: PropTypes.object,
  params: PropTypes.object,
  userId: PropTypes.string
};

export default ProtectedRoute;
