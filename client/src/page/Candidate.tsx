import { Link } from "react-router-dom";
import Input from "../components/Input";
import PageHeroSection from "../components/PageHeroSection";
import search2 from "../assets/img/search2.svg";
import map02 from "../assets/img/map02.svg";
import jobcategory from "../assets/img/jobcategory.svg";
import date from "../assets/img/date.svg";
import experience from "../assets/img/experience.svg";
import salary from "../assets/img/dollar.svg";
import Button from "../components/Button";

import candidateMap from "../assets/img/candidateMap.svg";
import talentAvater from "../assets/img/talentAvater.jpg";

import styled from "styled-components";
import Candidates from "../components/Candidates";
import { useQuery } from "react-query";
import axios from "axios";
import useAuthContext from "../hooks/useAuthContext";

const Wrapper = styled.div`
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  justify-content: center;
  margin: 2rem 4rem;
  padding: 0 3rem;
`;

const Span = styled.span`
  border: 1px solid #ccc;
`;

interface CandidateApplicationData {
  name: string;
  _id: number;
  phone: string;
  email: string;
  location: string;
  profileImg: string;
  createdAt: string;
}

const Candidate: React.FC = () => {
  const { API_base_url } = useAuthContext();
  const { data: talents, isLoading: talentsLoading } = useQuery("talents", () =>
    axios.get(`${API_base_url}api/talent`)
  );

  return (
    <>
      <PageHeroSection>
        <div>
          <div>
            <h1>Find Candidates</h1>
            <small>Set the parameters to find the best candidates</small>
          </div>
          <br />
          <div className="inputWrapper">
            <span>
              <img src={search2} alt="Search" />
              <Input
                type="search"
                placeholder="Enter Job Title"
                name="jobTitle"
              />
            </span>
            <span>
              <img src={map02} alt="Map02" />
              <Input
                type="search"
                placeholder="Enter Job Location"
                name="jobLocation"
              />
            </span>
            <span>
              <img src={jobcategory} alt="jobcategory" />
              <select name="jobcategory" id="jobcategory">
                <option disabled selected value="Select Category">
                  Select Category
                </option>
              </select>
            </span>
            <span>
              <img src={jobcategory} alt="jobcategory" />
              <select name="jobtype" id="jobtype">
                <option disabled selected value="Select type">
                  Job type
                </option>
              </select>
            </span>
          </div>
          <br />
          <div className="inputWrapper">
            <span>
              <img src={date} alt="Date" />
              <select name="date" id="date">
                <option disabled selected value="Date Posted">
                  Date Posted
                </option>
              </select>
            </span>
            <span>
              <img src={experience} alt="Date" />
              <select name="experience" id="experience">
                <option disabled selected value="Date Posted">
                  Experience Level
                </option>
              </select>
            </span>
            <span>
              <img src={salary} alt="Salary" />
              <select name="salary" id="salary">
                <option disabled selected value="Salary Expected">
                  Salary Expected
                </option>
              </select>
            </span>
            <Button value="Search Jobs" />
          </div>
        </div>
      </PageHeroSection>
      <div className="flex flex-wrap gap-4 py-16 md:px-48 justify-center md:justify-between">
        <span>Showing 1-20 of 1,890 jobs</span>
        <div className="flex gap-4">
          <Span className="rounded-sm py-1 px-2">
            <select name="jobtype" id="jobtype">
              <option disabled selected value="Select type">
                Job type
              </option>
            </select>
          </Span>
          <Span className="rounded-sm py-1 px-2">
            <select name="jobtype" id="jobtype">
              <option disabled selected value="Select type">
                Job type
              </option>
            </select>
          </Span>
        </div>
      </div>
      <Wrapper>
        {talentsLoading ? (
          <h2>Loading... </h2>
        ) : (
          talents?.data.response.map((candidate: CandidateApplicationData) => (
            <Candidates key={candidate._id}>
              <div>
                {candidate.profileImg ? (
                  <img
                    width={100}
                    src={candidate.profileImg}
                    alt="candidate1"
                  />
                ) : (
                  <img width={100} src={talentAvater} alt="candidate1" />
                )}

                <h4>{candidate.name}</h4>
                <small>UI Designer</small>

                <small>
                  <img src={candidateMap} alt="candidateMap" />
                  Washington, USA
                </small>
                <Link to={`/candidatprofile/${candidate._id}`}>
                  <Button className="btn-blue" value="view Profile" />
                </Link>
              </div>
            </Candidates>
          ))
        )}
      </Wrapper>
      <div className="flex flex-wrap gap-8 py-16 md:px-48 justify-center md:justify-between">
        <span>Showing 1-20 of 1,890 jobs</span>
        <div className="flex gap-4">
          <Span className="rounded-sm py-1 px-2">
            <select name="jobtype" id="jobtype">
              <option disabled selected value="Select type">
                Job type
              </option>
            </select>
          </Span>
          <Span className="rounded-sm py-1 px-2">
            <select name="jobtype" id="jobtype">
              <option disabled selected value="Select type">
                Job type
              </option>
            </select>
          </Span>
        </div>
      </div>
    </>
  );
};

export default Candidate;
