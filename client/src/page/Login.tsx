import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import { useMutation } from "react-query";
import { Link, NavLink, useNavigate } from "react-router-dom";
import PageHeroSection from "../components/PageHeroSection";
import useAuthContext from "../hooks/useAuthContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Form = styled.form`
  width: 100%;
  margin: 0 auto;
  max-width: 400px;
  font-family: roboto;
  padding: 2rem;

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
  .error {
    color: red;
  }
`;

interface FormData {
  email: string;
  autofocus?: string;
  password: string;
}

const failure = (msg: string) => {
  withReactContent(Swal).fire({
    title: "TW",
    color: "red",
    text: msg,
    icon: "error",
  });
};

const Login = () => {
  const { setAuth, setValues, API_base_url } = useAuthContext();
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState<boolean>(false);
  const [error] = useState<string>("");

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const recruiterLoginMutation = useMutation<void, Error, FormData>({
    mutationFn: async (formData) => {
      try {
        const response = await axios.post(
          `${API_base_url}api/user/logIn`,
          formData
        );
        console.log("Response:", response);

        if (!response || !response.data) {
          throw new Error("Invalid response format");
        }

        if (response.data.user.status === "pending") {
          throw new Error("Not active yet");
        }
        if (
          response.data.user &&
          (response.data.user.role === "admin" ||
            response.data.user.role === "recruiter") &&
          response.data.user.status === "active"
        ) {
          localStorage.setItem(
            "userToken",
            JSON.stringify(response.data.token)
          );
          localStorage.setItem("userData", JSON.stringify(response.data.user));
          setValues(response.data.user);

          if (response.data.user.role === "admin") {
            navigate(`/adminlayout/`, { replace: true });
          } else if (response.data.user.role === "recruiter") {
            navigate(`/recruiterlayout/`, { replace: true });
          }
        } else {
          throw new Error(response.data.response); // Throw error with the response message
        }
      } catch (error: any) {
        failure(`${error.response?.data?.response || error.message}`);
        console.error(error);
        throw error;
      }
    },
  });

  const handleRecruiterLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    recruiterLoginMutation.mutate(formData); // Await the mutation
  };

  // TALENT MUTATION
  const talentLoginMutation = useMutation<void, Error, FormData>({
    mutationFn: async (formData) => {
      try {
        const response = await axios.post(
          `${API_base_url}api/talent/logIn`,
          formData
        );

        console.log(response);

        if (!response || !response.data) {
          throw new Error("Invalid response format");
        }

        if (response.data.talent && response.data.talent.status === "pending") {
          throw new Error("Not active yet");
        }

        if (response.data.talent) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("tData", JSON.stringify(response.data.talent));

          setAuth(response.data.token);
          setValues(response.data.talent);

          navigate(`/`, { replace: true });
        } else {
          throw new Error("Invalid talent data in response");
        }
      } catch (error: any) {
        failure(`${error.response?.data?.response || error.message}`);
        console.error(error);
        throw error;
      }
    },
  });

  const handleTalentLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    talentLoginMutation.mutate(formData);
  };

  const talentTab = () => {
    setShowForm(false);
  };

  const recruiterTab = () => {
    setShowForm(true);
  };

  return (
    <>
      <PageHeroSection>
        <div>
          <h1>Login</h1>
          <small>Login if you're already a user</small>
          <NavLink to="/">Home</NavLink>
        </div>
      </PageHeroSection>
      <main>
        <div className="my-8 mx-[auto] w-fit">
          <div className="flex flex-wrap flex justify-center">
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
          <div className="flex flex-col items-center">
            {showForm ? (
              // RECRUITERS
              <Form
                className="bg-indigo-100/50 p-4"
                onSubmit={handleRecruiterLogin}
              >
                <h2>Recruiter Login</h2>
                <label htmlFor="email">Email</label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="martins@gmail.com"
                  minlength={3}
                />
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                  minlength={3}
                />

                <Button
                  value="Login"
                  type="submit"
                  isLoading={recruiterLoginMutation.isLoading}
                />

                <p className="error">{error}</p>
              </Form>
            ) : (
              // TALENTS
              <Form className="bg-gray-50 p-4" onSubmit={handleTalentLogin}>
                <h2>Talent Login</h2>
                <label htmlFor="email">Email</label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="example@gmail.com"
                  minlength={3}
                />
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                  minlength={3}
                />

                <Button
                  value="Login"
                  type="submit"
                  isLoading={recruiterLoginMutation.isLoading}
                />

                <p className="error">{error}</p>
              </Form>
            )}
          </div>
          <p>New here?</p>
          <Link className="text-blue-600 underline" to="/userslayout/register">
            Register with us
          </Link>
        </div>
      </main>
    </>
  );
};

export default Login;
