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
  const { API_base_url } = useAuthContext();

  const { talentID } = useParams();

  console.log({ talentID }, "Talent ID");

  const { isLoading: talentsLoading, data: talentPreviewAd } = useQuery(
    "applications",
    () => axios.get(`${API_base_url}api/talent/${talentID}`)
  );

  console.log({ talentPreviewAd }, "Data");

  return (
    <>
      <div className="w-full">
        <TopNav title="Talent's record" />
        <main className="mt-8 px-2 w-[100%] sm:w-fit">
          {talentsLoading ? (
            <h2>talentsLoading...</h2>
          ) : (
            <Candidates key={talentPreviewAd?.data._id} className="">
              <div>
                {talentPreviewAd?.data.response.profileImg ? (
                  <img
                    width={100}
                    src={`${API_base_url}${talentPreviewAd?.data.response.profileImg}`}
                    alt={talentPreviewAd?.data.response.name}
                  />
                ) : (
                  <img
                    width={100}
                    src={talentAvater}
                    alt={talentPreviewAd?.data.response}
                  />
                )}
                <h4>{talentPreviewAd?.data.response.name}</h4>
                <address>{talentPreviewAd?.data.response.email}</address>
                <small>{talentPreviewAd?.data.response.designation}</small>
                <small>
                  <img src={candidateMap} alt="candidateMap" />
                  {talentPreviewAd?.data.response.location}
                </small>
                <p>{talentPreviewAd?.data.response.bio}</p>
                <Button
                  value={talentPreviewAd?.data.response.jobSearchStatus}
                />
                &nbsp;
                <Button className="btn-blue" value="Hire talent" />
              </div>
            </Candidates>
          )}
        </main>
      </div>
    </>
  );
};

export default ReviewApplications;
