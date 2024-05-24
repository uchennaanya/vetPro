import styled from "styled-components";
import PageHeroSection from "../components/PageHeroSection";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useQuery } from "react-query";
import Button from "../components/Button";
import Candidates from "../components/Candidates";
import talentAvater from "../assets/img/talentAvater.jpg";
import candidateMap from "../assets/img/candidateMap.svg";
import useAuthContext from "../hooks/useAuthContext";

const Main = styled.main`
  width: 100%;
  max-width: 350px;
  margin: 4rem auto;
  font-family: roboto;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  margin: 4rem 0;
  button {
    border-radius: 6px;
    border: 1px solid #6c63ff;
    background: #6c63ff;
    padding: 0.5rem 1rem;
    margin-top: 0.6rem;
    color: #fff;
  }
  .forHire {
    width: 100%;
    max-width: 400px;
    img {
      width: 100%;
    }
    h5 {
      margin: 0.6rem 0;
    }
  }
  h5 {
    color: #2f2e41;
    font-family: Roboto;
    font-size: 22px;
    font-weight: 500;
  }
  color: #9893a3;
  font-family: Open Sans;
  font-size: 16px;
  font-weight: 400;
  line-height: 26px; /* 162.5% */
`;

const CandidateProfile = () => {
  const { API_base_url } = useAuthContext();
  const { _id } = useParams();

  const { data: talentPreview, isLoading: talentsLoading } = useQuery(
    "talents",
    () => axios.get(`${API_base_url}api/talent/${_id}`)
  );

  console.log(talentPreview, "just now");
  return (
    <>
      <PageHeroSection>
        <div>
          <h1>Candidate's profile</h1>
        </div>
      </PageHeroSection>
      <Main>
        <Wrapper>
          {talentsLoading ? (
            <h2>talentsLoading...</h2>
          ) : (
            <Candidates key={talentPreview?.data._id}>
              <div>
                {talentPreview?.data.response ? (
                  <img
                    width={100}
                    src={talentPreview?.data.response}
                    alt={talentPreview?.data.response}
                  />
                ) : (
                  <img
                    width={100}
                    src={talentAvater}
                    alt={talentPreview?.data.response}
                  />
                )}

                <h4>{talentPreview?.data.response}</h4>
                <small>UI Designer</small>
                <small>
                  <img src={candidateMap} alt="candidateMap" />
                  Washington, USA
                </small>

                <Link to={`/candidatprofile/${talentPreview?.data.response}`}>
                  <Button className="btn-blue" value="Hire talent" />
                </Link>
              </div>
            </Candidates>
          )}
        </Wrapper>
      </Main>
    </>
  );
};

export default CandidateProfile;
