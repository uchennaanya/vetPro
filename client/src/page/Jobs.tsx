import PageHeroSection from "../components/PageHeroSection";
import search2 from "../assets/img/search2.svg";
import map02 from "../assets/img/map02.svg";
import jobcategory from "../assets/img/jobcategory.svg";
import date from "../assets/img/date.svg";
import experience from "../assets/img/experience.svg";
import salary from "../assets/img/dollar.svg";
import Button from "../components/Button";
import RecentJobs from "../components/RecentJob";
import star from "../assets/img/star.svg";
import map2 from "../assets/img/map2.svg";
import timer from "../assets/img/timer.svg";
import dollarsign from "../assets/img/dollarsign.svg";
import styled from "styled-components";
import { useQuery } from "react-query";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";

const Small = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
  margin: 0.5rem 0;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  margin: 2rem 0;
  padding: 0 3rem;
`;

interface Inputs {
  jobLocation: string;
  jobTitle: string;
}

interface FormData {
  _id: any;
  createdAt: string;
  companyName: string;
  jobType: string;
  position: string;
  phone: string;
  email: string;
  status: string;
  jobTitle: string;
  location: string;
  logo: string;
  from: number;
  to: number;
}

const Jobs = () => {
  const [inputs, setInputs] = useState<Inputs>({
    jobLocation: "",
    jobTitle: "",
  });
  const [udata, setUData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [RecordsEstimate, setRecordsEstimate] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 2;
  const { API_base_url } = useAuthContext();

  // FOR SEARCHING

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { value, name } = event.target;

    setInputs({ ...inputs, [name]: value });

    console.log(inputs);
    const res = await axios.get(
      `${API_base_url}api/jobs?jobTitle=${inputs.jobTitle}&location=${inputs.jobLocation}`
    );

    console.log(res);
  };

  const { data } = useQuery("Applications", () => {
    return axios.get(`${API_base_url}api/jobs/`);
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: any = await axios.get(
          `${API_base_url}api/jobs?page=${currentPage}&limit=${itemsPerPage}`
        );
        setUData(res.data.jobs);
        setRecordsEstimate(res?.data.RecordsEstimate);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { value, name } = event.target;

    setInputs({ ...inputs, [name]: value });

    console.log(inputs);
  };

  return (
    <>
      <PageHeroSection>
        <div>
          <div>
            <h1>Find Jobs</h1>
            <small>Set the parameters to find the best jobs</small>
          </div>
          <br />
          <div className="inputWrapper">
            <span>
              <img src={search2} alt="Search" />
              <input
                type="search"
                placeholder="Enter Job Title"
                name="jobTitle"
                value={inputs.jobTitle}
                onChange={handleChange}
              />
            </span>
            <span>
              <img src={map02} alt="Map02" />
              <input
                type="search"
                placeholder="Enter Job Location"
                name="jobLocation"
                value={inputs.jobLocation}
                onChange={handleChange}
              />
            </span>
            <span>
              <img src={jobcategory} alt="jobcategory" />
              <select name="jobcategory" id="jobcategory" defaultValue="">
                <option disabled value="">
                  Select Category
                </option>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
                <option value="category3">Category 3</option>
              </select>
            </span>
            <span>
              <img src={jobcategory} alt="jobcategory" />

              <select name="jobtype" id="jobtype" defaultValue="">
                <option disabled value="">
                  Job type
                </option>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
                <option value="category3">Category 3</option>
              </select>
            </span>
          </div>
          <br />
          <div className="inputWrapper">
            <span>
              <img src={date} alt="Date" />
              <select name="date" id="date" defaultValue="">
                <option disabled value="">
                  Date Posted
                </option>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
                <option value="category3">Category 3</option>
              </select>
            </span>
            <span>
              <img src={experience} alt="Date" />

              <select name="experience" id="experience" defaultValue="">
                <option disabled value="">
                  Experience Level
                </option>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
                <option value="category3">Category 3</option>
              </select>
            </span>
            <span>
              <img src={salary} alt="Salary" />

              <select name="salary" id="salary" defaultValue="">
                <option disabled value="">
                  Salary Expected
                </option>
              </select>
            </span>
            <Button onclick={handleSearch} value="Search Jobs" />
          </div>
        </div>
      </PageHeroSection>
      <div className="flex flex-wrap gap-4 py-16 md:px-48 justify-center md:justify-between">
        <span>
          Showing {currentPage} - {udata.length} of {data?.data.jobs.length}{" "}
          jobs
        </span>
        <div className="flex gap-4">
          {/* <select name="jobtype" id="jobtype" defaultValue="">
            <option disabled value="">
              10 Jobs
            </option>
          </select> */}

          <select name="jobtype" id="jobtype" defaultValue="">
            <option disabled value="">
              Newest First
            </option>
          </select>
        </div>
      </div>
      <Wrapper>
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          udata.map((job: FormData) => (
            <RecentJobs key={job._id}>
              <div>
                <div className="coperation">
                  <div>
                    <img
                      src={`${API_base_url}${job.logo}`}
                      alt={job.companyName}
                    />{" "}
                    <small>{job.companyName}</small>
                  </div>
                  <img src={star} alt="a star" />
                </div>
                <h4>{job.jobTitle}</h4>
                <Small>
                  <small>
                    <img src={map2} alt="Map2" />
                    {job.location}
                  </small>
                  <small>
                    <img src={timer} alt="" />{" "}
                    {formatDistanceToNow(new Date(job.createdAt), {
                      addSuffix: true,
                    })}
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
            </RecentJobs>
          ))
        )}
      </Wrapper>

      <div className="flex flex-wrap gap-4 py-16 md:px-48 justify-center md:justify-between">
        <span>Showing 1-20 of 1,890 jobs</span>
        <Pagination
          totalPages={Math.ceil(RecordsEstimate / itemsPerPage)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default Jobs;
