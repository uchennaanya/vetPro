import styled from "styled-components";
import axios from "axios";
import { formatDistanceToNow, isValid } from "date-fns";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import herobg from "../assets/img/herobg.svg";
import Button from "../components/Button";

import RecentJob from "../components/RecentJob";

import map2 from "../assets/img/map2.svg";
import timer from "../assets/img/timer.svg";
import dollarsign from "../assets/img/dollarsign.svg";

import abc from "../assets/img/abc.png";
import forhire from "../assets/img/forhire.png";
import alisha from "../assets/img/alisha.svg";
import david from "../assets/img/david.svg";
import star from "../assets/img/star.svg";
import quote from "../assets/img/qoute.svg";
import Testimonial from "../components/Testimonial";
import useAuthContext from "../hooks/useAuthContext";
import { useState } from "react";

const Overlay = styled.div`
  background: rgba(47, 46, 65, 0.7);
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Roboto", sans-serif;

  .btn {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 8px;
    margin-top: 0.5rem;
  }
  .herobg {
    width: 100%;
    object-fit: cover;
    height: 100vh !important;
    position: absolute;
    z-index: -1;
  }
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

const Header = styled.header`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 85vh;
  color: #fff;
`;

const BtnMore = styled.div`
  text-align: center;
  margin-bottom: 4rem;
  .btnmore {
    border: 1px solid;
    padding: 1rem 1.4rem;
  }
`;

const Small = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
  margin: 0.5rem 0;
`;

const BlogsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  > div {
    width: 100%;
    max-width: 225px;
    margin: 0 0 1.5rem;
  }

  img {
    height: 23vh;
  }
  h5 {
    margin: 0.4rem 0;
    font: 500 1.1rem/1.3rem Roboto;
  }
  p {
    font: 300 0.9rem/1.3rem Roboto;
  }
