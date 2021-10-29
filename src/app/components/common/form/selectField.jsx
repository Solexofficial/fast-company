import React from 'react';
import PropTypes from 'prop-types';

const SelectField = ({ label, value, name, onChange, defaultOption, options, error }) => {
  const getInputClasses = () => {
    return 'form-select' + (error ? ' is-invalid' : '');
  };
  const optionsArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.keys(options).map((optionName) => ({
          name: options[optionName].name,
          value: options[optionName]._id
        }))
      : options;

  const handleChange = ({ target }) => {
    onChange({ name: target.name, value: target.value });
  };
  return (
    <div className="mb-4">
      <label htmlFor="validationCustom04" className="form-label">
        {label}
      </label>
      <select
        className={getInputClasses()}
        id="validationCustom04"
        value={value}
        name={name}
        onChange={handleChange}>
        <option disabled value="" key={defaultOption} defaultValue={defaultOption}>
          {defaultOption}
        </option>
        {optionsArray &&
          optionsArray.map((option) => (
            <option
              key={option.value || option._id}
              value={option.value || option._id}
              name={option.name}>
              {option.name}
            </option>
          ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  defaultOption: PropTypes.string,
  value: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func,
  error: PropTypes.string
};

export default SelectField;
