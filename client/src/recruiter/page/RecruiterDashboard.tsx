import TopNav from "../component/TopNav";
import calender from "../../icons/calendar.svg";
import profile from "../../icons/avatar.svg";
import suitcase from "../../icons/suitcase.svg";
import email from "../../icons/email.svg";
import styled from "styled-components";


const Img = styled.div`
  border: 1px solid #ccc;
  padding: 0.4rem;
  border-radius: 9px;
  img {
    width: 30px;
  }
`;

const RecruiterDashboard = () => {
  return (
    <>
      <div className="w-full">
        <TopNav title="Dashboard" />
        <main className="mt-8 w-full md:pr-8 px-2">
          <div className="flex flex-wrap gap-8 mr-2 md:mr-0 stat">
            <div className="flex justify-between gap-8 items-center p-[1rem] rounded-lg shadow-lg bg-gradient-to-r from-green-800 to-green-200">
              <Img className="border-2 border-rose-600">
                <img src={calender} alt="Calender" />
              </Img>
              <div>
                <small className="text-right">Interview scheduled</small>
                <h2 className="text-2xl font-bold text-right">86</h2>
              </div>
            </div>
            <div className="flex justify-between gap-8 items-center p-[1rem] rounded-lg shadow-lg bg-gradient-to-r from-indigo-800 to-indigo-200">
              <Img>
                <img src={suitcase} alt="suitcase" />
              </Img>
              <div>
                <small>Application sent </small>
                <h2 className=" text-right text-2xl font-bold">67</h2>
              </div>
            </div>
            <div className="flex justify-between gap-8 items-center p-[1rem] rounded-lg shadow-lg bg-gradient-to-r from-gray-800 to-gray-200">
              <Img>
                <img src={profile} alt="profile" />
              </Img>
              <div>
                <small>Profile viewed</small>
                <h2 className="text-right text-2xl font-bold">1200</h2>
              </div>
            </div>
            <div className="flex justify-between gap-8 items-center p-[1rem] rounded-lg shadow-lg bg-gradient-to-r from-purple-600 to-purple-200">
              <Img>
                <img src={email} alt="email" />
              </Img>
              <div>
                <small>Unread messages</small>
                <h2 className="text-right text-2xl font-bold">49</h2>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default RecruiterDashboard;
