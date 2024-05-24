import { Link } from "react-router-dom";
import styled from "styled-components";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  a {
    color: blue;
    text-decoration: underline;
  }
`;

const PageNotFound = () => {
  return (
    <>
      <Main>
        <h1 className="font-bold text-5xl">Page Not Found</h1>
        <p>
          <Link to="/">Go back to our home page</Link>
        </p>
      </Main>
    </>
  );
};

export default PageNotFound;
