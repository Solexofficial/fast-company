import React, { useEffect, useState } from 'react';
import { validator } from '../../utils/validator';
import TextField from '../common/form/textField';
import api from '../../api';
import SelectField from '../common/form/selectField';

const RegisterForm = () => {
  const [data, setData] = useState({ email: '', password: '', profession: '' });
  const [errors, setErrors] = useState({});
  const [professions, setProfessions] = useState();

  useEffect(() => {
    if (!professions) {
      api.professions.fetchAll().then((data) => setProfessions(data));
    }
  }, [professions]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const validatorConfig = {
    email: {
      isRequired: { message: 'Электронная почта обязательна для заполнения' },
      isEmail: {
        message: 'email введен некорректно'
      }
    },
    password: {
      isRequired: { message: 'пароль обязателен для заполнения' },
      isCapitalSymbol: {
        message: 'Пароль должен содержать хотя бы одну заглавную букву'
      },
      isContainDigit: {
        message: 'Пароль должен содержать хотя бы одно число'
      },
      min: {
        message: 'Пароль должен состоять минимум из 8 символов',
        value: 8
      }
    },
    profession: {
      isRequired: { message: 'Обязательно выберите вашу профессию' }
    }
  };
  useEffect(() => {
    validate();
  }, [data]);

  const handleChange = ({ target }) => {
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
        label="email"
        type="text"
        name="email"
        placeholder="Введите ваш e-mail"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="password"
        type="password"
        name="password"
        placeholder="Введите пароль"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <SelectField
        label="Выберите вашу профессию"
        value={data.profession}
        error={errors.profession}
        defaultOption="Choose..."
        options={professions}
        onChange={handleChange}
      />

      <button className="btn btn-primary w-100 mx-auto" type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
