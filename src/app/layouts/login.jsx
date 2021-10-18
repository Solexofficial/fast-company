import React from 'react';

const Login = () => {
  return (
    <form action="">
      <div>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" id="password" />
      </div>
    </form>
  );
};

export default Login;
