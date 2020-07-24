import React, { useContext, Fragment } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout } = authContext;

  const onLogout = () => {
    logout();
  };

  const authLinks = (
    <Fragment>
      <li className='nav-links'>
        <Link to='/' className='nav-link'>
          Home
        </Link>
      </li>
      <li className='nav-links'>
        <Link to='/profile' className='nav-link'>
          Profile
        </Link>
      </li>
      <li className='nav-links'>
        <a href='/#!' className='nav-link' onClick={onLogout}>
          Logout
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li className='nav-links'>
        <Link to='/login' className='nav-link'>
          Login
        </Link>
      </li>
      <li className='nav-links'>
        <Link to='/register' className='nav-link'>
          Register
        </Link>
      </li>
    </Fragment>
  );

  return (
    <nav className='navbar bg-secondary'>
      <div className='navbar-container'>
        <div className='nav-right'>
          <svg
            className='logo'
            xmlns='http://www.w3.org/2000/svg'
            width='67'
            height='68'
            viewBox='0 0 67 68'
          >
            <g id='Logo' transform='translate(-123 -34)'>
              <rect
                id='Rectangle_8'
                data-name='Rectangle 8'
                width='67'
                height='67'
                rx='12'
                transform='translate(123 34)'
                fill='#2b4141'
              />
              <g id='Group_1' data-name='Group 1' transform='translate(57 2)'>
                <text
                  id='B'
                  transform='translate(113 76)'
                  fill='#fffa80'
                  fontSize='22'
                  fontFamily='Poppins-Medium, Poppins'
                  fontWeight='500'
                >
                  <tspan x='0' y='0'>
                    B
                  </tspan>
                </text>
                <text
                  id='O'
                  transform='translate(74 83)'
                  fill='#fffa80'
                  fontSize='49'
                  fontFamily='Poppins-Medium, Poppins'
                  fontWeight='500'
                >
                  <tspan x='0' y='0'>
                    O
                  </tspan>
                </text>
              </g>
            </g>
          </svg>
          <h1 className='navbar-title'>Odin Book</h1>
        </div>
        <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
      </div>
    </nav>
  );
};

export default Navbar;
