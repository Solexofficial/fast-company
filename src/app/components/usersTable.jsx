import React from 'react';
import PropTypes from 'prop-types';
import UserPage from './userPage';
import Table from './table';
import BookMark from './bookmark';
import QualitiesList from './qualitiesList';

const UserTable = ({ users, onSort, selectedSort, onToggleBookMark, onDelete }) => {
  const columns = {
    name: {
      path: 'name',
      name: 'Имя',
      component: (user) => <UserPage user={user} />
    },
    qualities: { name: 'Качества', component: (user) => <QualitiesList qualities={user.qualities} /> },
    professions: { path: 'profession.name', name: 'Профессия' },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      component: (user) => <BookMark onClick={() => onToggleBookMark(user._id)} status={user.bookmark} />
    },
    delete: {
      component: (user) => (
        <button className="btn btn-danger" onClick={() => onDelete(user._id)}>
          Delete
        </button>
      )
    }
  };

  return <Table onSort={onSort} selectedSort={selectedSort} columns={columns} data={users} />;
};

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default UserTable;
