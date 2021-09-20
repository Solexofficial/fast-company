import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { paginate } from '../utils/paginate';
import UsersTable from '../components/usersTable';
import SearchStatus from '../components/searchStatus';
import Pagination from '../components/pagination';
import ListGroup from '../components/listGroup';
import api from '../api';
import _ from 'lodash';

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
  const pageSize = 8;

  const [users, setUsers] = useState();
  useEffect(() => {
    api.users.fetchAll().then((data) => setUsers(data));
  }, []);

  const handleDelete = (userId) => {
    return setUsers(users.filter((user) => user._id !== userId));
  };

  const handleToggleBookMark = (userId) => {
    setUsers(
      users.filter((user) => {
        if (user._id === userId) {
          user.bookmark = !user.bookmark;
          return user;
        }
        return user;
      })
    );
  };

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

  if (users) {
    const clearFilter = () => {
      setSelectedProf();
    };

    const filteredUsers = selectedProf
      ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
      : users;

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
              onToggleBookMark={handleToggleBookMark}
              onDelete={handleDelete}
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
  }
  return <h1 className="d-flex justify-content-center align-items-center">Loading...</h1>;
};

Users.propTypes = {
  users: PropTypes.array,
  onDelete: PropTypes.func,
  onToggleBookMark: PropTypes.func
};
export default Users;
