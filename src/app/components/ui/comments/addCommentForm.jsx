import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { validator } from '../../../utils/validator';
import TextAreaField from '../../common/form/textAreaField';

const AddCommentForm = ({ onSubmit }) => {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});

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
    content: {
      isRequired: { message: 'Поле "Сообщение" не должно быть пустым' }
    }
  };

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };

  const clearForm = () => {
    setData({});
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
          <div className="mb-4"></div>
          <div className="mb-4">
            <TextAreaField
              label="Сообщение"
              name="content"
              value={data.content || ''}
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
