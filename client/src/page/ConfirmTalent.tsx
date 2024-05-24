import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "react-query";
import axios from "axios";
import { FormEvent, useState } from "react";
import useAuthContext from "../hooks/useAuthContext";

interface verifyTalentFormData {
  status: string;
}

const ConfirmTalent = () => {
  const { API_base_url } = useAuthContext();
  const navigate = useNavigate();
  const { _id } = useParams();

  const [formData, setFormData] = useState<verifyTalentFormData>({
    status: "verified",
  });

  const confirmationMutation = useMutation<void, Error, verifyTalentFormData>(
    async (formData) => {
      return await axios.patch(
        `${API_base_url}api/user/verify/${_id}`,
        formData
      );
    }
  );

  const handleUpdate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    confirmationMutation.mutateAsync(formData);

    console.log({ formData });

    navigate("/userslayout", { replace: true });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <main className="flex h-[100vh] flex-col items-center justify-center">
        <h2 className="font-bold text-2xl">
          Click the button to confirm its you...
        </h2>
        <form onSubmit={handleUpdate}>
          <input
            type="hidden"
            onChange={handleChange}
            name="status"
            value={formData.status}
          />
          <button className="bg-blue-200 px-4 py-1 rounded-sm">CONFIRM</button>
        </form>
      </main>
    </>
  );
};

export default ConfirmTalent;
