import React from 'react';
import PropTypes from 'prop-types';
import TextField from './form/textField';

const SearchBar = ({ value, onSearch }) => {
  return (
    <>
      <TextField
        name="search"
        placeholder="Поиск..."
        type="search"
        value={value}
        onChange={onSearch}
      />
    </>
  );
};

SearchBar.propTypes = {
  onSearch: PropTypes.func,
  value: PropTypes.string
};

export default SearchBar;