`;

interface Inputs {
  searchjob: string;
  searchlocation: string;
}

interface Data {
  _id: number;
  companyName: string;
  jobType: string;
  position: string;
  status: string;
  jobTitle: string;
  logo: string;
  from: number;
  to: number;
  name: string;
  id: number;
  phone: string;
  email: string;
  location: string;
  profileImg: string;
  createdAt: string;
}

const Home = () => {
  const [inputs, setInputs] = useState<Inputs>({
    searchjob: "",
    searchlocation: "",
  });

  const { API_base_url } = useAuthContext();

  const {
    data: jobs,
    isLoading: jobsLoading,
    error: jobsError,
  } = useQuery("Jobs", () => axios.get(`${API_base_url}api/jobs`));

  if (jobsError) <div className="text-center">Error fetching data</div>;

  // const handleSeaech = () => {
    
  // }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { name, value } = event.target;

    setInputs((vals) => ({ ...vals, [name]: value }));
  };
  return (
    <>
      <Header>
        <Overlay>
          <div className="text-center">
            <h2 className="text-2xl md:text-4xl">
              Get The Right Job You Deserve
            </h2>
            <p className="my-4 text-xl font-light">
              With VetPro, only the best professionals and opportunities meet
            </p>
          </div>
          <div className="search">
            <input
              type="search"
              placeholder="Search Job"
              name="searchjob"
              className="searchjob"
              value={inputs.searchjob || ""}
              onChange={handleInput}
            />

            <input
              type="search"
              placeholder="Search Location"
              name="searchlocation"
              className="searchmap"
              value={inputs.searchlocation || ""}
              onChange={handleInput}
            />
            <button>Find Job</button>
          </div>
          <div className="btn">
            <Button value="Designer" />
            <Button value="Developer" />
            <Button value="Engineer" />
            <Button value="IOS" />
            <Button value="PHP" />
          </div>
          <img src={herobg} className="herobg" alt="tech wings global" />
        </Overlay>
      </Header>
      <h3>How it works</h3>
      <p className="text-center mt-28 md:mt-32 text-2xl ">
        VetPro, the premier recruitment platform by TechWings Global, <br />
        offers a streamlined process for both job seekers and employers{" "}
        <Link to="/about/#how" className="text-blue-700">
          read more...
        </Link>
      </p>

      <h3 className="text-center text-2xl mt-28 md:mt-20 font-bold ">
        Recent Jobs
      </h3>
      <Wrapper>
        {jobsLoading ? (
          <h2>jobsLoading...</h2>
        ) : (
          jobs?.data.jobs.slice(0, 4).map((job: Data) => (
            <RecentJob key={job._id}>
              <div>
                <div className="coperation">
                  <div>
                    <img
                      className="w-[30px] h-[20px]"
                      src={`${API_base_url}${job.logo.replace(/\//, "\\")}`}
                      alt={job.companyName}
                    />
                    <small>{job.companyName}</small>
                  </div>
                  <img src={star} alt="a star" />
                </div>
                <h4>{job.jobTitle}</h4>
                <Small>
                  <small>
                    <img src={map2} alt="Map2" />({job.location})
                  </small>
                  <small>
                    <img src={timer} alt="" />{" "}
                    {formatDistanceToNow(
                      isValid(new Date(job.createdAt))
                        ? new Date(job.createdAt)
                        : new Date(),
                      {
                        addSuffix: true,
                      }
                    )}
                  </small>
                  <small>
                    <img src={dollarsign} alt="dollarsign" /> ${job.from}k - $
                    {job.to}k
                  </small>
                </Small>

                <Link
                  to={`/jobpreview/${job._id}`}
                  className="bg-[#6C63FF] text-white mt-4 block w-fit py-2 px-4 rounded-lg"
                >
                  Preview Job &gt;&gt;&gt;
                </Link>
              </div>
            </RecentJob>
          ))
        )}
      </Wrapper>
      <BtnMore>
        <Link
          className="btnmore rounded-lg hover:bg-gray-200 text-[#6C63FF]"
          to="/jobs"
        >
          Load More Jobs
        </Link>
      </BtnMore>
      <h3 className="text-center text-2xl mt-16 md:mt-0 font-bold">
        Testimonials
      </h3>
      <Testimonial>
        <div className="wrapper">
          <div>
            <div className="testify">
              <img src={alisha} alt="Alisha" />
              <div>
                <div id="">
                  <h3>
                    Alisha Johnson <img src={quote} alt="quote" />
                  </h3>
                  <small>UI/UX Designer</small>
                </div>
                <div id="star" className="flex gap-2">
                  <img src={star} alt="Rating star" />
                  <img src={star} alt="Rating star" />
                  <img src={star} alt="Rating star" />
                  <img src={star} alt="Rating star" />
                </div>
              </div>
            </div>
            <div className="testify">
              <img src={david} alt="Alisha" />
              <div>
                <div id="">
                  <h3>
                    Alisha Johnson <img src={quote} alt="quote" />
                  </h3>
                  <small>UI/UX Designer</small>
                </div>
                <div id="star" className="flex gap-2">
                  <img src={star} alt="Rating star" />
                  <img src={star} alt="Rating star" />
                  <img src={star} alt="Rating star" />
                  <img src={star} alt="Rating star" />
                </div>
              </div>
            </div>
            <div className="testify">
              <img src={alisha} alt="Alisha" />
              <div>
                <div id="">
                  <h3>
                    Alisha Johnson <img src={quote} alt="quote" />
                  </h3>
                  <small>UI/UX Designer</small>
                </div>
                <div id="star" className="flex gap-2">
                  <img src={star} alt="Rating star" />
                  <img src={star} alt="Rating star" />
                  <img src={star} alt="Rating star" />
                  <img src={star} alt="Rating star" />
                </div>
              </div>
            </div>
          </div>
          <div className="comment">
            <h3>Best Platform</h3>
            <p>
              I have seen a couple recruitment platform, I must say there is
              some special about TechWings, you try them out.
            </p>
          </div>
        </div>
      </Testimonial>

      <h3 className="text-center text-2xl mt-16 md:mt-0 font-bold">Blogs</h3>
      <Wrapper>
        <div className="forHire m-4 md:mx-0 h-auto">
          <img src={forhire} alt="for hire" />
          <h5>What’s Jobly?</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vitae, eu
            amet augue et sed. Adipiscing id bibendum sed posuere ultricies
            viverra cum. Bibendum faucibus ac integer pulvinar nullam quis.
            Viverra in ut volutpat, et ipsum quis
          </p>
          <Button value="Read More" />
        </div>
        <div className="m-4 md:mx-0">
          <BlogsWrapper>
            <div>
              <img src={abc} alt="Reppresentational image" />
              <h5>Introducing Jobly Engage</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscn elit.</p>
              <Button value="Read More" />
            </div>
            <div>
              <img src={abc} alt="Reppresentational image" />
              <h5>Introducing Jobly Engage</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscn elit.</p>
              <Button value="Read More" />
            </div>
          </BlogsWrapper>
          <BlogsWrapper>
            <div>
              <img src={abc} alt="Reppresentational image" />
              <h5>Introducing Jobly Engage</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscn elit.</p>
              <Button value="Read More" />
            </div>
            <div>
              <img src={abc} alt="Reppresentational image" />
              <h5>Introducing Jobly Engage</h5>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscn elit.</p>
              <Button value="Read More" />
            </div>
          </BlogsWrapper>
        </div>
      </Wrapper>
    </>
  );
};

export default Home;
