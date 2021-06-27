import React from 'react';
import logo from '../images/mesto-russia.svg';

function Header(props) {
  const { email, loggedIn, children } = props;
  return (
    <header className="header block block_width_wide">
        <img src={logo} alt="Mesto Russia" className="logo" />
        {children}
    </header>
  );
}

export default Header;