import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../../assets/images/logo.png';

const Header = () => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
  if (localStorage.getItem('adminInfo')) {
    navigate('/admin/dashboard');
  } else if (localStorage.getItem('userInfo')) {
    navigate('/account');
  } else {
    navigate('/login');
  }
};


  return (
    <header className="header-bg">
      <div className="topBar">
        <p className="topLink">
          <strong className="brand">VELNORDZ</strong> | Your elegant destination for discovering refined bags and carefully selected luxury jewelry.
        </p>
      </div>
      <div className="container">
        <Navbar expand="lg" className="navbar-dark">
          <Navbar.Brand href="/">
            <img src={Logo} alt="Logo VELNORDZ" width={220} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
            <Nav className="mx-auto nav-links">
              <Nav.Link href="/a-propos" className="mx-3 nav-item-lg">About</Nav.Link>
              <Nav.Link href="/shop" className="mx-3 nav-item-lg">Shop</Nav.Link>
              <Nav.Link href="/contact" className="mx-3 nav-item-lg">Contact</Nav.Link>
            </Nav>
            <div className="nav-right d-flex align-items-center">
              <button
                onClick={handleProfileClick}
                className="ms-3 bg-transparent border-0 p-0"
                style={{ cursor: 'pointer' }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="currentColor"
                  className="bi bi-person"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                </svg>
              </button>
              <a href="/cart" className="ms-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="28"
                  fill="currentColor"
                  className="bi bi-bag"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
                </svg>
              </a>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;