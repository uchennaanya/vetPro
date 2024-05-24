import { Link, useRouteError } from "react-router-dom";

const Error: React.FC = () => {

    const error: any = useRouteError();

  return (
    <div className="text-center flex flex-col justify-center h-[100vh]">
      <h2 className="text-2xl">There is nothing here</h2>
      <p>{error.statusText || error?.message}</p>
      <Link to="/" className="text-blue-600 underline">Go back to home page</Link>
    </div>
  );
};

export default Error;
