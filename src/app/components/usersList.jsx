/* eslint-disable indent */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { paginate } from '../utils/paginate';
import UsersTable from '../components/usersTable';
import SearchStatus from '../components/searchStatus';
import Pagination from '../components/pagination';
import ListGroup from '../components/listGroup';
import api from '../api';
import _ from 'lodash';
import SearchBar from './searchBar';

const UsersList = ({ users, onDelete, onToggleBookMark }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
  const [searchQuery, setSearchQuery] = useState();
  const pageSize = 8;
  useEffect(() => {
    if (!professions) {
      api.professions.fetchAll().then((data) => setProfessions(data));
    }
  }, [professions]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleProfessionSelect = (item) => {
    setSearchQuery('');
    setSelectedProf(item);
  };

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const handleSort = (item) => {
    setSortBy(item);
  };

  const handleSearch = (data, config) => {
    setSelectedProf();
    setSearchQuery(event.target.value);

    console.log(
      data.filter((el) =>
        el?.[config.searchBy].toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  const clearFilter = () => {
    setSelectedProf();
    setSearchQuery();
  };

  if (users) {
    const filteredUsers = searchQuery
      ? users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
      : selectedProf
      ? users.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
      : users;

    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);

    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-3">
            <ListGroup
              items={professions}
              onItemSelect={handleProfessionSelect}
              selectedItem={selectedProf}
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column">
          <SearchStatus length={count} />
          <SearchBar
            data={users}
            value={searchQuery}
            onSearch={() => handleSearch(users, { searchBy: 'name' })}
          />
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
  }
  return <h1 className="d-flex justify-content-center align-items-center">Loading...</h1>;
};

UsersList.propTypes = {
  users: PropTypes.array,
  onDelete: PropTypes.func,
  onToggleBookMark: PropTypes.func
};
export default UsersList;
