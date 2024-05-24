import axios from "axios";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

const PreviewRecruiter: React.FC = () => {
  const { _id } = useParams();

  const { data } = useQuery("recruiterPreview", async () =>
    axios.get(`http://localhost:8000/api/user/${_id}`)
  );

  console.log(data)

  return <>
  {/* <h2>{data?.name}</h2> */}
  </>;
};

export default PreviewRecruiter;
