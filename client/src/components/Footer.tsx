import { Link } from "react-router-dom";
import styled from "styled-components";
import facebook from "../assets/img/facebook.svg";
import twitter from "../assets/img/twitter.png";
import linkedin from "../assets/img/linkedin.svg";

import map02 from "../assets/img/map02.svg";
import mail from "../assets/img/mail.png";

const FooterStyled = styled.footer`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background: rgba(236, 235, 255, 0.6);
  padding: 4rem;
  h3 {
    color: #2f2e41;
    font-feature-settings: "clig" off, "liga" off;
    font-family: Roboto;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 24px; /* 133.333% */
    margin-bottom: 0.8rem;
  }
  li {
    color: #9893a3;
    font-family: Roboto;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 26px; /* 162.5% */
  }
  small,
  p {
    color: #9893a3;
    text-align: right;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
const Social = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 15px;
  .twit {
    display: flex;
    padding: 0.6rem;
    background: #fff;
    align-self: center;
  }
`;

interface FooterProp {
  contact: string
}

const Footer = ({contact}: FooterProp) => {
  return (
    <>
      <footer className="flex flex-wrap justify-between py-16 px-8 md:px-32 bg-gray-50">
        <div className="pr-8 pb-8">
          <h3 className="text-xl font-semibold leading-loose">Product</h3>
          <ul>
            <li>
              <Link to="#">How it works</Link>
            </li>
            <li className="leading-9">
              <Link to="#">Features</Link>
            </li>
            <li className="leading-9">
              <Link to="#">Pricing</Link>
            </li>
            <li className="leading-9">
              <Link to="#">FAQ</Link>
            </li>
            {/* <li className="leading-9">
              <Link to="#">Download</Link>
            </li> */}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold leading-loose">Company</h3>
          <ul>
            <li className="leading-9">
              <Link to="/about">About</Link>
            </li>
            <li className="leading-9">
              <Link to="blog">Blog</Link>
            </li>
            <li>
              <Link to="#">Partnership</Link>
            </li>
            <li className="leading-9">
              <Link to="#">Terms of use</Link>
            </li>
            <li className="leading-9">
              <Link to="#">Privacy policy</Link>
            </li>
          </ul>
        </div>
        {/* <div>
          <h3 className="text-xl font-semibold leading-loose">Support</h3>
          <ul>
            <li className="leading-9">
              <Link to="#">Help center</Link>
            </li>
            <li className="leading-9">
              <Link to="#">Contact us</Link>
            </li>
          </ul>
        </div> */}
        <div id={contact}>
          <h3 className="text-xl font-semibold leading-loose">Get in touch</h3>
          <div>
            <address>
              <img src={map02} alt="Map" />
              2nd St #2615 Casper, WY 82601 United States
            </address>

            <address>
              <img src={mail} alt="Mail" /> support@techwingsglobal.com
            </address>
          </div>
          <Social>
            <li>
              <Link to="#">
                <img src={facebook} alt="facebook logo" />
              </Link>
            </li>
            <li>
              <Link to="#" className="twit">
                <img src={twitter} alt="twitter logo" />
              </Link>
            </li>
            <li>
              <Link
                to="/https://www.linkedin.com/company/tachwingds-global"
                target="_blank"
              >
                <img src={linkedin} alt="linkedin logo" />
              </Link>
            </li>
          </Social>
        </div>
      </footer>
      <FooterStyled>
        <p>TECHWINGS</p>
        <small> &copy; Techwings 2023 All Right Reserved </small>
      </FooterStyled>
    </>
  );
};

export default Footer;
