import React from 'react';

const searchStatus = ({ length }) => {
  let text = `${length} человек тусанет с тобой сегодня`;
  let className = 'badge bg-primary';

  if (length <= 4 && length > 1) {
    text = `${length} человека тусанут с тобой сегодня`;
  }
  if (length === 0) {
    text = 'Никто с тобой не тусанет';
    className = 'badge bg-danger';
  }

  return (
    <h2>
      <span className={className}>{text}</span>
    </h2>
  );
};

export default searchStatus;
