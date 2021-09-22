import React from 'react';
import PropTypes from 'prop-types';
import QualitiesList from './qualitiesList';
import { useHistory } from 'react-router';

const User = ({ name, qualities, profession, completedMeetings, rate }) => {
  const history = useHistory();

  const handleSave = () => {
    history.replace('/users');
  };

  return (
    <div className="d-flex flex-column m-3">
      <h1 className="mb-3">{name}</h1>
      <h2>{`Профессия: ${profession.name}`}</h2>
      <ul>
        <QualitiesList qualities={qualities} />
      </ul>
      <span>{`completedMeetings: ${completedMeetings}`}</span>
      <h3 className="my-3">{`Rate: ${rate}/5`}</h3>
      <div>
        <button className="btn btn-success" onClick={() => handleSave()}>
          Все пользователи
        </button>
      </div>
    </div>
  );
};

User.propTypes = {
  name: PropTypes.string,
  qualities: PropTypes.array,
  profession: PropTypes.object,
  completedMeetings: PropTypes.number,
  rate: PropTypes.number,
  _id: PropTypes.string,
  onDelete: PropTypes.func,
  onToggleBookMark: PropTypes.func,
  status: PropTypes.bool
};

export default User;
