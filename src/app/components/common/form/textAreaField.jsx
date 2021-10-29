import React from 'react';
import PropTypes from 'prop-types';

const TextAreaField = ({ label, name, value, onChange, error, rows }) => {
  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };

  return (
    <>
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <textarea
        className={'form-control' + (error ? ' is-invalid' : '')}
        name={name}
        value={value}
        id={name}
        rows={rows}
        onChange={handleChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </>
  );
};

TextAreaField.defaultProps = {
  rows: 3
};

TextAreaField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  rows: PropTypes.number
};

export default TextAreaField;
