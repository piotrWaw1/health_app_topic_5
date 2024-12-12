import { createContext, ReactNode, useContext, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { LoginRequest } from "@/app/settings/login";

type SessionContextData = {
  token: string | null;
  login: (request: LoginRequest) => void;
}

const initState: SessionContextData = {
  token: null,
  login: () => undefined,
}

const SessionContext = createContext<SessionContextData>(initState);
export const useSessionContext = () => useContext(SessionContext);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(SecureStore.getItem("token"));

  const login = async (request: LoginRequest) => {
    try {
      const { data } = await axios.post("/login", request)
      console.log(data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error)
      }
    }

  }


  const contextData: SessionContextData = {
    token,
    login
  }

  return (
    <SessionContext.Provider value={contextData}>
      {children}
    </SessionContext.Provider>
  )
}
