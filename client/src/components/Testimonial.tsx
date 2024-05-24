import React from "react";
import styled from "styled-components";

const Testimonials = styled.section`
  padding: 1.5rem;
  .wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 40px;
    align-items: center;
    .comment {
      width: 100%;
      max-width: 700px;
      h3 {
        color: #9893a3;
        font-family: Roboto;
        font-size: 30px;
        font-style: italic;
        font-weight: 700;
        line-height: normal;
      }
      p {
        color: #9893a3;
        font-family: Roboto;
        font-size: 26px;
        font-style: italic;
        font-weight: 400;
        line-height: normal;
      }
    }
  }
  .testify {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 1.5rem;
    margin: 1rem 0;
    border-radius: 5px;
    gap: 10px;

    small {
      color: #9893a3;
      font-family: Roboto;
      font-size: 12px;
      font-weight: 400;
    }
    img {
      margin: 0.4rem 0 0;
    }
    h3 {
      display: flex;
      column-gap: 50px;
      flex-wrap: wrap;
      align-items: space-between;
    }
  }
`;

interface Props {
  children: string | JSX.Element;
}
const Testimonial: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Testimonials>{children}</Testimonials>
    </>
  );
};

export default Testimonial;
