import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import CheckBoxField from '../common/form/checkBoxField';
// import { validator } from '../../utils/validator';
import TextField from '../common/form/textField';

const LoginForm = () => {
  const [data, setData] = useState({ email: '', password: '', stayOn: false });
  const [errors, setErrors] = useState({});

  const validateScheme = yup.object().shape({
    password: yup
      .string()
      .required('пароль обязателен для заполнения')
      .matches(/^(?=.*[A-Z])/, 'Пароль должен содержать хотя бы одну заглавную букву')
      .matches(/(?=.*[0-9])/, 'Пароль должен содержать хотя бы одно число')
      .matches(/(?=.*[!@#$%^&*])/, 'Пароль должен содержать один из специальных символов !@#$%^&* ')
      .matches(/(?=.{8})/, 'Пароль должен состоять минимум из 8 символов'),
    email: yup
      .string()
      .required('Электронная почта обязательна для заполнения')
      .email('email введен некорректно')
  });

  const validate = () => {
    // const errors = validator(data, validatorConfig);
    validateScheme
      .validate(data)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }));
    // setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  // const validatorConfig = {
  //   email: {
  //     isRequired: { message: 'Электронная почта обязательна для заполнения' },
  //     isEmail: {
  //       message: 'email введен некорректно'
  //     }
  //   },
  //   password: {
  //     isRequired: { message: 'пароль обязателен для заполнения' },
  //     isCapitalSymbol: {
  //       message: 'Пароль должен содержать хотя бы одну заглавную букву'
  //     },
  //     isContainDigit: {
  //       message: 'Пароль должен содержать хотя бы одно число'
  //     },
  //     min: {
  //       message: 'Пароль должен состоять минимум из 8 символов',
  //       value: 8
  //     }
  //   }
  // };
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
    console.log(data);
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

      <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
