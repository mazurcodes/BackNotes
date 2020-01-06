import React, { useContext } from 'react';
import MdContext from '../../context/md/MdContext';
import AuthContext from '../../context/auth/AuthContext';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const mdContext = useContext(MdContext);
  const { saveStatus, clearMd } = mdContext;

  const { user, isAuthenticated, logout } = useContext(AuthContext);

  const navbarStyle = {
    display: 'flex',
    backgroundColor: 'coral',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px'
  };

  const listStyle = {
    display: 'flex',
    listStyle: 'none'
  };

  const linkStyle = {
    padding: '20px',
  };

  const onLogout = () => {
    logout();
    clearMd();
  };

  const login = (
    <>
      <li style={linkStyle}>
        <NavLink
          exact
          to="/login"
          activeStyle={{ textDecoration: 'underline', fontWeight: 'bold' }}
        >
          Login
        </NavLink>
      </li>
      <li style={linkStyle}>
        <NavLink
          exact
          to="/register"
          activeStyle={{ textDecoration: 'underline', fontWeight: 'bold' }}
        >
          Register
        </NavLink>
      </li>
    </>
  );

  const authenticated = (
    <>
      <li>Hello {user && user.name}</li>
      <li>
        <a href="#!" onClick={onLogout}>
          Logout
        </a>
      </li>
    </>
  );
  return (
    <div style={navbarStyle}>
      <h1>BackApp</h1>
      <p>{saveStatus === 'saving' ? `Saving...` : 'Saved successfully'}</p>
      <ul style={listStyle}>{isAuthenticated ? authenticated : login}</ul>
    </div>
  );
};

export default Navbar;
