/* eslint-disable indent */
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../../hooks/useAuth';
import { useUsers } from '../../../hooks/useUsers';
import { getProfessions, getProfessionsLoadingStatus } from '../../../store/professions';
import { paginate } from '../../../utils/paginate';
import searchBy from '../../../utils/search';
import ListGroup from '../../common/listGroup';
import Pagination from '../../common/pagination';
import SearchBar from '../../common/searchBar';
import SearchStatus from '../../ui/searchStatus';
import UsersTable from '../../ui/usersTable';

const UsersListPage = () => {
  const { users } = useUsers();
  const professions = useSelector(getProfessions());
  const professionsLoading = useSelector(getProfessionsLoadingStatus());

  const { currentUser } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });
  const [searchQuery, setSearchQuery] = useState('');
  const pageSize = 8;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleDelete = (userId) => {
    // return setUsers(users.filter((user) => user._id !== userId));
    console.log(userId);
  };

  const handleToggleBookMark = (userId) => {
    console.log(userId);
    // setUsers(
    //   users.filter((user) => {
    //     if (user._id === userId) {
    //       user.bookmark = !user.bookmark;
    //       return user;
    //     }
    //     return user;
    //   })
    // );
  };

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

  const handleSearch = (event) => {
    setSelectedProf();
    setSearchQuery(event.value);
  };

  const clearFilter = () => {
    setSelectedProf();
    setSearchQuery('');
  };

  if (users) {
    function filterUsers(data) {
      const filteredUsers = searchQuery
        ? searchBy(data, searchQuery, { searchBy: 'name' })
        : selectedProf
        ? data.filter((user) => JSON.stringify(user.profession) === JSON.stringify(selectedProf))
        : data;
      return filteredUsers.filter((user) => user._id !== currentUser._id);
    }

    const filteredUsers = filterUsers(users);

    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);

    return (
      <div className="d-flex">
        {professions && !professionsLoading && (
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
          <SearchBar data={users} value={searchQuery} onSearch={handleSearch} />
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

UsersListPage.propTypes = {
  users: PropTypes.array,
  onDelete: PropTypes.func,
  onToggleBookMark: PropTypes.func
};
export default UsersListPage;
