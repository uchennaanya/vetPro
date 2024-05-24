import styled from "styled-components";
import PageHeroSection from "../components/PageHeroSection";

// import logo from "../assets/img/logon.jpg";
// import star from "../assets/img/star.svg";
import eye from "../assets/img/eye-line.png";
import aim from "../assets/img/focus-3-line.png";
import service from "../assets/img/service-line.png";

// import Button from "../components/Button";

// const Pagination = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin: 1rem 9rem;
//   align-items: center;
//   flex-wrap: wrap;
//   > div {
//     display: flex;
//     gap: 10px;
//     align-items: center;
//   }
//   select {
//     box-shadow: 0 0 1px 0 #9893a3;
//     padding: 0.5rem;
//     border-radius: 5px;
//   }
//   .blueText {
//     color: #fff;
//     border: 1px solid #5952d1;
//     border-radius: 3px;
//     padding: 6px 20px;
//     background: #6c63ff;
//   }
//   span {
//     color: #2f2e41;
//     font-family: Roboto;
//     font-size: 14px;
//     font-weight: 400;
//     box-shadow: 0 0 1px 0 #9893a3;
//     padding: 7px;
//   }
// `;

const Wrapper = styled.div`
  padding: 1rem 9rem;
  p {
    color: #9893a3;
    text-align: justify;
    font-family: Roboto;
    font-weight: 400;
    line-height: 25px; /* 156.25% */
  }
  .abtimg {
    width: 200px;
    height: 150px;
    margin: 0.4rem 0.8rem 0.2rem 0;
  }
  h3 {
    color: #2f2e41;
    font-family: Roboto;
    font-size: 22px;
    font-style: normal;
    font-weight: 500;
  }
`;

const About = () => {
  return (
    <>
      <PageHeroSection>
        <div>
          <h1>About Us</h1>
          <small>Detailed Overview of the Company</small>
        </div>
      </PageHeroSection>
      {/* <Pagination>
        <div>
          <img src={logo} alt="Logo" /> <h3>Techwings global</h3>
        </div>
        <div>
          <span>
            <img src={star} alt="Star" />
          </span>
          <Button value="Send message" className="blueText" />
        </div>
      </Pagination> */}
      <br />
      <br />

      <Wrapper>
        <h3>Overview</h3>
        <p>
          TechWings Global LLC is a leading provider of innovative technology
          solutions and recruitment services. We are dedicated to empowering
          businesses and professionals to achieve their goals through
          cutting-edge technology and strategic talent acquisition.
        </p>
        <br />
        <h3>Introducing VetPro</h3>
        <p>
          The Future of Recruitment As part of our ongoing commitment to
          revolutionizing the tech industry, we proudly present VetPro, our
          premier recruitment platform. VetPro connects companies, recruiters,
          and founders with vetted, top-tier professionals ready to take on new
          challenges.
        </p>
        <br />
        <section className="mission">
          <div>
            <h2>
              <img src={service} alt="Mission" />
              Mission
            </h2>
            <p>
              Our mission is to create impactful solutions that drive success
              and foster growth in the tech industry. With a commitment to
              excellence and a focus on delivering value, TechWings Global LLC
              stands at the forefront of technological innovation and talent
              management.
            </p>
          </div>
          <div>
            <h2>
              <img src={eye} alt="vission" />
              Vission
            </h2>
            <p>
              We envision a future where every company can access top-tier
              talent effortlessly and every professional can find opportunities
              that perfectly match their skills and aspirations. VetPro is
              dedicated to fostering a thriving global workforce by ensuring
              that the right talent meets the right opportunities.
            </p>
          </div>
          <div>
            <h2>
              <img src={aim} alt="" /> Aim
            </h2>
            <p>
              We aim to bridge the gap between exceptional talent and
              forward-thinking companies by providing a seamless and efficient
              recruitment platform. We empower organizations and individuals to
              achieve their full potential through strategic connections and
              innovative hiring solutions.
            </p>
          </div>
        </section>
        <br />
        <h3 id="how">How It Works</h3>
        <p>
          VetPro, the premier recruitment platform by TechWings Global, offers a
          streamlined process for both job seekers and employers:
        </p>
        <br />
        <br />
        <h3>For Employers</h3>
        <ul className="howitwork">
          <li>
            <span>Registration & Verification:</span>Companies, recruiters, and
            founders can register on VetPro and verify their company email.
          </li>
          <li>
            <span>Job Posting:</span>Once verified, they can post job vacancies
            on the platform.
          </li>
          <li>
            <span>Application Review:</span>Vetted professionals on the platform
            can view and apply to these job openings if they align with their
            skill sets.
          </li>
          <li>
            <span>Hiring:</span> Employers can review applications, profiles,
            and skill sets of applicants. If satisfied, they can click on
            "hire," triggering an automated email to the selected candidate for
            further negotiation
          </li>
        </ul>
        <br />
        <h3>For Talent</h3>
        <ul className="howitwork">
          <li>
            <span> Onboarding:</span>Talents undergo a rigorous vetting process,
            including several interviews, to ensure they meet our high
            standards.
          </li>
          <li>
            <span>Job Matching:</span>Once onboarded, talents can browse job
            postings that match their skill sets.
          </li>
          <li>
            <span>Application:</span>Talents can apply to positions with a
            single click, making the hiring process efficient and
            straightforward.
          </li>
        </ul>
        <br />
        <br />
        <p>
          With VetPro, TechWings Global ensures that only the best professionals
          and opportunities meet, driving success for both talents and companies
          alike. Join us today and be part of a revolutionary recruitment
          experience
        </p>
        {/* For Employers: • Registration & Verification: Companies, recruiters, and
        founders can register on VetPro and verify their company email. • Job
        Posting: Once verified, they can post job vacancies on the platform. •
        Application Review: Vetted professionals on the platform can view and
        apply to these job openings if they align with their skill sets. •
        Hiring: Employers can review applications, profiles, and skill sets of
        applicants. If satisfied, they can click on "hire," triggering an
        automated email to the selected candidate for further negotiation. 

        For Talents: • Onboarding: Talents undergo a rigorous vetting process,
        including several interviews, to ensure they meet our high standards. •
        Job Matching: Once onboarded, talents can browse job postings that match
        their skill sets. • Application: Talents can apply to positions with a
        single click, making the hiring process efficient and straightforward.
        With VetPro, TechWings Global ensures that only the best professionals
        and opportunities meet, driving success for both talents and companies
        alike. Join us today and be part of a revolutionary recruitment
        experience! */}
      </Wrapper>
      <br />
      {/* <Wrapper>
        <span>Gallery</h3>
        <div>
          <Blog>
            <div style={{textAlign: "center"}}>
              <img src={pc} alt="Computers" className="abtimg" />
              <img src={pc} alt="Computers" className="abtimg" />
              <img src={pc} alt="Computers" className="abtimg" />
              <img src={pc} alt="Computers" className="abtimg" />
              <img src={pc} alt="Computers" className="abtimg" />
              <img src={pc} alt="Computers" className="abtimg" />
              <img src={pc} alt="Computers" className="abtimg" />
              <img src={pc} alt="Computers" className="abtimg" />
            </div>
          </Blog>
        </div>
      </Wrapper> */}
    </>
  );
};

export default About;
