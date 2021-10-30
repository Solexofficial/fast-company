import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import API from '../../../api';
import { validator } from '../../../utils/validator';
import SelectField from '../../common/form/selectField';
import TextAreaField from '../../common/form/textAreaField';

const initialData = { content: '', userId: '' };

const AddCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState(initialData);
  const [users, setUsers] = useState({});
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

  const clearForm = () => {
    setData(initialData);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    onSubmit(data);
    clearForm();
  };

  return (
    <div className="card mb-2">
      <div className="card-body">
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
          <div className="d-flex flex-row-reverse">
            <button className="btn btn-primary" type="submit" disabled={!isValid}>
              Опубликовать
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddCommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default AddCommentForm;
