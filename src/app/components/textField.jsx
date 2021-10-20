import React, { useState } from 'react';
import PropTypes from 'prop-types';

const TextField = ({ label, type, placeholder, name, value, onChange, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : '');
  };

  return (
    <div className="mb-4">
      <label htmlFor={name}>{label}</label>
      <div className="input-group has-validation">
        <input
          id={name}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          type={showPassword ? 'text' : type}
          className={getInputClasses()}
        />
        {type === 'password' && (
          <button className="btn btn-outline-secondary" type="button" onClick={toggleShowPassword}>
            <i className={`bi bi-eye${showPassword ? '-slash' : ''}`}></i>
          </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

TextField.defaultProps = {
  type: 'text'
};

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string
};

export default TextField;
