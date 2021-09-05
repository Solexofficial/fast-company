import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Pagination = ({ onPageChange, itemsCount, pageSize, currentPage }) => {
  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);
  console.log({ currentPage });

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li className={'page-item ' + (page === currentPage ? 'active' : '')} key={page}>
            <a className="page-link" href="!#" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired
};

export default Pagination;
