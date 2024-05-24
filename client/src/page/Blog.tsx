import styled from "styled-components";

import Input from "../components/Input";
import PageHeroSection from "../components/PageHeroSection";
import jobcategory from "../assets/img/jobcategory.svg";
import search2 from "../assets/img/search2.svg";
import abc from "../assets/img/abc.png";
import Button from "../components/Button";

const Wrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  margin: 4rem 0;
  > div {
    width: 270px;
    button {
      border-radius: 6px;
      border: 1px solid #6c63ff;
      background: #6c63ff;
      padding: 0.5rem 1rem;
      color: #fff;
    }
    h5 {
      color: #2f2e41;
      font-family: Roboto;
      font-size: 22px;
      font-weight: 500;
    }
    p {
      color: #9893a3;
      font-weight: 400;
      line-height: 26px; /* 162.5% */
    }
  }
`;

const Blog = () => {
  return (
    <>
      <PageHeroSection>
        <div className="">
          <h1>Blog</h1>
          <small>Updated Articles and News</small>

          <div className="blogSearch">
            <span>
              <img src={search2} alt="Search" />
              <Input
                type="search"
                placeholder="Enter Job Title"
                name="jobTitle"
              />
            </span>
            <span>
              <img src={jobcategory} alt="jobcategory" />
              <select name="jobcategory" id="jobcategory">
                <option disabled selected defaultValue="Select Category">
                  Select Category
                </option>
              </select>
            </span>
          </div>
        </div>
      </PageHeroSection>
      <Wrapper>
        <div>
          <img src={abc} alt="Reppresentational image" />
          <h5>Introducing Jobly Engage</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscn elit. At morbi
            turpis sagittis
          </p>
          <Button value="Read More" />
        </div>
        <div>
          <img src={abc} alt="Reppresentational image" />
          <h5>Introducing Jobly Engage</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscn elit. At morbi
            turpis sagittis
          </p>
          <Button value="Read More" />
        </div>

        <div>
          <img src={abc} alt="Reppresentational image" />
          <h5>Introducing Jobly Engage</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscn elit. At morbi
            turpis sagittis
          </p>
          <Button value="Read More" />
        </div>
      </Wrapper>
      <Wrapper>
        <div>
          <img src={abc} alt="Reppresentational image" />
          <h5>Introducing Jobly Engage</h5>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscn elit. At morbi
            turpis sagittis
          </p>
          <Button value="Read More" />
        </div>
      </Wrapper>
    </>
  );
};

export default Blog;
