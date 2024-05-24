import { NavLink, Link } from "react-router-dom";
import styled from "styled-components";

import home from "../../assets/img/ic_home.png";
// import search from "../../icons/ic_search.svg";
import menu from "../../icons/ic_menu.svg";
import application from "../../icons/ic_applications.svg";
// import chat from "../../icons/ic_chat.svg";
import analytics from "../../icons/ic_analytics.svg";
import ic_news from "../../icons/ic_news.svg";
import signpost from "../../icons/signpost-line.svg";
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

  a.active img {
    color: #ccc;
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
      <div className="flex items-start absolute md:relative "></div>
      <Aside className="bg-gray-800 text-white fixed hidden md:block absolute md:relative">
        <Link to="/recruiterlayout/">TECHWINGS</Link>
        <div className="nav-wrapper">
          <nav className="">
            <ul>
              <li>
                <NavLink to={`./`}>
                  <img src={home} alt="home" /> Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink to={"/recruiterlayout/postjob"}>
                  <img src={signpost} alt="Signpost" /> Post a job
                </NavLink>
              </li>

              <li>
                <NavLink to={"/recruiterlayout/myjobs"}>
                  <img src={analytics} alt="analytics" /> My jobs
                </NavLink>
              </li>
              <li>
                <NavLink to="/recruiterlayout/recruiterapplications">
                  <img src={application} alt="application" /> Applications
                </NavLink>
              </li>
              {/* <li>
                <Link to="/rectuiterlayout/">
                  <img src={chat} alt="chat" /> Messages
                </Link>
              </li> */}
              <li>
                <NavLink to="/recruiterlayout/statistics">
                  <img src={analytics} alt="analytics" /> Statistics
                </NavLink>
              </li>
              <li>
                <NavLink to="/recruiterlayout/news">
                  <img src={ic_news} alt="ic_news" /> News
                </NavLink>
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
                <span style={{ color: "#fff" }}>Made&nbsp;by</span>TechwingsTeam
              </NavLink>
            </small>
          </article>
        </div>
      </Aside>
      <div className="flex items-start absolute md:relative ">
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
