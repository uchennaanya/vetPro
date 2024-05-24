import { useContextSelector } from "use-context-selector";
import { AuthContext } from "../context/AuthContext";

const useAuthContext = () => {
  const context = useContextSelector(AuthContext, (state) => state);

  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }

  return context;
};

export default useAuthContext;
