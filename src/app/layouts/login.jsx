import React, { useState } from 'react';
import TextField from '../components/textField';

const Login = () => {
  const [data, setData] = useState({ email: '', password: '' });

  const handleChange = ({ target }) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="email"
        type="text"
        name="email"
        placeholder="Введите ваш e-mail"
        value={data.email}
        onChange={handleChange}
      />
      <TextField
        label="password"
        type="password"
        name="password"
        placeholder="Введите пароль"
        value={data.password}
        onChange={handleChange}
      />

      <button type="submit">Submit</button>

      {/* <div>
        <div>
          <label htmlFor="radio1">radio 1</label>
          <input type="radio" id="radio1" name="radio" />
        </div>
        <div>
          <label htmlFor="radio2">radio 2</label>
          <input type="radio" id="radio2" name="radio" />
        </div>
      </div> */}
    </form>
  );
};

export default Login;
