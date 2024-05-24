import React from "react";
import styled from "styled-components";

interface Props {
  children: string | JSX.Element;
}

const Blog: React.FC<Props> = ({ children }) => {
  const Thumbnail = styled.div`
    img {
      width: 100%;
      max-width: 300px;
      display: inline-block;
      height: 442px;
      flex-shrink: 0;
    }
    .blogsWrapper {
      display: flex;
      gap: 20px;
      > div {
        width: 100%;
        max-width: 270px;
        margin: 0 0 1rem;
      }
    }
  `;

  return (
    <>
      <div className="m-4 md:mx-0 rounded-lg shadow-lg">
        <Thumbnail>{children}</Thumbnail>
      </div>
    </>
  );
};

export default Blog;
