import styled from "styled-components";

interface Props {
  children: string | JSX.Element;
}
const RecentJobs = styled.div`
  box-shadow: 0 0 1px 0 #9893a3;
  max-width: 500px;
  width: 100%;
  border-radius: 5px;
  padding: 1rem;

  small {
    color: #9893a3;
    font-family: Roboto;
    font-size: 12px;
    font-weight: 400;
    display: flex;
    gap: 10px;
    align-items: center;
  }
  h3 {
    font-family: Roboto;
    font-size: 16px;
    font-weight: 500;
  }
  h4 {
    margin: 0.3rem 0.1rem 0;
    color: #000;
  }
  .coperation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    > div {
      display: flex;
      gap: 10px;
      img {
        width: 25px;
        object-fit: contain;
      }
    }
  }
  .btn-blue {
    border-radius: 6px;
    border: 1px solid #6c63ff;
    // background: #483285;
    padding: 0.3rem 1.4rem;
    color: #fff;
  }
  + div {
    margin: 1.5rem 0 0 0;
  }
`;

const RecentJob: React.FC<Props> = ({ children }) => {
  return (
    <>
      <div className="m-4 md:mx-0 rounded-lg shadow-lg">
        <RecentJobs>{children}</RecentJobs>
      </div>
    </>
  );
};

export default RecentJob;
