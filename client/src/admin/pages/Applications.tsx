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
  jobID: any;
  jobTitle: string;
  createdAt: string;
  companyName: string;
  type: string;
  position: string;
  phone: string;
  email: string;
  status: string;
  name: string;
  userName: String;
}

const Applications = () => {
  const { API_base_url } = useAuthContext();

  const { isLoading, data } = useQuery("Applications", async () =>
    axios.get(`${API_base_url}api/application`)
  );

  return (
    <>
      <div className="w-full">
        <TopNav title="Applicant's list" />
        <Search />
        <main className="mt-8 mr-4">
          <div className="flex items-center flex-wrap gap-10 mb-8">
            <div>
              <p className="flex items-center gap-2 font-bold text-sm">
                Showing
                <span>{data?.data.response.length}</span>
                applicants
              </p>
              <small>Based your preferences</small>
            </div>
            <div className="flex py-2 md:py-0 flex-wrap justify-left items-center gap-4">
              <button className="shadow-lg px-4 py-1 rounded-full bg-indigo-600 text-white">
                All
              </button>
              <button className="shadow-lg px-4 py-1 rounded-full bg-[#E7DDFF] text-[#5C5C5C]">
                Open
              </button>

              <button className="shadow-lg px-4 py-1 rounded-full bg-[#E7DDFF] text-[#5C5C5C]">
                Clossed
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
                  <th scope="col">
                    <span>
                      <input type="checkbox" name="" id="" />
                      &nbsp;&nbsp; ID
                    </span>
                  </th>
                  <th scope="col">Date Applied</th>
                  <th scope="col">Talent</th>
                  <th scope="col">Recruiter</th>
                  <th scope="col">Title</th>
                  <th scope="col">Type</th>
                  <th scope="col">Contact</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {data && isLoading ? (
                  <tr>
                    <td colSpan={8}>Loading...</td>
                  </tr>
                ) : (
                  data?.data.response.map(
                    (recruiter: ApplicationData, i: number) => (
                      <tr key={recruiter._id}>
                        <td data-label="ID">
                          <span>
                            <input type="checkbox" name="" id="" />
                            &nbsp;&nbsp;
                            {i + 1}
                          </span>
                        </td>
                        <td data-label="Date Applied">
                          {formatDistanceToNow(new Date(recruiter.createdAt), {
                            addSuffix: true,
                          })}
                        </td>

                        <td data-label="Name">
                          <span className="rounded-lg shadow-lg px-4 py-1 bg-gray-400"></span>
                          &nbsp;&nbsp;
                          {recruiter.name}
                        </td>

                        <td data-label="Recruiter">
                          {recruiter.jobID.userName}
                        </td>

                        <td data-label="Type">{recruiter.jobID.jobTitle}</td>
                        <td data-label="Position">{recruiter.jobID.jobType}</td>

                        <td data-label="Contact" className="contactTD">
                          {recruiter.phone && (
                            <a href={`tel: ${recruiter.phone}`}>
                              <img
                                src={tel}
                                alt="tel"
                                className="w-8 shadow-inner rounded-full p-2"
                              />
                            </a>
                          )}
                          {recruiter.email && (
                            <a href={`mailto: + ${recruiter.email}`}>
                              <img
                                src={email}
                                alt="envelope"
                                className="w-8 shadow-inner rounded-full p-2"
                              />
                            </a>
                          )}
                        </td>

                        <td data-label="Status" className="contactTD">
                          <small className="bg-indigo-100 rounded-full px-4 py-1">
                            {recruiter.jobID.status}
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
          {/* <Pagination  /> */}
        </main>
      </div>
    </>
  );
};

export default Applications;
