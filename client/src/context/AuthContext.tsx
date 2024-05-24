import React, { ReactNode, useState, useEffect } from "react";
import { createContext } from "use-context-selector";

interface UserData {
  _id: string;
  jobID: [];
  jobTitle: string;
  jobType: string;
  from: string;
  to: string;
  role: string;
  name: string;
  vacancies: string;
  yofexperience: string;
  location: string;
  companyName: string;
  desc: string;
  requirement: string;
  logo: File | null;
  email: string;
}

let API_base_url: string;

if (import.meta.env.MODE === "production") {
  API_base_url = "anya.uchenna@techwingsglobal.com";
  console.log("API_base_url", API_base_url);
} else {
  API_base_url = "http://localhost:8000/";
  console.log("API_base_url", API_base_url);
}

interface AuthContextProps {
  auth: string;
  values: UserData | null;
  API_base_url: string;
  setAuth: React.Dispatch<React.SetStateAction<string>>;
  setValues: React.Dispatch<React.SetStateAction<UserData | null>>;
  login: (user: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [auth, setAuth] = useState<string>("");
  const [values, setValues] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUser = async (): Promise<void> => {
      try {
        const userTokenFromLocalStorageRaw =
          localStorage.getItem("userToken") ?? "";

        const userDataFromLocalStorageRaw =
          localStorage.getItem("userData") ?? "{}";

        const userDataFromLocalStorage = JSON.parse(
          userDataFromLocalStorageRaw
        );

        const talentTokenFromLocalStorageRaw =
          localStorage.getItem("token") ?? "";

        const talentDataFromLocalStorageRaw =
          localStorage.getItem("tData") ?? "{}";

        const talentDataFromLocalStorage = JSON.parse(
          talentDataFromLocalStorageRaw
        );

        if (userTokenFromLocalStorageRaw) {
          setValues(userDataFromLocalStorage);
          setAuth(userTokenFromLocalStorageRaw);
        } else if (talentTokenFromLocalStorageRaw) {
          setValues(talentDataFromLocalStorage);
          setAuth(talentTokenFromLocalStorageRaw);
        } else {
          setAuth("");
          setValues(null);
        }
      } catch (error) {
        console.log(error, "Authcontext error");
      }
    };

    fetchUser();
  }, []);

  const login = (myUser: string): void => {
    setAuth(myUser);
  };

  const logout = (): void => {
    setAuth("");
    setValues(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        values,
        API_base_url,
        setAuth,
        setValues,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
