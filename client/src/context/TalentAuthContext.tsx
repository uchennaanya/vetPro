import React, { ReactNode, useState, useEffect } from "react";
import { createContext } from "use-context-selector";

interface Talent {
  id: string;
}

interface TalentAuthContextProps {
  TalentAuth: Talent | null | object | string;
  TalentData: any;
  login: (Talent: Talent) => void;
  logout: () => void;
}

export const TalentAuthContext = createContext<TalentAuthContextProps | undefined>(undefined);

interface AuthContextProviderProps {children: ReactNode}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({children}) => {
  const [TalentAuth, setTalentAuth] = useState<Talent | null | string | object>(null);
  const [TalentData, setTalentData] = useState<Talent | null | object>(null);

  const login = (myTalent: Talent): void => {
    setTalentAuth(myTalent);
  };

  const logout = (): void => {
    setTalentAuth(null);
  };

  useEffect(() => {
    const fetchTalent = async (): Promise<void> => {
      try {
        const TalentFromLocalStorageRaw = localStorage.getItem("talent") ?? "{}";
        const TalentFromLocalStorage = JSON.parse(TalentFromLocalStorageRaw);

        console.log(TalentFromLocalStorage);

        if (TalentFromLocalStorage) {
          setTalentData(TalentFromLocalStorage);
        } else {
          setTalentAuth(null);
          setTalentData(null);
        }
      } catch (error) {
        console.log(error, "Authcontext error");
      }
    };

    fetchTalent();
  }, []);

  return (
    <TalentAuthContext.Provider value={{ TalentAuth, TalentData, login, logout }}>
      {children}
    </TalentAuthContext.Provider>
  );
};
