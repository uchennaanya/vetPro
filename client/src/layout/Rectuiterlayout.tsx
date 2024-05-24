import { Outlet } from "react-router-dom";
import Sidebar from "../recruiter/component/Sidebar";

const Rectuiterlayout = () => {
  return (
    <>
      <div className="flex justify-between">
        
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Rectuiterlayout;
