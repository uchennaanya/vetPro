import { NavLink, Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import menu from "../assets/img/menu.png";
import times from "../assets/img/times4.png";
// import logo from "../assets/img/logon.jpg";

import "../components/NavbarStyle.css";

import { useState } from "react";
import Footer from "../components/Footer";
import useAuthContext from "../hooks/useAuthContext";

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index: 2;
  a {
    font-family: "Roboto", sans-serif;
    color: #000;
    text-decoration: none;
    display: inline-block;
    text-shadow: 1px 1px 1px #000;
    color: #fff;
  }

  a.active {
    color: #6c63ff;
  }

  .postjob {
    border-radius: 6px;
    border: 1px solid #6c63ff;
    background: #6c63ff;
    color: #fff;
    font-size: 14px;
    padding: 0.4rem 0 !important;
    a {
      color: #ffffff !important;
    }
  }
  .login {
    border: 1px solid #fff;
    box-shadow: 0 0 1px 0 #000;
    border-radius: 6px;
    padding: 0.4rem 0 !important;
    margin-right: 1rem !important;
  }
  .logo {
    border-right: 1px solid #ccc;
  }
`;

const MainLayout = () => {
  const { auth, logout } = useAuthContext();

  const talentRaw: any = localStorage.getItem("tData") ?? "{}";
  const talent = JSON.parse(talentRaw);

  const userObject = localStorage.getItem("userData") ?? "{}";
  const user = JSON.parse(userObject);

  const handleLogout = () => {
    logout();
    localStorage.clear();
  };

  const [color, setColor] = useState(false);
  const changeColor = () => {
    if (window.scrollY >= 50) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  window.addEventListener("scroll", changeColor);

  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <>
      <div
        className={color ? "navheader navheader-bg" : "navheader"}
        id="header"
      >
        <Header>
          <Link
            to="/"
            className="logo py-2 pr-12 border-t-2 border-fuchsia-600"
            onClick={() => window.scrollTo(0, 0)}
          >
            TECHWINGS
            {/* <img src={logo} alt="Logo" width={45} /> */}
          </Link>
          <nav className="nav bd-container">
            <div className="nav__menu" id="nav-menu">
              <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li>
                  <NavLink to="/" onClick={() => window.scrollTo(0, 0)}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/jobs" onClick={() => window.scrollTo(0, 0)}>
                    Find Jobs
                  </NavLink>
                </li>
                {/* <li>
                  <NavLink to="/findcandidate">Find Candidates</NavLink>
                </li> */}
                <li>
                  <NavLink to="/blog" onClick={() => window.scrollTo(0, 0)}>
                    Articles
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/about" onClick={() => window.scrollTo(0, 0)}>
                    About
                  </NavLink>
                </li>

                <li>
                  <a href="#contact">Contact</a>
                </li>

                {auth ? (
                  <li className="bg-red-400 text-white">
                    <button onClick={handleLogout} className="py-1 px-4">
                      <small className="block">{talent.name}</small>
                      <small className="block">{user.name}</small>
                      Logout
                    </button>
                  </li>
                ) : (
                  <div className="flex">
                    <li className="login">
                      <Link to="/userslayout" className="px-4 py-0">
                        Login
                      </Link>
                    </li>
                    <li className="postjob">
                      <Link to="/userslayout/register" className="px-4 py-0">
                        Register
                      </Link>
                    </li>
                  </div>
                )}
              </ul>
            </div>
          </nav>
          <div
            className="nav__toggle hamburger"
            id="nav-toggle"
            onClick={handleClick}
          >
            {click ? (
              <img
                src={times}
                alt="Menu toggler"
                className="bg-white rounded-sm md:hidden"
              />
            ) : (
              <img
                src={menu}
                alt="Menu toggler"
                className="bg-white rounded-sm md:hidden"
              />
            )}
          </div>
        </Header>
      </div>
      <Outlet />
      <Footer contact="contact" />
    </>
  );
};

export default MainLayout;
