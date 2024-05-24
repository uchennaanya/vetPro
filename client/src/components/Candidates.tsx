import React from "react";
import styled from "styled-components";

const Candidate = styled.div`
  box-shadow: 0 0 9px 0 #ccc;
  padding: 1rem 2rem;

  h4 {
    color: #000;
    font-family: Roboto;
    font-weight: 500;
    margin: 0.6rem 0 0.5rem;
    text-align: center;
  }
  small {
    color: #9893a3;
    font-family: Roboto;
    font-size: 12px;
    font-style: italic;
    font-weight: 400;
    gap: 10px;
    display: flex;
    justify-content: center;
  }
  button {
    border-radius: 6px;
    background: #6c63ff;
    padding: 0.5rem 1rem;
    margin-top: 0.6rem;
    color: #fff;
  }
`;

interface Props {
  children: string | JSX.Element;
  className?: string;
}

const Candidates: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className=" rounded-lg">
        <Candidate>{children}</Candidate>
      </div>
    </>
  );
};

export default Candidates;
