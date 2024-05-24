import chat from "../../icons/ic_chat.svg";
import bell from "../../icons/ic_bell.svg";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import { useState } from "react";

interface Props {
  title: string;
  userName?: string;
  userLog?: any;
  user?: object;
}

const TopNav: React.FC<Props> = ({ title }) => {
  const [clicked, setClicked] = useState(false);

  const handleClicked = () => {
    console.log("clicked");
    setClicked(!clicked);
  };

  const { values, logout } = useAuthContext();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="flex justify-between ml-1 md:pl-0 pl-8 md:ml-8 pr-8 items-center">
      <div className="flex items-center p-2 gap-4 my-4">
        <h2 className="font-bold text-2xl">{title}</h2>
      </div>
      <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
        <div className="flex gap-8 user">
          <span className="rounded-full p-2 w-8 h-8 bg-gray-100 relative">
            <small className="absolute -mt-2 ml-4 rounded-full bg-indigo-800 h-4 w-4 flex justify-center text-xs items-center text-white ">
              2
            </small>
            <img className="w-4" src={chat} alt="Chat" />
          </span>
          <span className="rounded-full p-2 w-8 h-8 bg-gray-100 relative">
            <small className="absolute -mt-2 ml-4 rounded-full bg-blue-800 h-4 w-4 flex justify-center items-center text-white ">
              2
            </small>
            <img className="w-4" src={bell} alt="Bell" />
          </span>
        </div>

        <span className="flex items-center gap-4">
          <span onClick={handleClicked} className="cursor-pointer">
            <span className=" flex items-center text-white justify-center rounded-full p-2 w-8 h-8 bg-gray-600">
              <h2>{values?.name.slice(0, 1)}</h2>
            </span>
            <small>{values?.role}</small>
          </span>
          <div className={clicked ? "block absolute top-[70px]" : "hidden"}>
            <button onClick={handleLogout}>Logout</button>
            <Link to={`adminpreview/`}>Profile</Link>
          </div>
        </span>
      </div>
    </div>
  );
};

export default TopNav;
