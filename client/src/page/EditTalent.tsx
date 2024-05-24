import React, { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import PageHeroSection from "../components/PageHeroSection";
import { useParams, useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

import infoline from "../assets/img/information-line.png";

const Form = styled.form`
  margin: 0 auto 2rem;
  width: 100%;
  max-width: 400px;
  font-family: Roboto;

  input,
  textarea,
  button {
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

  .success {
    color: green;
  }

  .error,
  .required {
    color: red;
  }
`;

interface FormData {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword?: string;
  companyName?: string;
  location: string;
  designation: string;
  bio: string;
  status: string;
  role?: string;
  profileImg?: File | null;
}

const EditTalent = () => {
  const navigate = useNavigate();
  const { API_base_url } = useAuthContext();

  const { _id } = useParams();

  const [dataError, setError] = useState("");
  const [dataSuccess, setSuccess] = useState(false);

  const { data } = useQuery("editTalentQuery", () =>
    axios.get(`${API_base_url}api/talent/${_id}`)
  );

  console.log({ data });
  const [talentFormData, setTalentFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    profileImg: null,
    password: "",
    location: "",
    designation: "",
    bio: "",
    status: "active",
  });

  const talentMutation = useMutation<void, Error, FormData>(
    async (formDataT) => {
      try {
        const formData = new FormData();

        formData.append("location", formDataT.location);
        formData.append("designation", formDataT.designation);
        formData.append("bio", formDataT.bio);
        formData.append("status", formDataT.status);
        if (formDataT.profileImg) {
          formData.append("profileImg", formDataT.profileImg);
        }

        const response = await axios.patch(
          `${API_base_url}api/talent/${_id}`,
          formData
        );

        if (response.data.error) {
          setSuccess(false);
          throw new Error(`${response.data.response}`);
        } else {
          setError("");
        }

        setSuccess(response.data.response);
        navigate("/userslayout", { replace: true });
      } catch (error) {
        setSuccess(false);
        if (error instanceof AxiosError) {
          setError("Please check what you're submitting");
        } else {
          setError(`${error}`);
        }
        console.log(error);
      }
    }
  );

  const handleTalentSubmision = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    talentMutation.mutate(talentFormData);

    // setTalentFormData({} as TalentFormData);
  };

  const handleTalentInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    if (name === "profileImg") {
      const inputElement = event.target as HTMLInputElement; // Type assertion
      const files = inputElement.files;

      if (files && files.length > 0) {
        setTalentFormData((prev) => ({
          ...prev,
          [name]: files[0],
        }));
        return;
      }
    }

    setTalentFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <main>
      <PageHeroSection>
        <div>
          <h1>Registeration completion</h1>
          <small>
            Please complete your registration by filling the form below
          </small>
        </div>
      </PageHeroSection>
      <section className="align-center w-[100%] mt-8">
        <Form
          className="bg-gray-50 p-4"
          onSubmit={handleTalentSubmision}
          encType="multipart/form-data"
          action="/createTalent"
          method="post"
        >
          <label htmlFor="name">
            Full Name <span className="required">*</span>
          </label>
          <Input
            onChange={handleTalentInput}
            id="names"
            name="name"
            value={data?.data.response.name || ""}
            placeholder="Your name"
            type="text"
            autocomplete="on"
          />
          <label htmlFor="email">
            Email <span className="required">*</span>
          </label>
          <Input
            // readonly
            onChange={handleTalentInput}
            name="email"
            value={data?.data.response.email || ""}
            placeholder="Eg: example@gmail.com"
            type="email"
            autocomplete="on"
          />

          <label htmlFor="phones">
            Phone <span className="required">*</span>
          </label>
          <Input
            required
            onChange={handleTalentInput}
            id="phones"
            // readonly
            name="phone"
            value={data?.data.response.phone || ""}
            placeholder="Phone no."
            type="text"
            autocomplete="on"
          />

          <label htmlFor="location">
            Location <span className="required">*</span>
          </label>
          <Input
            required
            onChange={handleTalentInput}
            id="location"
            name="location"
            value={talentFormData.location || ""}
            placeholder="Eg: United State Of America(USA)"
            type="text"
            autocomplete="on"
          />

          <label htmlFor="designation">
            Designation <span className="required">*</span>
          </label>
          <Input
            required
            onChange={handleTalentInput}
            id="designation"
            name="designation"
            value={talentFormData.designation || ""}
            placeholder="Eg: Front end"
            type="text"
            autocomplete="on"
          />

          <Input
            onChange={handleTalentInput}
            name="status"
            value={talentFormData.status}
            type="hidden"
          />

          <label htmlFor="profileImg">Profile image</label>
          <input
            type="file"
            id="profileImg"
            name="profileImg"
            onChange={handleTalentInput}
          />

          <label htmlFor="bio" className="flex items-center gap-1">
            <img
              className="cursor-pointer"
              src={infoline}
              alt="infoline"
              title="Please do well to share your story to catch recruiters attention"
            />
            Bio <span className="required">*</span>
          </label>

          <textarea
            required
            name="bio"
            id="bio"
            placeholder="Tell us about you."
            value={talentFormData.bio || ""}
            onChange={handleTalentInput}
          ></textarea>
          <h2>
            <span className="error">{dataError}</span>
            <span className="success">{dataSuccess}</span>
          </h2>
          <Button
            type="submit"
            value="Update"
            isLoading={talentMutation.isLoading}
          />
        </Form>
      </section>
    </main>
  );
};

export default EditTalent;
