import TopNav from "../component/TopNav";
import axios from "axios";

import { formatDistanceToNow } from "date-fns";
import { useQuery } from "react-query";

import options from "../../icons/ic_option.svg";
import useAuthContext from "../../hooks/useAuthContext";
import { Link } from "react-router-dom";
import Search from "../component/Search";
import Pagination from "../component/Pagination";
import { useState } from "react";

interface JobsData {
  _id: any;
  createdAt: string;
  companyName: string;
  jobType: string;
  jobTitle: string;
  email: string;
  status: string;
  name: string;
}

const MyJobs = () => {
  const { API_base_url } = useAuthContext();

  //pagination assets
  const [currentPage, setCurrentPage] = useState(1);
  const [RecordsEstimate] = useState(0);
  const itemsPerPage = 5;
  //pagination assets

  // const fetchData = async () => {
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch(${API_base_url}api/v1/feeds?page=${currentPage}&limit=${itemsPerPage}, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'authorization': Bearer ${getStoredToken()},
  //       },
  //     });
  //     const data = await response.json();
  //     if (data.status === 'success') {
  //       handleRenderProcessedData(data.data);
  //       console.log('data.data', data.data)
  //       if (data.RecordsEstimate) {
  //         setRecordsEstimate(data.RecordsEstimate);
  //       }
  //     } else {
  //       throw Error(Could not fetch the data for that resource, ${data.message});
  //     }
  //   } catch (error) {
  //     Swal.fire(error.message);
  //     console.error('Request failed:', error);
  //   }
  //   setIsLoading(false);
  // }

  const talentRaw: any = localStorage.getItem("userData") ?? "{}";
  const talent = JSON.parse(talentRaw);

  const { isLoading, data } = useQuery("myJobs", () =>
    axios.get(
      `${API_base_url}api/jobs/${talent._id}?page=${currentPage}&limit=${itemsPerPage},`
    )
  );

  console.log({ data }, "JUST THE DATA");

  return (
    <>
      <div className="w-full">
        <TopNav title="My jobs" />
        <main className="mt-8 pl-1">
          <div className="flex items-center flex-wrap gap-10 mb-8">
            <div>
              <p className="flex items-center gap-2 font-bold text-sm">
                Showing
                <span>{data?.data.response.length ?? 0}</span>
                job/jobs
              </p>
              <small>Based your preferences</small>
            </div>
            <div className="flex px-4 flex-wrap justify-center items-center gap-4">
              <span className="flex gap-4">
                <button className="shadow-lg px-4 py-1 rounded-full bg-indigo-600 text-white">
                  All
                </button>
                <button className="shadow-lg px-4 py-1 rounded-full bg-[#E7DDFF] text-[#5C5C5C]">
                  Open
                </button>
              </span>
              <span className="flex gap-4">
                <button className="shadow-lg px-4 py-1 rounded-full bg-[#E7DDFF] text-[#5C5C5C]">
                  closed
                </button>
              </span>
            </div>
          </div>
          <Search />
          <div className="flex flex-wrap gap-8  bg-white rounded-lg shadow-lg overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th scope="col">
                    <input type="checkbox" name="" id="" />
                    &nbsp; S/N
                  </th>
                  <th scope="col">Date Applied</th>
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
                ) : (
                  data?.data.response.map((ele: JobsData, i: any) => (
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

                      <td data-label="Company" className="">
                        {ele.companyName}
                      </td>
                      <td data-label="Type">{ele.jobType}</td>
                      <td data-label="Position">{ele.jobTitle}</td>
                      <td data-label="Preview">
                        <Link to={`/ele._id`}>Preview</Link>
                      </td>

                      <td data-label="Status">
                        <span className="">
                          <small className=" bg-indigo-100 rounded-full shadow-lg px-4 py-1">
                            {ele.status}
                          </small>
                          <img src={options} alt="Options" className="inline" />
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
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

export default MyJobs;
