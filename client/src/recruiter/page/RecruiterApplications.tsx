import TopNav from "../component/TopNav";
import axios from "axios";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import options from "../../icons/ic_option.svg";

import useAuthContext from "../../hooks/useAuthContext";

import { useQuery } from "react-query";
import Search from "../component/Search";
import Pagination from "../component/Pagination";
import { useState } from "react";

interface ApplicationData {
  jobID: any;
  _id: string;
  id: number;
  talentID: any;
  date: string;
  companyName: string;
  createdAt: string;
  type: string;
  position: string;
  phone: string;
  email: string;
  status: string;
  name: string;
}

const Applications = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [RecordsEstimate] = useState(0);
  const itemsPerPage = 5;

  const { values, API_base_url } = useAuthContext();

  const { isLoading, data } = useQuery("applications", () =>
    axios.get(
      `${API_base_url}api/application/recruiterapplications/${values?._id}`
    )
  );

  console.log({ data }, "DATA");

  return (
    <>
      <div className="w-full">
        <TopNav title="Application" />

        <main className="mt-8 pl-2">
          <div className="flex items-center flex-wrap gap-10 mb-8">
            <div>
              <p className="flex items-center gap-2 font-bold text-sm">
                Showing
                <span>{data?.data > 0 ? data?.data : "0"}</span>
                applicants
              </p>
              <small>Based your preferences</small>
            </div>

            <div className="flex md:px-4 px-1 flex-wrap items-center gap-4">
              <span className="flex gap-4">
                <button className="shadow-lg px-4 py-1 rounded-full bg-indigo-600 text-white">
                  All
                </button>
                <button className="shadow-lg px-4 py-1 rounded-full bg-[#E7DDFF] text-[#5C5C5C]">
                  Not-Hired
                </button>
              </span>
              <span className="flex gap-4">
                <button className="shadow-lg px-4 py-1 rounded-full bg-[#E7DDFF] text-[#5C5C5C]">
                  Hired
                </button>
              </span>
            </div>
          </div>
          <Search />
          <table>
            <thead>
              <tr>
                <th scope="col" className="flex items-center">
                  <input type="checkbox" name="" id="" />
                  &nbsp; S/N
                </th>
                <th scope="col">Date Applied</th>
                <th scope="col">Name</th>
                <th scope="col">Company</th>
                <th scope="col">Type</th>
                <th scope="col">Position</th>
                <th scope="col">Preview</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td>
                    <h2>Loading...</h2>
                  </td>
                </tr>
              ) : data?.data.response.length < 0 ? (
                <tr>
                  <td>
                    <h2>Nothing is here</h2>
                  </td>
                </tr>
              ) : (
                data?.data.response.map((ele: ApplicationData, i: any) => (
                  <tr key={i}>
                    <td data-label="S/N">
                      <input type="checkbox" name="" id="" />
                      &nbsp;
                      {i + 1}
                    </td>
                    <td data-label="Date Applied">
                      {formatDistanceToNow(new Date(ele.createdAt), {
                        addSuffix: true,
                      })}
                    </td>
                    <td data-label="Name" className="">
                      <span className="rounded-lg shadow-lg px-4 py-1 bg-gray-400"></span>
                      &nbsp;
                      {ele.name}
                    </td>

                    <td data-label="Company" className="">
                      {ele.companyName}
                    </td>

                    <td data-label="Type">{ele.type}</td>
                    <td data-label="Position">{ele.position}</td>
                    <td data-label="Preview">
                      <Link to={`../reviewapplications/${ele.talentID._id}`}>
                        Previev
                      </Link>
                    </td>

                    <td data-label="Status">
                      <span className="">
                        <small className="bg-indigo-100 rounded-full shadow-lg my-1 px-4 py-1">
                          {ele.jobID.status}
                        </small>
                        <img src={options} alt="Options" className="inline" />
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </main>
        <Pagination
          totalPages={Math.ceil(RecordsEstimate / itemsPerPage)}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
};

export default Applications;
