import React, { FormEvent, useState } from "react";
import axios, { AxiosError } from "axios";
import { useMutation } from "react-query";
import styled from "styled-components";
import Button from "../components/Button";

import Input from "../components/Input";
import PageHeroSection from "../components/PageHeroSection";
import { Link, NavLink, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import useAuthContext from "../hooks/useAuthContext";

const Form = styled.form`
  margin: 0 auto 2rem;
  width: 100%;
  max-width: 400px;
  font-family: Roboto;

  input,
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
  position?: string;
  role?: string;
  cv?: File | null;
}

const Register = () => {
  const { API_base_url } = useAuthContext();

  const navigate = useNavigate();
  const [dataError, setError] = useState("");
  const [dataSuccess, setSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const succ = (msg: string) => {
    withReactContent(Swal).fire({
      title: "TW",
      color: "green",
      text: msg,
      icon: "success",
    });
  };

  const failure = (msg: string) => {
    withReactContent(Swal).fire({
      title: "TW",
      color: "red",
      text: msg,
      icon: "error",
    });
  };

  // FOR RECRUITER
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    confirmPassword: "",
    password: "",
    phone: "",
    role: "recruiter",
    position: "",
    companyName: "",
  });

  const recruiterMutation = useMutation<void, Error, FormData>(
    async (formData) => {

      try {
        const response = await axios.post(`${API_base_url}api/user`, formData);

        if (response.data.response) {
          setSuccess(false);
          throw Error(`${response.data.response}`);
        } else {
          setError("");
        }

        succ(response.data.success);
        navigate("/userslayout", { replace: true });
        // setSuccess(response.data.success);
      } catch (error) {
        // setError(`${error}`);

        failure(`${error}`);
        setSuccess(false);
        console.log(error);
      }
    }
  );

  const handleRecuiter = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    recruiterMutation.mutate(formData);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const recruiterTab = () => {
    setSuccess(false);
    setShowForm(true);
  };

  // FOR TALENT
  const [talentFormData, setTalentFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    cv: null,
    password: "",
  });

  const talentMutation = useMutation<void, Error, FormData>(
    async (formDataT) => {
      try {
        const formData = new FormData();
        formData.append("name", formDataT.name);
        formData.append("email", formDataT.email);
        formData.append("phone", formDataT.phone);
        formData.append("password", formDataT.password);
        if (formDataT.cv) {
          formData.append("cv", formDataT.cv);
        }

        const response = await axios.post(
          `${API_base_url}api/talent/`,
          formData
        );

        if (response.data.error) {
          setSuccess(false);
          throw new Error(`${response.data.response}`);
        } else {
          setError("");
        }

        setSuccess(response.data.response);
      } catch (error) {
        setSuccess(false);
        if (error instanceof AxiosError) {
          failure("Please check what you're submitting");
          // setError();
        } else {
          failure(`${error}`);
          // setError(`${error}`);
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

  const handleTalentInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;

    if (name === "cv" && files && files.length > 0) {
      setTalentFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setTalentFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const talentTab = () => {
    setSuccess(false);
    setShowForm(false);
  };

  return (
    <>
      <PageHeroSection>
        <div>
          <h1>Register</h1>
          <small>
            Become a registered user to get the best of Techwings Global
          </small>
          <NavLink to="/">Home</NavLink>
        </div>
      </PageHeroSection>
      <main className="flex justify-center mx-[2rem]">
        <section className="flex flex-col align-center w-fit mx-2 mt-8">
          <div className="">
            <button
              className="bg-indigo-100/50 p-4 w-[100%] md:w-[200px]"
              onClick={recruiterTab}
            >
              Recruiter
            </button>
            <button
              className="bg-gray-50 p-4 w-[100%] md:w-[200px]"
              onClick={talentTab}
            >
              Talent
            </button>
          </div>
          {showForm ? (
            // RECRUITER FORM
            <Form className="bg-indigo-100/50 p-4" onSubmit={handleRecuiter}>
              <label htmlFor="name">
                Full Name <span className="required">*</span>
              </label>
              <Input
                onChange={handleInputChange}
                id="name"
                name="name"
                value={formData.name || ""}
                placeholder="Your name"
                type="text"
                autocomplete="on"
                minlength={3}
              />
              <label htmlFor="email">
                Work email <span className="required">*</span>
              </label>
              <Input
                onChange={handleInputChange}
                name="email"
                value={formData.email || ""}
                placeholder="Eg: yourname@companyname.com"
                type="email"
                autocomplete="on"
                minlength={3}
              />

              <label htmlFor="password">
                Password <span className="required">*</span>
              </label>
              <Input
                onChange={handleInputChange}
                name="password"
                value={formData.password || ""}
                placeholder="Eg: my-Pap100"
                type=""
                id="password"
                autocomplete="on"
                minlength={3}
              />

              <label htmlFor="confirmPassword">
                Confirm Password <span className="required">*</span>
              </label>
              <Input
                onChange={handleInputChange}
                name="confirmPassword"
                value={formData.confirmPassword || ""}
                placeholder="Eg: my-Pap100"
                type=""
                id="confirmPassword"
                autocomplete="on"
                minlength={3}
              />

              <label htmlFor="phone">
                Phone <span className="required">*</span>
              </label>
              <Input
                onChange={handleInputChange}
                id="phone"
                name="phone"
                value={formData.phone || ""}
                placeholder="Company phone no."
                type="text"
                autocomplete="on"
                minlength={3}
              />

              <label htmlFor="position">
                Your Position <span className="required">*</span>
              </label>
              <Input
                onChange={handleInputChange}
                id="position"
                name="position"
                value={formData.position || ""}
                placeholder="Eg: HR"
                type="text"
                autocomplete="on"
                minlength={3}
              />
              <label htmlFor="companyname">
                Company name <span className="required">*</span>
              </label>
              <Input
                onChange={handleInputChange}
                id="companyname"
                name="companyName"
                value={formData.companyName || ""}
                placeholder="Company name"
                type="text"
                autocomplete="on"
                minlength={3}
              />

              <h2>
                <span className="error">{dataError}</span>
                <span className="success">{dataSuccess}</span>
              </h2>

              <Button
                type="submit"
                value="Register"
                isLoading={recruiterMutation.isLoading}
              />
              <p>Already here?</p>
              <Link className="text-blue-600 underline" to="/userslayout/">
                <u>Login instead</u>
              </Link>
            </Form>
          ) : (
            // TALENT FORM
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
                value={talentFormData.name || ""}
                placeholder="Your name"
                type="text"
                autocomplete="on"
                minlength={3}
              />
              <label htmlFor="email">
                Email <span className="required">*</span>
              </label>
              <Input
                onChange={handleTalentInput}
                name="email"
                value={talentFormData.email || ""}
                placeholder="Eg: example@gmail.com"
                type="email"
                autocomplete="on"
                minlength={3}
              />

              <label htmlFor="password">
                Password <span className="required">*</span>
              </label>
              <Input
                onChange={handleTalentInput}
                name="password"
                value={talentFormData.password || ""}
                placeholder="Eg: aBc-11"
                type="password"
                autocomplete="on"
                minlength={3}
              />

              <label htmlFor="phones">
                Phone <span className="required">*</span>
              </label>
              <Input
                onChange={handleTalentInput}
                id="phones"
                name="phone"
                value={talentFormData.phone || ""}
                placeholder="Phone no."
                type="text"
                autocomplete="on"
                minlength={3}
              />

              <label htmlFor="image">
                Upload CV <span className="required">*</span>
              </label>
              <input
                onChange={handleTalentInput}
                id="image"
                name="cv"
                type="file"
              />
              <h2>
                <span className="error">{dataError}</span>
                <span className="success">{dataSuccess}</span>
              </h2>
              <Button
                type="submit"
                value="Register"
                isLoading={talentMutation.isLoading}
              />
              <p>Already here?</p>
              <Link className="text-blue-600 underline" to="/userslayout/">
                <u>Login instead</u>
              </Link>
            </Form>
          )}
        </section>
      </main>
    </>
  );
};

export default Register;
