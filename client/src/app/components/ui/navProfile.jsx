import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentUserData } from '../../store/users';

const NavProfile = () => {
  const [isOpen, setOpen] = useState(false);
  const currentUser = useSelector(getCurrentUserData());

  const toggleMenu = () => {
    setOpen((prevState) => !prevState);
  };
  if (!currentUser) return 'Loading...';

  return (
    <div className="dropdown" onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-2">{currentUser?.name}</div>
        <img
          src={currentUser?.image}
          alt="userAvatar"
          height="40"
          className="img-responsive rounded-circle"
        />
      </div>
      <div className={'w-100 dropdown-menu' + (isOpen ? ' show' : '')}>
        <Link className="dropdown-item" to={`/users/${currentUser?._id}`}>
          Profile
        </Link>
        <Link to="/logout" className="dropdown-item">
          Logout
        </Link>
      </div>
    </div>
  );
};

export default NavProfile;
