import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';

const MultiSelectField = ({ options, onChange, name, label, defaultValue, error }) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === 'object'
      ? Object.keys(options).map((optionName) => ({
          label: options[optionName].name,
          value: options[optionName]._id
        }))
      : options;

  const handleChange = (value) => {
    onChange({ name: name, value });
  };

  const getInputClasses = () => {
    return 'form-control' + (error ? ' is-invalid' : '');
  };

  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>
      <div className="input-group has-validation">
        <Select
          closeMenuOnSelect={false}
          isMulti
          defaultValue={defaultValue}
          options={optionsArray}
          className={getInputClasses()}
          classNamePrefix="select"
          onChange={handleChange}
          name={name}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
};

MultiSelectField.propTypes = {
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  defaultValue: PropTypes.array,
  error: PropTypes.string
};

export default MultiSelectField;
