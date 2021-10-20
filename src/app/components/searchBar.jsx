import React from 'react';
import PropTypes from 'prop-types';
import TextField from './textField';

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
  // data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  // query: PropTypes.string,
  // searchBy: PropTypes.string
  onSearch: PropTypes.func,
  value: PropTypes.string
};

export default SearchBar;
