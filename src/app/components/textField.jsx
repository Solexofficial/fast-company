import React from 'react';
import PropTypes from 'prop-types';

const TextField = ({
  label,
  type,
  placeholder,
  name,
  value,
  onChange,
  error
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
      />
      {error && <p>{error}</p>}
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
