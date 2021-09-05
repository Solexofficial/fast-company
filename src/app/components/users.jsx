import React, { useState } from 'react';
import PropTypes from 'prop-types';
import User from './user';
import Pagination from './pagination';
import { paginate } from '../utils/paginate';

const Users = ({ users: allUsers, onDelete, onToggleBookMark }) => {
  const count = allUsers.length;
  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageIndex) => {
    console.log('page: ', pageIndex);
    setCurrentPage(pageIndex);
  };

  const users = paginate(allUsers, currentPage, pageSize);
  const usersList = users.map((user) => (
    <User key={user._id} onDelete={onDelete} onToggleBookMark={onToggleBookMark} {...user} />
  ));

  return count > 0 ? (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
            <th scope="col">Избранное</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>{usersList}</tbody>
      </table>
      <Pagination itemsCount={count} pageSize={pageSize} onPageChange={handlePageChange} currentPage={currentPage} />
    </>
  ) : (
    false
  );
};
Users.propTypes = {
  users: PropTypes.array,
  onDelete: PropTypes.func,
  onToggleBookMark: PropTypes.func
};
export default Users;
