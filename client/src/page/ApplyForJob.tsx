import styled from "styled-components";
import Button from "../components/Button";
import Input from "../components/Input";
import PageHeroSection from "../components/PageHeroSection";

const Form = styled.form`
  width: 100%;
  margin: 4rem auto;
  max-width: 400px;

  input,
  button {
    display: block;
    border: 1px solid #ccc;
    margin: 0.5rem 0 1rem;
    padding: 0.4rem;
    width: 100%;
  }

  button {
    background: blue;
    color: #fff;
  }
`;

const ApplyForJob = () => {
  return (
    <>
      <PageHeroSection>
        <div>
          <h1>Apply for jobs</h1>
          <small>
            Carefully the form bellow to land your dream job in minutes
          </small>
        </div>
      </PageHeroSection>
      <main>
        <Form action="" method="post">
          <label htmlFor="name">Name</label>
          <Input
            required
            name="name"
            id="name"
            placeholder="Your name"
            type="text"
          />
          <label htmlFor="email">Your work email</label>
          <Input
            required
            name="email"
            id="email"
            placeholder="Eg: example@gmail.com"
            type="email"
          />
          <label htmlFor="phone">Phone no.</label>
          <Input
            required
            name="phone"
            placeholder="Eg: +10 000 000"
            type="text"
          />
          <label htmlFor="location">Location</label>
          <Input
            required
            id="location"
            name="location"
            placeholder="Eg: Washington, USA"
            type="text"
          />
          <label htmlFor="position">Position</label>
          <Input
            required
            name="position"
            placeholder="Eg: UI Designer"
            type="text"
          />
          <label htmlFor="cv">
            Your CV
            <Input required id="cv" name="cv" type="file" />
          </label>
          <Button value="Apply" />
        </Form>
      </main>
    </>
  );
};

export default ApplyForJob;
