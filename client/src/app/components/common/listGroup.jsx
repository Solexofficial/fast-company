import React from 'react';
import PropTypes from 'prop-types';

const ListGroup = ({ items, valueProperty, contentProperty, onItemSelect, selectedItem }) => {
  if (!Array.isArray(items)) {
    return (
      <ul className="list-group">
        {Object.keys(items).map((item) => (
          <li
            key={items[item][valueProperty]}
            role="button"
            className={'list-group-item' + (items[item] === selectedItem ? ' active' : '')}
            onClick={() => onItemSelect(items[item])}>
            {items[item][contentProperty]}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="list-group">
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          role="button"
          className={'list-group-item' + (item === selectedItem ? ' active' : '')}
          onClick={() => onItemSelect(item)}>
          {item[contentProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name'
};

ListGroup.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func,
  selectedItem: PropTypes.object
};

export default ListGroup;
