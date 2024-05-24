import { Outlet } from "react-router-dom";
import Sidebar from "../admin/component/Sidebar";

const Adminlayout = () => {
  return (
    <>
      <div className="flex justify-between">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Adminlayout;
