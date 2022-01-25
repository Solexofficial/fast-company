import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import BookMark from '../common/bookmark';
import Table from '../common/table';
import Profession from './profession';
import Qualities from '../ui/qualities';

const UserTable = ({ users, onSort, selectedSort, onToggleBookMark }) => {
  const columns = {
    name: {
      path: 'name',
      name: 'Имя',
      component: (user) => <Link to={`users/${user._id}`}>{user.name}</Link>
    },
    qualities: {
      name: 'Качества',
      component: (user) => <Qualities data={user.qualities} />
    },
    professions: { name: 'Профессия', component: (user) => <Profession id={user.profession} /> },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: (user) => (
        <BookMark onClick={() => onToggleBookMark(user._id)} status={user.bookmark} />
      )
    }
  };

  return <Table onSort={onSort} selectedSort={selectedSort} columns={columns} data={users} />;
};

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookMark: PropTypes.func.isRequired
};

export default UserTable;
