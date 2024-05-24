import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  
} from "react-router-dom";

import Adminlayout from "../layout/Adminlayout";
import AdminDashboard from "../admin/pages/AdminDashboard";
import Applications from "../admin/pages/RecruitersApplications";
import Application from "../admin/pages/Applications";
import TalentsApplications from "../admin/pages/TalentsApplications";
import AvailableJobs from "../admin/pages/AvailableJobs";
import ReviewApplication from "../admin/pages/ReviewApplication";

import Recruiterlayout from "../layout/Rectuiterlayout";
import RecruiterDashboard from "../recruiter/page/RecruiterDashboard";
import RecruitersApplications from "../recruiter/page/RecruiterApplications";
import PostJob from "../recruiter/page/PostJob";
import MyJobs from "../recruiter/page/MyJobs";
import Statistics from "../recruiter/page/Statistics";
import News from "../recruiter/page/News";
import ReviewApplications from "../recruiter/page/ReviewApplications";

import UsersLayout from "../layout/UsersLayout";
import Login from "../page/Login";
import Register from "../page/Register";

import MainLayout from "../layout/MainLayout";
import Home from "../page/Home";
import About from "../page/About";
import Blog from "../page/Blog";
import Jobs from "../page/Jobs";
import Candidate from "../page/Candidate";
import ApplyForJob from "../page/ApplyForJob";
import CandidateProfile from "../page/CandidateProfile";

import PageNotFound from "../page/PageNotFound";
import Error from "../Error";
import RequireAuth from "../RequireAuth";
import JobPreview from "../page/JobPreview";
import EditTalent from "../page/EditTalent";
import PreviewRecruiter from "../recruiter/page/PreviewRecruiter";
import AdminPreview from "../admin/pages/AdminPreview";
import ConfirmRecruiter from "../page/ConfirmRecruiter";
import ConfirmTalent from "../page/ConfirmTalent";

const Router = createBrowserRouter(
  
  createRoutesFromElements(
    <Route errorElement={<Error />}>

      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about" element={<About />} />
        <Route path="/findcandidate" element={<Candidate />} />
        <Route path="/applyforjob" element={<ApplyForJob />} />
        <Route path="/candidatprofile/:_id" element={<CandidateProfile />} />
        <Route path="/jobpreview/:_id" element={<JobPreview />} />
      </Route>

      {/* AUTHENTICATION */}
      <Route path="/usersLayout/" element={<UsersLayout />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="confirmrecruiter/:_id" element={<ConfirmRecruiter />} />
        <Route path="confirmtalent/:_id" element={<ConfirmTalent />} />
        <Route path="edittalent/:_id" element={<EditTalent />} />
      </Route>

      {/* ADMIN LAYOUT */}
      <Route element={<RequireAuth />}>
        <Route path="/adminlayout" element={<Adminlayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="recruiters/" element={<Applications />} />
          <Route path="talents/" element={<TalentsApplications />} />
          <Route path="jobs/" element={<AvailableJobs />} />
          <Route path="applications/" element={<Application />} />
          <Route path="adminpreview/:_id" element={<AdminPreview />} />
          <Route
            path="reviewapplication/:talentID"
            element={<ReviewApplication />}
          />
        </Route>
      </Route>

      {/* RECRUITERS LAYOUT */}
      <Route element={<RequireAuth />}>
        <Route path="/recruiterlayout" element={<Recruiterlayout />}>
          <Route index element={<RecruiterDashboard />} />
          <Route path="postjob/" element={<PostJob />} />
          <Route path="myjobs/" element={<MyJobs />} />
          <Route
            path="recruiterapplications/"
            element={<RecruitersApplications />}
          />
          <Route path="news/" element={<News />} />
          <Route path="statistics/" element={<Statistics />} />
          <Route path="previewrecruiter/:_id" element={<PreviewRecruiter />} />
          <Route
            path="reviewapplications/:talentID"
            element={<ReviewApplications />}
          />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Route>
  )
);

export default Router;
