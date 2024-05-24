import TopNav from "../component/TopNav";
import axios from "axios";
import { useParams } from "react-router-dom";

import talentAvater from "../../assets/img/talentAvater.jpg";
import Candidates from "../../components/Candidates";
import candidateMap from "../../assets/img/candidateMap.svg";
import Button from "../../components/Button";

import useAuthContext from "../../hooks/useAuthContext";

import { useQuery } from "react-query";

const ReviewApplications = () => {
  const { API_base_url, values } = useAuthContext();

  const { talentID } = useParams();

  console.log({ talentID }, "Talent ID");

  const { isLoading: talentsLoading, data: talentPreview } = useQuery(
    "applications",
    () => axios.get(`${API_base_url}api/talent/${talentID}`)
  );

  const handleHireTalent = async () => {
    const ress = await axios.patch(`${API_base_url}api/user/hireTalent/${values?._id}`);

    console.log(ress, "RESS");
  };

  console.log({ talentPreview }, "Data");

  return (
    <>
      <div className="w-full">
        <TopNav title="Talent's record" />
        <main className="mt-8 px-2 w-[100%] sm:w-fit">
          {talentsLoading ? (
            <h2>talentsLoading...</h2>
          ) : (
            <Candidates key={talentPreview?.data._id} className="">
              <div>
                {talentPreview?.data.response.profileImg ? (
                  <img
                    width={100}
                    src={`${API_base_url}${talentPreview?.data.response.profileImg}`}
                    alt={talentPreview?.data.response.name}
                  />
                ) : (
                  <img
                    width={100}
                    src={talentAvater}
                    alt={talentPreview?.data.response}
                  />
                )}
                <h4>{talentPreview?.data.response.name}</h4>
                <small>{talentPreview?.data.response.designation}</small>
                <small>
                  <img src={candidateMap} alt="candidateMap" />
                  {talentPreview?.data.response.location}
                </small>
                <p>{talentPreview?.data.response.bio}</p>
                <Button value={talentPreview?.data.response.jobSearchStatus} />
                &nbsp;
                <Button
                  className="btn-blue"
                  onclick={handleHireTalent}
                  value="Hire talent"
                />
              </div>
            </Candidates>
          )}
        </main>
      </div>
    </>
  );
};

export default ReviewApplications;
