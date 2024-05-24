import Input from "../components/Input";
import PageHeroSection from "../components/PageHeroSection";
import RecentJobs from "../components/RecentJob";
import star from "../assets/img/star.svg";
import map2 from "../assets/img/map2.svg";
import timer from "../assets/img/timer.svg";
import dollarsign from "../assets/img/dollarsign.svg";
import styled from "styled-components";
import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import { FormEvent, useState } from "react";
import Button from "../components/Button";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Small = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  align-items: center;
  margin: 0.5rem 0;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  margin: 2rem 0;
  padding: 0 3rem;
`;

interface FormData {
  talentID: string;
  name: string;
  email: string;
}

const JobPreview = () => {
  const navigate = useNavigate();
  const { auth, API_base_url } = useAuthContext();
  const { _id } = useParams();

  const [success, setSuccess] = useState(true);
  const [error, setError] = useState("");

  const talentRaw: any = localStorage.getItem("tData") ?? "{}";
  const talent = JSON.parse(talentRaw);

  const { isLoading, data: jobPrevQuery } = useQuery("jobPreview", () =>
    axios.get(`${API_base_url}api/jobs/job/${_id}`)
  );

  // FOR JOBAPPLICATION
  const [formData] = useState<FormData>({
    talentID: talent?._id,
    name: talent?.name,
    email: talent?.email,
  });

  const succ = (msg: string) => {
    withReactContent(Swal).fire({
      title: "TW",
      text: msg,
      icon: "success",
    });
  };

  const jobApplicationMutation = useMutation<void, Error, FormData>(
    async (formData) => {
      try {
        const response = await axios.post(
          `${API_base_url}api/application/${_id}`,
          formData
        );

        if (response.data.error) {
          setSuccess(false);
          throw Error(`${response.data.response}`);
        } else {
          setError("");
        }

        succ(response.data.success);
      } catch (error) {
        setError(`${error}`);
        setSuccess(false);
        console.log(error);
      }
    }
  );

  const handleApplication = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!auth) {
      navigate("/userslayout");
    } else {
      jobApplicationMutation.mutate(formData);
    }
    console.log("Applied");
  };

  return (
    <>
      <PageHeroSection>
        <div>
          <div>
            <h1>Job Details</h1>
            <small>
              Please take your time to consider this job carefully and apply
            </small>
          </div>
        </div>
      </PageHeroSection>

      <Wrapper>
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          <RecentJobs key={jobPrevQuery?.data._id}>
            <div>
              <div className="coperation">
                <div>
                  <img
                    src={`${API_base_url}${jobPrevQuery?.data.logo}`}
                    alt={jobPrevQuery?.data.companyName}
                  />
                  <small>{jobPrevQuery?.data.companyName}</small>
                </div>
                <img src={star} alt="a star" />
              </div>
              <h4>{jobPrevQuery?.data.jobTitle}</h4>
              <Small>
                <small>
                  <img src={map2} alt="Map2" />
                  {jobPrevQuery?.data.location}
                </small>
                <small>
                  <img src={timer} alt="" />
                  {formatDistanceToNow(new Date(jobPrevQuery?.data.createdAt), {
                    addSuffix: true,
                  })}
                </small>
                <small>
                  <img src={dollarsign} alt="dollarsign" /> $
                  {jobPrevQuery?.data.from}k - ${jobPrevQuery?.data.to}k
                </small>
              </Small>
              <div>
                <h3>Description</h3>
                <p className="py-2 mb-4">{jobPrevQuery?.data.desc}</p>
                <hr />
                <h3>Requirements</h3>
                <p className=" py-2 mb-4">{jobPrevQuery?.data.requirement}</p>
              </div>

              <form onSubmit={handleApplication}>
                <Input
                  value={formData.talentID}
                  name="talentID"
                  type="hidden"
                />
                <Input value={formData.name} name="name" type="hidden" />
                <Input value={formData.email} name="email" type="hidden" />
                <h2>
                  <span className="text-[red]">{error}</span>
                  <span className="success">{success}</span>
                </h2>

                <Button
                  type="submit"
                  value="Apply for this job"
                  isLoading={jobApplicationMutation.isLoading}
                  style={{ background: "blue", color: "#fff", opacity: "0.5" }}
                />
              </form>
            </div>
          </RecentJobs>
        )}
      </Wrapper>
    </>
  );
};

export default JobPreview;
