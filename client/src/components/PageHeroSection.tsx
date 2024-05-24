import React from "react";
import { styled } from "styled-components";
import Breadcrumb from "../breadcrumb/Breadcrumb";

const HeroSection = styled.section`
  background: rgba(152, 147, 163, 0.05);

  h1 {
    color: #2f2e41;
    text-align: center;
    font-family: Playfair Display;
    font-size: 30px;
    font-weight: 700;
    line-height: 30px; /* 100% */
  }
  .inputWrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }

  span {
    box-shadow: 0 0 1px 0 #9893a3;
    display: flex;
    align-items: center;
    padding: 0.4rem;
    border-radius: 5px;
    gap: 10px;
  }

  input::placeholder {
    color: #9893a3;
    font-family: Roboto;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }

  input,
  select {
    color: gray;
    caret-color: gray;
    width: 200px;
    padding: 0.4rem;
    background: transparent;
  }
  small {
    display: block;
    color: #9893a3;
    text-align: center;
    font-family: Playfair Display;
    font-size: 12px;
    font-style: italic;
    font-weight: 500;
  }
  button {
    border-radius: 6px;
    border: 1px solid #6c63ff;
    background: #6c63ff;
    padding: 0.5rem 1rem;
    color: #fff;
    padding: 0.4rem 35px;
    flex: 0.56;
  }
  .blogSearch {
    display: flex;
    gap: 15px;
    justify-content: center;
    margin-top: 4rem;
  }
`;

interface Props {
  children: string | JSX.Element;
}

const PageHeroSection: React.FC<Props> = ({ children }) => {
  return (
    <>
      <HeroSection className="pageHero">{children}</HeroSection>
      <Breadcrumb />
    </>
  );
};

export default PageHeroSection;
