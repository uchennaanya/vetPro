import TopNav from "../component/TopNav";

import useAuthContext from "../../hooks/useAuthContext";


const Statistics: React.FC = () => {

  const { values } = useAuthContext();

  return (
    <>
      <div className="w-full bg-gray-50">
        <TopNav title="Statistics" userName={values?.name} />
        <main className="mt-8 pl-2">
          <div className="flex items-center flex-wrap gap-10 mb-8">
            <div>
              <p className="flex items-center gap-2 font-bold text-sm">
                Showing
                applicants
              </p>
              <small>Based your preferences</small>
            </div>
            <div className="flex px-4 flex-wrap justify-center items-center gap-4">
              <span className="flex gap-4">
                <button className="shadow-lg px-4 py-1 rounded-full bg-indigo-600 text-white">
                  All
                </button>
                <button className="shadow-lg px-4 py-1 rounded-full bg-[#E7DDFF] text-[#5C5C5C]">
                  Pending
                </button>
              </span>
              <span className="flex gap-4">
                <button className="shadow-lg px-4 py-1 rounded-full bg-[#E7DDFF] text-[#5C5C5C]">
                  On-hold
                </button>
                <button className="shadow-lg px-4 py-1 rounded-full bg-[#E7DDFF] text-[#5C5C5C]">
                  Candidate
                </button>
              </span>
            </div>
          </div>
          <div className="flex flex-wrap gap-8 mr-2 md:mr-0  bg-white rounded-xl shadow-lg w-[100%] overflow-x-auto">
            {/* <table>
              <caption>Statement Summary</caption>
              <thead>
                <tr>
                  <th scope="col">Account</th>
                  <th scope="col">Due Date</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Period</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Account">Visa - 3412</td>
                  <td data-label="Due Date">04/01/2016</td>
                  <td data-label="Amount">$1,190</td>
                  <td data-label="Period">03/01/2016 - 03/31/2016</td>
                </tr>
                <tr>
                  <td scope="row" data-label="Account">
                    Visa - 6076
                  </td>
                  <td data-label="Due Date">03/01/2016</td>
                  <td data-label="Amount">$2,443</td>
                  <td data-label="Period">02/01/2016 - 02/29/2016</td>
                </tr>
                <tr>
                  <td scope="row" data-label="Account">
                    Corporate AMEX
                  </td>
                  <td data-label="Due Date">03/01/2016</td>
                  <td data-label="Amount">$1,181</td>
                  <td data-label="Period">02/01/2016 - 02/29/2016</td>
                </tr>
                <tr>
                  <td scope="row" data-label="Acount">
                    Visa - 3412
                  </td>
                  <td data-label="Due Date">02/01/2016</td>
                  <td data-label="Amount">$842</td>
                  <td data-label="Period">01/01/2016 - 01/31/2016</td>
                </tr>
              </tbody>
            </table> */}

            <table className="w-[100%]">
              {/* <thead>
                <tr>
                  <th scope="col" className="flex gap-4 items-center">
                    <input type="checkbox" name="" id="" />
                    ID
                  </th>
                  <th scope="col">Date Applied</th>
                  <th scope="col">Name</th>
                  <th scope="col">Company</th>
                  <th scope="col">Type</th>
                  <th scope="col">Position</th>
                  <th scope="col">Contact</th>
                  <th scope="col">Status</th>
                </tr>
              </thead> */}
              {/* <tbody>
                {applications.map((ele, i) => (
                  <tr key={i}>
                    <td>
                      <input type="checkbox" name="" id="" />
                      {ele.id}
                    </td>
                    <td>{ele.date}</td>
                    <td className="flex gap-4">
                      <span className="rounded-lg shadow-lg p-4 bg-gray-400"></span>
                      {ele.name}
                    </td>

                    <td className="">{ele.companyName}</td>

                    <td>{ele.type}</td>
                    <td>{ele.position}</td>
                    <td className="flex items-center gap-4">
                      {ele.phone && (
                        <a href={`tel: ${ele.phone}`}>
                          <img
                            src={tel}
                            alt="tel"
                            style={{
                              display: "inline",
                            }}
                            className="w-4 h-5 mr-2"
                          />
                        </a>
                      )}
                      {ele.email && (
                        <a href={`sms: + ${ele.email}`}>
                          <img
                            src={email}
                            alt="tel"
                            style={{
                              display: "inline",
                            }}
                            className="w-4 h-5 mr-2"
                          />
                        </a>
                      )}
                    </td>
                    <td>
                      <span className="flex items-center">
                        <small className=" bg-indigo-100 rounded-full shadow-lg my-4 px-4 py-1">
                          {ele.status}
                        </small>
                        <img src={options} alt="Options" />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody> */}
            </table>
          </div>
        </main>
      </div>
    </>
  );
};

export default Statistics;
