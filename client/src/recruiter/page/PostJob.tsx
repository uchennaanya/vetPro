import styled from "styled-components";
import Button from "../../components/Button";
import Input from "../../components/Input";
import TopNav from "../component/TopNav";
import React, { FormEvent, useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
import useAuthContext from "../../hooks/useAuthContext";

const Form = styled.form`
  padding: 1rem;
  width: 100%;
  margin: 1rem auto;
  max-width: 400px;

  input,
  button,
  textarea {
    display: block;
    border: 1px solid #ccc;
    margin: 0.5rem 0 1rem;
    padding: 0.4rem;
    width: 100%;
    color: #000;
    caret-color: #000;
  }

  button {
    background: blue;
    color: #fff;
  }
`;

interface JobPostInput {
  userName: string | undefined;
  recruiterID: string | undefined;
  jobTitle: string;
  category: string;
  jobType: string;
  from: string;
  to: string;
  vacancies: string;
  yofexperience: string;
  location: string;
  companyName: string;
  desc: string;
  requirement: string;
  logo: File | null;
}

const PostJob = () => {
  const { values, API_base_url } = useAuthContext();
  
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<JobPostInput>({
    userName: values?.name,
    recruiterID: values?._id,
    jobTitle: "",
    category: "",
    jobType: "",
    from: "",
    to: "",
    vacancies: "",
    yofexperience: "",
    location: "",
    companyName: "",
    desc: "",
    requirement: "",
    logo: null,
  });

  const mutation = useMutation<void, Error, JobPostInput>(async (formDataT) => {
    try {
      const formData = new FormData();
      formData.append("userName", formDataT.userName || "");
      formData.append("recruiterID", formDataT.recruiterID || "");
      formData.append("jobTitle", formDataT.jobTitle);
      formData.append("category", formDataT.category);
      formData.append("jobType", formDataT.jobType);
      formData.append("email", formDataT.jobType);
      formData.append("from", formDataT.from);
      formData.append("to", formDataT.to);
      formData.append("vacancies", formDataT.vacancies);
      formData.append("yofexperience", formDataT.yofexperience);
      formData.append("location", formDataT.location);
      formData.append("companyName", formDataT.companyName);
      formData.append("desc", formDataT.desc);
      formData.append("requirement", formDataT.requirement);
      if (formDataT.logo) {
        formData.append("logo", formDataT.logo, formDataT.logo.name); // Append the file and its name
      }

      const response = await axios.post(
        `${API_base_url}api/jobs/` + values?._id,
        formData
      );

      if (response.data.error) {
        setSuccess("");
        throw Error(`${response.data.response}`);
      } else {
        setError("");
      }

      setSuccess(response.data.response);
    } catch (error) {
      setSuccess("");
      setError(`${error}`);
      console.log(error);
    }
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate(formData);
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = event.target;

    if (type === "file" && event.target instanceof HTMLInputElement) {
      const files = event.target.files;
      if (files && files.length > 0) {
        setFormData((prev) => ({ ...prev, [name]: files[0] }));
      }
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  return (
    <>
      <div className="w-full">
        <TopNav title="Post a job" />
        <main>
          <Form onSubmit={handleSubmit}>
            <h2 className="text-2xl">Post a job</h2>
            <Input
              required
              id="userName"
              name="userName"
              value={formData.userName}
              type="hidden"
            />{" "}
            <Input
              required
              id="recruiterID"
              name="recruiterID"
              value={formData.recruiterID}
              type="hidden"
            />
            <label htmlFor="name">Job title</label>
            <Input
              required
              id="title"
              name="jobTitle"
              value={formData.jobTitle || ""}
              onChange={handleInputChange}
              placeholder="Job title"
              type="text"
            />
            <label htmlFor="name">Category</label>
            <Input
              name="category"
              value={formData.category || ""}
              onChange={handleInputChange}
              placeholder="Category"
              type="text"
              id="category"
              list="category"
            />
            <datalist id="category">
              <option value="Boston" />
              <option value="Cambridge" />
            </datalist>
            <fieldset>
              <legend>Salary range (USD)</legend>
              <div className="flex gap-4 xs:flex-wrap">
                <div>
                  <label htmlFor="from">From</label>
                  <Input
                    id="from"
                    required
                    onChange={handleInputChange}
                    value={formData.from || ""}
                    name="from"
                    placeholder="Eg: 15"
                    type="number"
                  />
                </div>
                <div>
                  <label htmlFor="to">to</label>
                  <Input
                    id="to"
                    required
                    onChange={handleInputChange}
                    value={formData.to || ""}
                    name="to"
                    placeholder="Eg: 20"
                    type="number"
                  />
                </div>
              </div>
            </fieldset>
            <div className="flex gap-4">
              <div>
                <label htmlFor="nofcancancy">No. of Vacancies</label>
                <Input
                  id="nofcancancy"
                  required
                  onChange={handleInputChange}
                  value={formData.vacancies || ""}
                  name="vacancies"
                  placeholder="Eg: 4"
                  type="number"
                />
              </div>
              <div>
                <label htmlFor="typeofjob">Type of Job</label>
                <Input
                  id="typeofjob"
                  required
                  onChange={handleInputChange}
                  name="jobType"
                  value={formData.jobType || ""}
                  placeholder="Eg: Full-Time"
                  type="text"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div>
                <label htmlFor="yoexp">Years of Experience</label>
                <Input
                  id="yoexp"
                  required
                  onChange={handleInputChange}
                  value={formData.yofexperience || ""}
                  name="yofexperience"
                  placeholder="Eg: 6"
                  type="number"
                />
              </div>
              <div>
                <label htmlFor="joblocation">Job Location</label>
                <Input
                  id="joblocation"
                  required
                  onChange={handleInputChange}
                  value={formData.location || ""}
                  name="location"
                  placeholder="Eg: United State of America(US)"
                  type="text"
                />
              </div>
            </div>
            <label htmlFor="jd">Job Description</label>
            <textarea
              id="jd"
              name="desc"
              value={formData.desc || ""}
              placeholder="Job Description"
              onChange={handleInputChange}
            ></textarea>
            <label htmlFor="cr">Core Responsibility</label>
            <textarea
              id="cr"
              name="requirement"
              value={formData.requirement || ""}
              placeholder="Job Description"
              onChange={handleInputChange}
            ></textarea>
            <label htmlFor="companyname">Company name</label>
            <Input
              required
              onChange={handleInputChange}
              value={formData.companyName || ""}
              id="companyname"
              name="companyName"
              placeholder="Company name"
              type="text"
            />
            <label htmlFor="logo">
              Company logo
              <input
                required
                onChange={handleInputChange}
                id="logo"
                name="logo"
                type="file"
              />
            </label>
            <h2>
              <span className="text-red-500">{error}</span>
              <span className="text-green-800">{success}</span>
            </h2>
            <Button
              type="submit"
              value="+Post"
              isLoading={mutation.isLoading}
            />
          </Form>
        </main>
      </div>
    </>
  );
};

export default PostJob;
