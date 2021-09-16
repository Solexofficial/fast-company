/* eslint-disable multiline-ternary */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { paginate } from '../utils/paginate';
import UsersTable from './usersTable';
import SearchStatus from './searchStatus';
import Pagination from './pagination';
import ListGroup from './listGroup';
import api from '../api';
import _ from 'lodash';

const Users = ({ users: allUsers, onDelete, onToggleBookMark }) => {
  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });

  useEffect(() => {
    api.professions.fetchAll().then((data) => setProfessions(data));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleProfessionSelect = (item) => {
    setSelectedProf(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const clearFilter = () => {
    setSelectedProf();
  };

  const filteredUsers = selectedProf
    ? allUsers.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
    : allUsers;

  const count = filteredUsers.length;
  const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
  const usersCrop = paginate(sortedUsers, currentPage, pageSize);

  return (
    <div className="d-flex">
      {professions && (
        <div className="d-flex flex-column flex-shrink-0 p-3">
          <ListGroup items={professions} onItemSelect={handleProfessionSelect} selectedItem={selectedProf} />
          <button className="btn btn-secondary mt-2" onClick={clearFilter}>
            Очистить
          </button>
        </div>
      )}
      <div className="d-flex flex-column">
        <SearchStatus length={count} />
        {count > 0 && (
          <UsersTable
            users={usersCrop}
            onSort={handleSort}
            selectedSort={sortBy}
            onToggleBookMark={onToggleBookMark}
            onDelete={onDelete}
          />
        )}
        <div className="d-flex justify-content-center">
          <Pagination
            itemsCount={count}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

Users.propTypes = {
  users: PropTypes.array,
  onDelete: PropTypes.func,
  onToggleBookMark: PropTypes.func
};
export default Users;
