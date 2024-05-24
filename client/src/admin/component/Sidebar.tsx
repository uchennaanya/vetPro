import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import menu from "../../icons/ic_menu.svg";
import home from "../../assets/img/ic_home.png";
// import search from "../../icons/ic_search.svg";
import application from "../../icons/ic_applications.svg";
import chat from "../../icons/ic_chat.svg";
import analytics from "../../icons/ic_analytics.svg";
import ic_news from "../../icons/ic_news.svg";
import { useState } from "react";

const Aside = styled.aside`
  height: 100vh;
  position: sticky;
  width: fit-content;
  top: 0;
  a {
    line-height: 3rem;
    padding: 0 0 0 1rem;
    display: flex;
    align-items: center;
    gap: 25px;
    img {
      width: 20px;
    }
  }

  a.active {
    background: #ccc;
  }

  .nav-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 90%;
  }
`;

const Sidebar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  return (
    <>
      <div className="flex items-start md:relative  fixed">
        <Aside
          className={
            click
              ? "hidden bg-gray-800 text-white"
              : "bg-gray-800 text-white fixed block"
          }
        >
          <Link to="/adminlayout/">TECHWINGS</Link>
          <div className="nav-wrapper">
            <nav className="">
              <ul>
                <li>
                  <NavLink to={`./`}>
                    <img src={home} alt="home" /> Dashboard
                  </NavLink>
                </li>
                {/* <li>
                  <Link to="/adminlayout/">
                    <img src={search} alt="Search icon" /> Search Job
                  </Link>
                </li> */}
                <li>
                  <NavLink to="/adminlayout/recruiters">
                    <img src={application} alt="recruiters" /> Recruiters
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/adminlayout/jobs">
                    <img src={application} alt="jobs" /> Jobs
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/adminlayout/talents">
                    <img src={application} alt="talent" /> Talents
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/adminlayout/applications">
                    <img src={application} alt="talent" /> Applications
                  </NavLink>
                </li>
                <li>
                  <Link to="/adminlayout/">
                    <img src={chat} alt="chat" /> Messages
                  </Link>
                </li>
                <li>
                  <Link to="/adminlayout/">
                    <img src={analytics} alt="analytics" /> Statistics
                  </Link>
                </li>
                <li>
                  <Link to="/adminlayout/">
                    <img src={ic_news} alt="ic_news" /> News
                  </Link>
                </li>
              </ul>
            </nav>

            <article className=" px-4 content-end">
              <small>TechWIngs Job Portal</small> <br />
              <small>&copy;&nbsp;2020&nbsp;All&nbsp;Rights&nbsp;Reserved</small>
              <br />
              <small>
                <NavLink
                  className="text-blue-600 underline -ml-3"
                  to="https://www.NavLinkedin.com/company/98753125/admin/notifications/all/?types=%5B%22SHARE%22%5D"
                >
                  <span style={{ color: "#fff" }}>Made&nbsp;by</span>
                  TechwingsTeam
                </NavLink>
              </small>
            </article>
          </div>
        </Aside>
        <img
          className="hover:cursor-pointer md:ml-8 ml-2 mt-8 z-40 relative"
          src={menu}
          alt="Menu"
          onClick={handleClick}
        />
      </div>
    </>
  );
};

export default Sidebar;
