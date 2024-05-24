import TopNav from "../component/TopNav";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { useQuery } from "react-query";

import tel from "../../icons/telephone.svg";
import email from "../../icons/email.svg";
import options from "../../icons/ic_option.svg";
import useAuthContext from "../../hooks/useAuthContext";
import Search from "../component/Search";
// import Pagination from "../component/Pagination";

interface ApplicationData {
  _id: number;
  userID: any;
  name: string;
  createdAt: string;
  companyName: string;
  jobType: string;
  position: string;
  phone: string;
  email: string;
  status: string;
  jobTitle: string;
}

const AvailableJobs = () => {
  const { API_base_url } = useAuthContext();

  const { isLoading: loadingAvailableJobs, data: availableJobs } = useQuery(
    "availableJobs",
    async () => {
      return await axios.get(`${API_base_url}api/jobs`);
    }
  );

  console.log(availableJobs, "Data from available jobs");

  return (
    <>
      <div className="w-full">
        <TopNav title="Job list" />
        <Search />
        <main className="mt-8 mr-4">
          <div className="flex items-center flex-wrap md:gap-10 mb-8">
            <div>
              <p className="flex items-center gap-2 font-bold text-sm">
                Showing
                <span>{availableJobs?.data.response.length}</span>
                jobs
              </p>
              <small>Based your preferences</small>
            </div>
            <div className="flex py-2 md:py-0 flex-wrap justify-left items-center gap-4">
              <button className="shadow-lg px-4 py-1 rounded-full bg-indigo-600 text-white">
                All
              </button>
              <button className="shadow-lg px-4 py-1 rounded-full bg-[#E7DDFF] text-[#5C5C5C]">
                Filled positions
              </button>

              <button className="shadow-lg px-4 py-1 rounded-full bg-[#E7DDFF] text-[#5C5C5C]">
                Un-filled positions
              </button>
              {/* <button className="shadow-lg px-4 py-1 rounded-full bg-[#E7DDFF] text-[#5C5C5C]">
                Candidate
              </button> */}
            </div>
          </div>
          <div className="flex flex-wrap gap-8 mr-2 md:mr-0  bg-white rounded-xl shadow-lg w-[100%] overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th scope="col" className="flex gap-4 items-center">
                    <input type="checkbox" name="" id="" />
                    ID
                  </th>
                  <th scope="col">Date Added</th>
                  <th scope="col">Recruiter name</th>
                  <th scope="col">Company</th>
                  <th scope="col">Type</th>
                  <th scope="col">Job title</th>
                  <th scope="col">Contact</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {loadingAvailableJobs ? (
                  <tr>
                    <td colSpan={8}>Loading...</td>
                  </tr>
                ) : (
                  availableJobs &&
                  availableJobs.data.response.map(
                    (job: ApplicationData, i: number) => (
                      <tr key={job._id}>
                        <td data-label="ID" className="">
                          <input type="checkbox" name="" id="" />
                          &nbsp;&nbsp;
                          {i + 1}
                        </td>
                        <td data-label="Date Added">
                          {formatDistanceToNow(new Date(job.createdAt), {
                            addSuffix: true,
                          })}
                        </td>

                        <td data-label="Job title" className="">
                          <span className="rounded-lg shadow-lg px-4 py-1 bg-gray-400"></span>
                          &nbsp;&nbsp;
                          {job.userID.name}
                        </td>

                        <td data-label="Company" className="">
                          {job.companyName}
                        </td>
                        <td data-label="Type" className="">
                          {job.jobType}
                        </td>

                        <td data-label="Name">{job.jobTitle}</td>

                        <td data-label="Contact" className="contactTD">
                          {job.userID.phone && (
                            <a href={`tel: ${job.userID.phone}`}>
                              <img
                                className="w-8 shadow-inner rounded-full p-2"
                                src={tel}
                                alt="tel"
                                style={{
                                  display: "inline",
                                }}
                              />
                            </a>
                          )}
                          {job.userID.email && (
                            <a href={`mailto: + ${job.userID.email}`}>
                              <img
                                className="w-8 shadow-inner rounded-full p-2"
                                src={email}
                                alt="tel"
                                style={{
                                  display: "inline",
                                }}
                              />
                            </a>
                          )}
                        </td>
                        <td data-label="Status" className="contactTD">
                          <small className="bg-indigo-100 rounded-full px-4 py-1">
                            {job.status}
                          </small>

                          <img src={options} alt="Options" className="h-4" />
                        </td>
                      </tr>
                    )
                  )
                )}
              </tbody>
            </table>
          </div>
          {/* <Pagination /> */}
        </main>
      </div>
    </>
  );
};

export default AvailableJobs;
