import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import * as yup from 'yup';
import { getAuthErrors, signIn } from '../../store/users';
import CheckBoxField from '../common/form/checkBoxField';
// import { validator } from '../../utils/validator';
import TextField from '../common/form/textField';

const initialData = { email: '', password: '', stayOn: false };

const LoginForm = () => {
  const history = useHistory();
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState({});
  const loginError = useSelector(getAuthErrors());
  const dispatch = useDispatch();

  const validateScheme = yup.object().shape({
    password: yup.string().required('пароль обязателен для заполнения'),
    email: yup.string().required('Электронная почта обязательна для заполнения')
  });

  const validate = () => {
    validateScheme
      .validate(data)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }));

    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  useEffect(() => {
    validate();
  }, [data]);

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const redirect = history.location.state ? history.location.state.from.pathname : '/';
    dispatch(signIn({ payload: data, redirect }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Электронная почта"
        type="text"
        name="email"
        placeholder="Введите ваш e-mail"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        placeholder="Введите пароль"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />

      <CheckBoxField name="stayOn" value={data.stayOn} onChange={handleChange}>
        Оставаться в системе
      </CheckBoxField>
      {loginError && <p className="text-danger text-center">{loginError}</p>}

      <button
        className="btn btn-primary w-100 mx-auto"
        type="submit"
        disabled={!isValid || loginError}>
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
