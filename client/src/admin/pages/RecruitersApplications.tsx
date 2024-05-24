import TopNav from "../component/TopNav";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { useQuery } from "react-query";

import tel from "../../icons/telephone.svg";
import email from "../../icons/email.svg";
import options from "../../icons/ic_option.svg";
import useAuthContext from "../../hooks/useAuthContext";
import Search from "../component/Search";
import Pagination from "../component/Pagination";
import { useEffect, useState } from "react";

interface ApplicationData {
  RecordsEstimate: number;
  _id: number;
  date: string;
  companyName: string;
  type: string;
  position: string;
  phone: string;
  email: string;
  status: string;
  name: string;
}

const RecruitersApplication = () => {
  const [udata, setUData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [RecordsEstimate, setRecordsEstimate] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 2;

  const { API_base_url } = useAuthContext();

  const { data } = useQuery("recruiters", async () => {
    return axios.get(
      `${API_base_url}api/user?page=${currentPage}&limit=${itemsPerPage}`
    );
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: any = await axios.get(
          `${API_base_url}api/user?page=${currentPage}&limit=${itemsPerPage}`
        );
        setUData(res.data.users);
        setRecordsEstimate(res?.data.RecordsEstimate);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentPage]);

  return (
    <>
      <div className="w-full">
        <TopNav title="Recruiters list" />
        <Search />
        <main className="mt-8 mr-4">
          <div className="flex items-center flex-wrap gap-10 mb-8">
            <div>
              <p className="flex items-center gap-2 font-bold text-sm">
                Showing
                <span>{`${ data?.data.users.length + currentPage } of ${RecordsEstimate}`}</span>
                recruiter
              </p>
              <small>Based your preferences</small>
            </div>
            <div className="flex py-2 md:py-0 flex-wrap justify-left items-center gap-4">
              <button className="shadow-lg px-4 py-1 rounded-full bg-indigo-600 text-white">
                All
              </button>
              <button className="shadow-lg px-4 py-1 rounded-full bg-[#E7DDFF] text-[#5C5C5C]">
                Pending
              </button>

              <button className="shadow-lg px-4 py-1 rounded-full bg-[#E7DDFF] text-[#5C5C5C]">
                Active
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
                    <input type="checkbox" name="" id="" />
                    &nbsp; ID
                  </th>
                  <th scope="col">Date Applied</th>
                  <th scope="col">Name</th>
                  <th scope="col">Company</th>
                  <th scope="col">Position</th>
                  <th scope="col">Contact</th>
                  <th scope="col" className="text-center">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={8}>Loading...</td>
                  </tr>
                ) : (
                  udata &&
                  udata.map((recruiter: ApplicationData, i: number) => (
                    <tr key={recruiter._id}>
                      <td data-label="ID">
                        <input type="checkbox" name="" id="" />
                        &nbsp; &nbsp;
                        {i + 1}
                      </td>
                      <td data-label="Date Applied">
                        {formatDistanceToNow(new Date(recruiter.date), {
                          addSuffix: true,
                        })}
                      </td>

                      <td data-label="Name">
                        <span className="rounded-lg shadow-lg px-4 py-1  bg-gray-400"></span>
                        &nbsp; &nbsp;
                        {recruiter.name}
                      </td>

                      <td data-label="Company">{recruiter.companyName}</td>

                      <td data-label="Position">{recruiter.position}</td>
                      <td data-label="Contact" className="contactTD">
                        <span className="">
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
                        </span>
                      </td>
                      <td data-label="Status" className="">
                        <span className="">
                          <small className="bg-indigo-100 rounded-full px-4 py-1">
                            {recruiter.status}
                          </small>

                          <img
                            src={options}
                            alt="Options"
                            className="h-4 inline"
                          />
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            totalPages={Math.ceil(RecordsEstimate / itemsPerPage)}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </main>
      </div>
    </>
  );
};

export default RecruitersApplication;
