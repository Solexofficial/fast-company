import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SelectField from '../common/form/selectField';
import API from '../../api';
import TextAreaField from '../common/form/textAreaField';
import { validator } from '../../utils/validator';

const CommentForm = ({ userId, onAdd }) => {
  const initialState = { content: '', pageId: userId, userId: '' };
  const [data, setData] = useState(initialState);
  const [users, setUsers] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    API.users.fetchAll().then((data) => setUsers(data));
  }, []);

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const validatorConfig = {
    userId: {
      isRequired: { message: 'Обязательно выберите пользователя' }
    },
    content: {
      isRequired: { message: 'Поле "Сообщение" не должно быть пустым' }
    }
  };

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(data);
    setData(initialState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Новый комментарий</h2>
      <div className="mb-4">
        <SelectField
          options={users}
          name="userId"
          value={data.userId}
          defaultOption={'Выберите пользователя'}
          onChange={handleChange}
          error={errors.userId}
        />
      </div>
      <div className="mb-4">
        <TextAreaField
          label="Сообщение"
          name="content"
          value={data.content}
          onChange={handleChange}
          error={errors.content}
        />
      </div>
      <div className="mb-4 d-flex flex-row-reverse">
        <button className="btn btn-primary" type="submit" disabled={!isValid}>
          Опубликовать
        </button>
      </div>
    </form>
  );
};

CommentForm.propTypes = {
  userId: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired
};

export default CommentForm;
