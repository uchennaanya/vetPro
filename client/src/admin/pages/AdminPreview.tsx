import TopNav from "../component/TopNav";

import candidateMap from "../../assets/img/candidateMap.svg"
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import Button from "../../components/Button";
import Candidates from "../../components/Candidates";

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



const AdminPreview = () => {
  const { _id } = useParams();

  const { data } = useQuery(
    "previewAdmin",
    async () => await axios.get(`http://localhost:8000/api/user/${_id}`)
  );

  console.log(data?.data.name);

  return (
    <>
      <div className="w-full">
        <TopNav title="Dashboard" />
        <main className="mt-8 w-full md:pr-8">
          {/* <div className="flex flex-wrap gap-8 mr-2 md:mr-0 stat">
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
          </div> */}
          <Wrapper >
          <Candidates>
              <div>
                {/* <img src={candidate1} alt="candidate1" /> */}
                <h4>{}</h4>
                <small>{}</small>
                <small>
                  <img src={candidateMap} alt="candidateMap" />
                  Washington, USA
                </small>

                <Link to={`/candidatprofile/${_id}`}>
                  <Button className="btn-blue" value="view Profile" />
                </Link>
              </div>
            </Candidates>
          </Wrapper>
        </main>
      </div>
    </>
  );
};

export default AdminPreview;
