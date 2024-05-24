import TopNav from "../component/TopNav";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { useQuery } from "react-query";

import tel from "../../icons/telephone.svg";
import email from "../../icons/email.svg";
import options from "../../icons/ic_option.svg";

import { Link } from "react-router-dom";
import { useState } from "react";
import useAuthContext from "../../hooks/useAuthContext";
import Search from "../component/Search";
// import Pagination from "../component/Pagination";

interface ApplicationData {
  _id: string;
  phone: string;
  email: string;
  status: string;
  name: string;
  cvs: string;
  createdAt: Date;
}

const TalentsApplication = () => {
  const { API_base_url } = useAuthContext();

  const { isLoading, data } = useQuery("talents", async () => {
    return await axios.get(`${API_base_url}api/talent`);
  });

  const [toggledItems, setToggledItems] = useState<string[]>([]);

  const handleClick = (id: string) => {
    setToggledItems((prevState) => {
      if (prevState.includes(id)) {
        return prevState.filter((item) => item !== id);
      } else {
        return [...prevState, id];
      }
    });
  };

  return (
    <>
      <div className="w-full">
        <TopNav title="Talents List" />
        <Search />
        <main className="mt-8 mr-4">
          <div className="flex items-center flex-wrap gap-10 mb-8">
            <div>
              <p className="flex items-center gap-2 font-bold text-sm">
                Showing
                <span>{data?.data.response.length}</span>
                talents
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
                Active talents
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
                    S/N
                  </th>
                  <th scope="col">Date Applied</th>
                  <th scope="col">Name</th>
                  <th scope="col">CVs</th>

                  <th scope="col">Contact</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td>Loading...</td>
                  </tr>
                ) : (
                  data &&
                  data.data.response.map(
                    (talent: ApplicationData, i: number) => (
                      <tr key={talent._id}>
                        <td data-label="S/N">
                          <input type="checkbox" name="" id="" />
                          &nbsp;&nbsp;
                          {i + 1}
                        </td>
                        <td data-label="Date Applied">
                          {formatDistanceToNow(new Date(talent.createdAt), {
                            addSuffix: true,
                          })}
                        </td>

                        <td className="" data-label="Name">
                          <span className="rounded-lg shadow-lg px-4 py-1 mr-2 inline bg-gray-400"></span>
                          {talent.name}
                        </td>
                        <td className="" data-label="CVs">
                          <a
                            href={`${API_base_url}${talent.cvs}`}
                            download={talent.name}
                            target="_blank"
                          >
                            Download CV
                          </a>
                        </td>

                        <td data-label="Contact">
                          <span className="contactTD">
                            {talent.phone && (
                              <a href={`tel: ${talent.phone}`}>
                                <img
                                  src={tel}
                                  alt="tel"
                                  className="w-8 shadow-inner rounded-full p-2"
                                />
                              </a>
                            )}
                            {talent.email && (
                              <a href={`mailto: + ${talent.email}`}>
                                <img
                                  src={email}
                                  alt="envelope"
                                  className="w-8 shadow-inner rounded-full p-2"
                                />
                              </a>
                            )}
                          </span>
                        </td>
                        <td className="relative contactTD" data-label="Status">
                          <span className="">
                            <small className=" bg-indigo-100 rounded-full shadow-lg my-4 px-4 py-1">
                              {talent.status}
                            </small>
                            <img
                              src={options}
                              alt="Options"
                              onClick={() => handleClick(talent._id)}
                              className="cursor-pointer h-4"
                            />
                          </span>
                          {toggledItems.includes(talent._id) && (
                            <div className="absolute bg-gray-800 text-white p-1 bottom-0 right-[50px]">
                              <Link
                                to={`../../userslayout/edittalent/${talent._id}`}
                              >
                                Edit
                              </Link>
                              <br />
                              <Link to={`../reviewapplication/${talent._id}`}>
                                View
                              </Link>
                            </div>
                          )}
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

export default TalentsApplication;
